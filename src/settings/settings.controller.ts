import {
  Controller,
  Get, Param,
  Res, UsePipes,
} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

import {Response} from "express";
import {ConfigService} from "@nestjs/config";

import {LARGE_PLAN_PRICE, MEDIUM_PLAN_PRICE, SMALL_PLAN_PRICE, SUBSCRIPTION_PAY_ADDRESS} from "../config";
import {ValidationPipe} from "../shared/pipes/validation.pipe";

@ApiBearerAuth()
@ApiTags('settings')
@Controller('settings')
export class SettingsController {

  constructor(
      private configService: ConfigService,
  ) {}

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get settings' })
  @ApiResponse({ status: 200, description: 'Get settings.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':wallet/subscription')
  async subscription(@Param('wallet') wallet, @Res() res: Response): Promise<any> {

    res.send({
      small_plan_price: SMALL_PLAN_PRICE,
      medium_plan_price: MEDIUM_PLAN_PRICE,
      large_plan_price: LARGE_PLAN_PRICE,
      pay_address: SUBSCRIPTION_PAY_ADDRESS
    });
  }



}
