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
import {SubscriptionDto} from "./dto/subscription.dto";
import {SubscriptionUsageEventDto} from "./dto/subscription-usage-event.dto";

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

  @UsePipes(new ValidationPipe())
  @Post('users/subscribe')
  async subscribe(@Body('subscription') subscribeUserDto: SubscribeUserDto): Promise<any> {
    try {
      await apiLago.subscriptions.createSubscription({
          subscription: {
            external_customer_id: subscribeUserDto.wallet,
            plan_code: subscribeUserDto.subscriptionCode,
            external_id: 'sub_' + subscribeUserDto.wallet,
          }
        });
    } catch (error) {
      console.log('error', error)
      return {status: error.response.status, statusText: error.response.statusText, data: error.response.data}
    }
    return { user: { wallet: subscribeUserDto.wallet } }
  }

  @UsePipes(new ValidationPipe())
  @Post('users/subscriptions')
  async subscriptions(@Body('subscription') subscriptionDto: SubscriptionDto): Promise<any> {
    try {
      const result = await apiLago.subscriptions.findAllSubscriptions({
          external_customer_id: subscriptionDto.external_customer_id,
      });
      console.log(result)
      return result.data;
    } catch (error) {
      console.log('error', error)
      return {status: error.response.status, statusText: error.response.statusText, data: error.response.data}
    }
  }

  @UsePipes(new ValidationPipe())
  @Post('users/subscription-usage-event')
  async subscriptionUsageEvent(@Body('event') subscriptionUsageEventDto: SubscriptionUsageEventDto): Promise<any> {
    try {
      const result = await apiLago.events.createEvent({
        event: {
          transaction_id: subscriptionUsageEventDto.transaction_id,
          code: 'FILES_VOL',
          external_customer_id: subscriptionUsageEventDto.external_customer_id,
          properties: {
            filesize: subscriptionUsageEventDto.filesize
          }
        }
      });
      console.log(result)
      return result.data;
    } catch (error) {
      console.log('error', error)
      return {status: error.response.status, statusText: error.response.statusText, data: error.response.data}
    }
  }
}
