import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { User } from './user.decorator';
import {ICanCreateUserRO, IUserRO} from './user.interface';
import { UserService } from './user.service';
import {api as apiLago} from "../services-lago";
import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import {SubscribeUserDto} from "./dto/subscribe-user.dto";
import {SubscriptionDto} from "./dto/subscription.dto";
import {SubscriptionUsageEventDto} from "./dto/subscription-usage-event.dto";
import {LARGE_PLAN_PRICE, MEDIUM_PLAN_PRICE, SMALL_PLAN_PRICE, SUBSCRIPTION_PAY_ADDRESS} from "../config";

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
  @Post('users/validate')
  async validate(@Body('user') loginUserDto: LoginUserDto): Promise<ICanCreateUserRO> {
    const foundUser = await this.userService.findOne(loginUserDto);
    if (foundUser) {
      return { result: true };
    }

    const canCreate = await this.userService.canCreate(loginUserDto)

    if (!canCreate) {
      throw new HttpException('Cannot create user', 401);
    }
    return { result: true };
  }

  @UsePipes(new ValidationPipe())
  @Post('users/login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<IUserRO> {
    const foundUser = await this.userService.findOne(loginUserDto);

    if (!foundUser) {
      throw new HttpException('User not found', 401);
    }
    const token = await this.userService.generateJWT(foundUser);
    const { wallet } = foundUser;
    const user = { wallet, token };
    return { user };
  }

  @UsePipes(new ValidationPipe())
  @Post('users/subscribe')
  async subscribe(@Body('subscription') subscribeUserDto: SubscribeUserDto): Promise<any> {
    let totalToPay : number = 0, alreadyPaid : number = 0
    let subscriptionDate: string = '', subscriptionStartedDate: Date;
    try {
      if (subscribeUserDto.subscriptionAddress !== SUBSCRIPTION_PAY_ADDRESS ||
          (subscribeUserDto.subscriptionCode === 'SMALL' && subscribeUserDto.subscriptionPrice != SMALL_PLAN_PRICE) ||
          (subscribeUserDto.subscriptionCode === 'MEDIUM' && subscribeUserDto.subscriptionPrice != MEDIUM_PLAN_PRICE) ||
          (subscribeUserDto.subscriptionCode === 'LARGE' && subscribeUserDto.subscriptionPrice != LARGE_PLAN_PRICE)
      ) {
        return {status: 400, statusText: 'Bad Request', data: {error: ['Invalid subscription data']}}
      }

      if (subscribeUserDto.subscriptionCode === 'SMALL') {
        totalToPay = parseFloat(SMALL_PLAN_PRICE)
      } else if (subscribeUserDto.subscriptionCode === 'MEDIUM') {
        totalToPay = parseFloat(MEDIUM_PLAN_PRICE)
      } else if (subscribeUserDto.subscriptionCode === 'LARGE') {
        totalToPay = parseFloat(LARGE_PLAN_PRICE)
      }

      console.log('totalToPay full', totalToPay)

      const subscriptionsData = await apiLago.subscriptions.findAllSubscriptions({
            external_customer_id: subscribeUserDto.wallet,
          }
      )

      let code = subscribeUserDto.subscriptionCode;
      let wasPreviousSubscription = false;
      if (subscriptionsData.data.subscriptions.length > 0) {
        const currentSubscription = subscriptionsData.data.subscriptions[0];
        wasPreviousSubscription = true;

        if (currentSubscription.plan_code === 'SMALL') {
          alreadyPaid = parseFloat(SMALL_PLAN_PRICE)
        } else if (currentSubscription.plan_code === 'MEDIUM') {
          alreadyPaid = parseFloat(MEDIUM_PLAN_PRICE)
        } else if (currentSubscription.plan_code === 'LARGE') {
          alreadyPaid = parseFloat(LARGE_PLAN_PRICE)
        }

        if (code === currentSubscription.plan_code) {
          code += '-2'
        }
      }

      const subscriptionResult = await apiLago.subscriptions.createSubscription({
          subscription: {
            external_customer_id: subscribeUserDto.wallet,
            plan_code: code,
            external_id: 'sub_' + subscribeUserDto.wallet,
            billing_time: 'anniversary',
          }
        });
      subscriptionDate = subscriptionResult.data.subscription.subscription_at;
      subscriptionStartedDate = new Date(subscriptionResult.data.subscription.started_at);

      function msleep(n) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
      }

      function sleep(n) {
        msleep(n * 1000);
      }

      let invoiceFound = false;
      const maxAttempts = 3;
      let currentAttempt = 0;
      while (wasPreviousSubscription && !invoiceFound && currentAttempt < maxAttempts) {
        const invoicesData = await apiLago.invoices.findAllInvoices({
          external_customer_id: subscribeUserDto.wallet,
          payment_status: 'pending',
          issuing_date_from: subscriptionStartedDate.getFullYear() + '-' + (subscriptionStartedDate.getMonth() + 1) + '-' + subscriptionStartedDate.getDate(),
        })
        if (invoicesData.data.invoices.length > 0) {
          const invoiceData = invoicesData.data.invoices[0];
          if (invoiceData.customer.lago_id === subscriptionResult.data.subscription.lago_customer_id) {
            // SMALL plan has recurring charge of 0.01, MEDIUM plan - 0.02, LARGE plan - 0.03
            if (invoiceData.total_amount_cents > 3) {
              invoiceFound = true;
              if (totalToPay * 100 > alreadyPaid * 100 - invoiceData.total_amount_cents) {
                totalToPay = totalToPay - (alreadyPaid * 100 - invoiceData.total_amount_cents) / 100;
                console.log('totalToPay', totalToPay)
              }
            } else {
              console.log('No customer found')
              sleep(3);
            }
          } else {
            await apiLago.invoices.updateInvoice(invoiceData.lago_id, {invoice: {payment_status: 'succeeded'}})
          }
        } else {
          console.log('No invoices found')
          sleep(3);
        }
        currentAttempt++;
      }
    } catch (error) {
      console.log('error', error)
      return {status: error.response.status, statusText: error.response.statusText, data: error.response.data}
    }
    return { user: { wallet: subscribeUserDto.wallet, total_to_pay: totalToPay, subscription_date: subscriptionDate } }
  }

  @UsePipes(new ValidationPipe())
  @Post('users/finalize_subscribe')
  async finalizeSubscribe(@Body('subscription') subscribeUserDto: SubscribeUserDto): Promise<any> {
    try {
      if (subscribeUserDto.subscriptionAddress !== SUBSCRIPTION_PAY_ADDRESS ||
          (subscribeUserDto.subscriptionCode === 'SMALL' && subscribeUserDto.subscriptionPrice != SMALL_PLAN_PRICE) ||
          (subscribeUserDto.subscriptionCode === 'MEDIUM' && subscribeUserDto.subscriptionPrice != MEDIUM_PLAN_PRICE) ||
          (subscribeUserDto.subscriptionCode === 'LARGE' && subscribeUserDto.subscriptionPrice != LARGE_PLAN_PRICE)
      ) {
        return {status: 400, statusText: 'Bad Request', data: {error: ['Invalid subscription data']}}
      }

      const invoicesData = await apiLago.invoices.findAllInvoices({
        external_customer_id: subscribeUserDto.wallet,
        payment_status: 'pending',
      })
      for (let i=0; i<invoicesData.data.invoices.length; i++) {
        const usageInvoice = invoicesData.data.invoices[i];
        await apiLago.invoices.updateInvoice(usageInvoice.lago_id, {invoice: {payment_status: 'succeeded'}})
      }
      const userData = await this.userService.findUserByWallet(subscribeUserDto.wallet)
      await this.userService.update(userData.user.id, {plan_code: subscribeUserDto.subscriptionCode})
    } catch (error) {
      console.log('error', error)
      return {status: error.response.status, statusText: error.response.statusText, data: error.response.data}
    }
    return { user: { wallet: subscribeUserDto.wallet } }
  }

  @UsePipes(new ValidationPipe())
  @Post('users/cancel_subscribe')
  async cancelSubscribe(@Body('subscription') subscribeUserDto: SubscribeUserDto): Promise<any> {
    try {
      if (subscribeUserDto.subscriptionAddress !== SUBSCRIPTION_PAY_ADDRESS ||
          (subscribeUserDto.subscriptionCode === 'SMALL' && subscribeUserDto.subscriptionPrice != SMALL_PLAN_PRICE) ||
          (subscribeUserDto.subscriptionCode === 'MEDIUM' && subscribeUserDto.subscriptionPrice != MEDIUM_PLAN_PRICE) ||
          (subscribeUserDto.subscriptionCode === 'LARGE' && subscribeUserDto.subscriptionPrice != LARGE_PLAN_PRICE)
      ) {
        return {status: 400, statusText: 'Bad Request', data: {error: ['Invalid subscription data']}}
      }

      await apiLago.subscriptions.destroySubscription({externalId: 'sub_'+subscribeUserDto.wallet, status: 'pending'})

      const userData = await this.userService.findUserByWallet(subscribeUserDto.wallet)
      await this.userService.update(userData.user.id, {plan_code: 'NONE'})
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
      const userData = await this.userService.findUserByWallet(subscriptionDto.external_customer_id)
      if (!userData.user.plan_code && result.data.subscriptions.length > 0) {
        await this.userService.update(userData.user.id, {plan_code: result.data.subscriptions[0].plan_code})
      }
      console.log(result)
      return result.data;
    } catch (error) {
      console.log('error', error)
      if (error.response) {
        return {status: error.response.status, statusText: error.response.statusText, data: error.response.data}
      } else {
        return {status: 401, statusText: 'User not found', data: {error: ['User not found']}}
      }
    }
  }

  @UsePipes(new ValidationPipe())
  @Post('users/usage')
  async usage(@Body('subscription') subscriptionDto: SubscriptionDto): Promise<any> {
    try {
      const result = await apiLago.customers.findCustomerCurrentUsage({
            externalCustomerId: subscriptionDto.external_customer_id,
            external_subscription_id: 'sub_' + subscriptionDto.external_customer_id,
          }
      );
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
