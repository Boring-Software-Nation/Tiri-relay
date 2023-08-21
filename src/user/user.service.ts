import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { EntityManager, wrap } from '@mikro-orm/core';
import { SECRET } from '../config';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';
import { IUserRO } from './user.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly em: EntityManager,
  ) {}

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
    } else {
      await this.em.persistAndFlush(user);
      return this.buildUserRO(user);
    }
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

  generateJWT(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      wallet: user.wallet,
      exp: exp.getTime() / 1000,
      id: user.id,
    }, SECRET);
  }

  private buildUserRO(user: User) {
    const userRO = {
      wallet: user.wallet,
      token: this.generateJWT(user),
    };

    return { user: userRO };
  }
}
