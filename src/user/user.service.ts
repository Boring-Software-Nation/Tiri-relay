import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { EntityManager, wrap } from '@mikro-orm/core';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';
import {IUserRO, IUserROSimple} from './user.interface';
import { UserRepository } from './user.repository';
import {ConfigService} from "@nestjs/config";
import { encode as encodeB64 } from '@stablelib/base64';
import { encode as encodeUTF8 } from '@stablelib/utf8';
import { hash } from 'tweetnacl';

/* global sia, Go */
/* global WebAssembly */
import '../sia/wasm_exec.js';
import * as fs from "fs";
import path from "path";
import {USE_SIA_CENTRAL} from "../config";

declare const WebAssembly: any
declare const Go: any
declare const sia: any

@Injectable()
export class UserService {
  scanQueue = [];

  constructor(
    private readonly userRepository: UserRepository,
    private readonly em: EntityManager,
    private configService: ConfigService,
  ) {

    if (USE_SIA_CENTRAL === 'true') {
      const loaded = this.load().then(
          () => {
            console.log('wasm loaded');
          }
      );
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(loginUserDto: LoginUserDto): Promise<User> {
    const findOneOptions = {
      wallet: loginUserDto.wallet,
      password: crypto.createHmac('sha256', loginUserDto.password).digest('hex'),
    };

    return this.userRepository.findOne(findOneOptions);
  }

  async create(dto: CreateUserDto): Promise<IUserRO> {
    // check uniqueness of wallet
    const { wallet, password } = dto;
    const exists = await this.userRepository.count({ $or: [{ wallet }] });

    if (exists > 0) {
      throw new HttpException({
        message: 'Input data validation failed',
        errors: { username: 'Wallet must be unique.' },
      }, HttpStatus.BAD_REQUEST);
    }

    // create new user
    const user = new User(wallet, password);
    const errors = await validate(user);

    if (errors.length > 0) {
      throw new HttpException({
        message: 'Input data validation failed',
        errors: { username: 'Userinput is not valid.' },
      }, HttpStatus.BAD_REQUEST);
    } else if (USE_SIA_CENTRAL === 'true') {
      const seed = await this.createWallet();
      const id = encodeB64(hash(encodeUTF8(seed as string)));
      const addresses = await this.saveWallet(seed, 'sc');
      user.pay_wallet_id = id;
      user.pay_wallet_seed = seed as string;
      user.pay_addresses = JSON.stringify(addresses);
    }
    await this.em.persistAndFlush(user);
    return this.buildUserRO(user);
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne(id);
    wrap(user).assign(dto);
    await this.em.flush();

    return this.buildUserRO(user);
  }

  async delete(wallet: string) {
    return this.userRepository.nativeDelete({ wallet });
  }

  async findById(id: number): Promise<IUserRO> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildUserRO(user);
  }

  async findByWallet(wallet: string): Promise<IUserRO> {
    const user = await this.userRepository.findOneOrFail({ wallet });
    return this.buildUserRO(user);
  }

  async findUserByWallet(wallet: string): Promise<IUserROSimple> {
    const user = await this.userRepository.findOneOrFail({ wallet });
    return this.buildUserROSimple(user);
  }

  generateJWT(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      wallet: user.wallet,
      exp: exp.getTime() / 1000,
      id: user.id,
    }, this.configService.get<string>('AUTH_SECRET'));
  }

  private buildUserRO(user: User) {
    const userRO = {
      wallet: user.wallet,
      token: this.generateJWT(user),
    };

    return { user: userRO };
  }

  private buildUserROSimple(user: User) {
    const userROSimple = {
      id: user.id,
      wallet: user.wallet,
      plan_code: user.plan_code,
    };

    return { user: userROSimple };
  }

  private async createWallet() {
    try {
      const params: any[] = ['sia'];
      const p = new Promise((resolve, reject) => {
        const f = async (err, value) => {
          if (err)
            reject(new Error(err));
          else if (value)
            resolve(value);
          else
            resolve('');
        }

        params.push(f);
      });

      const error = sia['generateSeed'].apply(this, params);
      if (typeof error === 'string') {
        throw new Error(error);
      }
      const seed = await p;
      console.log('seed', seed)

      return seed;

    } catch (ex) {
      console.error('onCreateWallet', ex);
    } finally {

    }
  }

  private saveWallet = async (seed, currency) => {

    try {

      const params: any[] = [seed, currency, 0, 10];
      const p = new Promise((resolve, reject) => {
        const f = async (err, value) => {
          if (err)
            reject(new Error(err));
          else if (value)
            resolve(value);
          else
            resolve('');
        }

        params.push(f);
      });

      const error = sia['generateAddresses'].apply(this, params);
      if (typeof error === 'string') {
        throw new Error(error);
      }
      const addresses = await p;
      console.log('addresses', addresses)
      return addresses;
    } catch (ex) {
      console.error('saveWallet', ex);
    } finally {
    }
  }




  private loadWASM = async () => {
    const wasmBuffer = fs.readFileSync(path.resolve(__dirname, '../sia/sia.wasm'));
    const go = new Go(),
        result = await WebAssembly.instantiate(wasmBuffer, go.importObject);

    go.run(result.instance).catch(ex => console.error('go program exited', ex));

    await new Promise(resolve => setTimeout(resolve, 1));
  }

  private load = async () => {
    if (USE_SIA_CENTRAL === 'false') {
        return;
    }
    try {
      await this.loadWASM();

    } catch (ex) {
      console.error('load', ex);
    }
  }



}
