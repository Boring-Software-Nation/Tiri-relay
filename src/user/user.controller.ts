import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { User } from './user.decorator';
import { IUserRO } from './user.interface';
import { UserService } from './user.service';
import {api as apiLago} from "../services-lago";
import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import {SubscribeUserDto} from "./dto/subscribe-user.dto";

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get('user')
  async findMe(@User('wallet') wallet: string): Promise<IUserRO> {
    return this.userService.findByWallet(wallet);
  }

  @Put('user')
  async update(@User('id') userId: number, @Body('user') userData: UpdateUserDto) {
    return this.userService.update(userId, userData);
  }

  @UsePipes(new ValidationPipe())
  @Post('users')
  async create(@Body('user') userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Delete('users/:slug')
  async delete(@Param() params): Promise<any> {
    return this.userService.delete(params.slug);
  }

  @UsePipes(new ValidationPipe())
  @Post('users/login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<IUserRO> {
    const foundUser = await this.userService.findOne(loginUserDto);

    const errors = { User: ' not found' };
    if (!foundUser) {
      throw new HttpException({ errors }, 401);
    }
    const token = await this.userService.generateJWT(foundUser);
    const { wallet } = foundUser;
    const user = { wallet, token };
    return { user };
  }

  @Post('users/subscribe')
  async subscribe(@Body('subscription') subscribeUserDto: SubscribeUserDto): Promise<IUserRO> {
      await apiLago.subscriptions.createSubscription({
        subscription: {
          external_customer_id: subscribeUserDto.wallet,
          plan_code: subscribeUserDto.subscriptionCode,
          external_id: 'sub_' + subscribeUserDto.wallet,
        }
      });
      return { user: { wallet: subscribeUserDto.wallet } }
  }
}
