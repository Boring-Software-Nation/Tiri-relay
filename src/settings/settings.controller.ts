import {
  Controller,
  Get, Param,
  Res, UsePipes,
} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

import {Response} from "express";
import {ConfigService} from "@nestjs/config";

import {
  LARGE_PLAN_PRICE,
  MEDIUM_PLAN_PRICE,
  SUBSCRIPTION_PAY_ADDRESS,
  TRIAL_PLAN_LIMIT
} from "../config";
import {ValidationPipe} from "../shared/pipes/validation.pipe";
import {SettingsRepository} from "./settings.repository";
import crypto from "crypto";

@ApiBearerAuth()
@ApiTags('settings')
@Controller('settings')
export class SettingsController {

  constructor(
      private configService: ConfigService,
      private settingsRepository: SettingsRepository,
  ) {}

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get settings' })
  @ApiResponse({ status: 200, description: 'Get settings.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':wallet/subscription')
  async subscription(@Param('wallet') wallet, @Res() res: Response): Promise<any> {

    res.send({
      medium_plan_price: MEDIUM_PLAN_PRICE,
      large_plan_price: LARGE_PLAN_PRICE,
      pay_address: SUBSCRIPTION_PAY_ADDRESS
    });
  }

  @ApiOperation({ summary: 'Get latest version' })
  @ApiResponse({ status: 200, description: 'Get latest version.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('/version')
  async version(@Res() res: Response): Promise<any> {

    const findOneOptions = {
      key: 'last_version'
    };

    const lastVersion = await this.settingsRepository.findOne(findOneOptions);

    res.send({
      last_version: lastVersion ? lastVersion.value : '',
    });
  }

}
