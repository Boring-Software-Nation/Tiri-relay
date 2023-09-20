import { IsNotEmpty } from 'class-validator';

export class SubscriptionUsageEventDto {

  @IsNotEmpty()
  readonly transaction_id: string;

  @IsNotEmpty()
  readonly external_customer_id: string;

  @IsNotEmpty()
  readonly filesize: string;
}
