import { IsNotEmpty } from 'class-validator';

export class SubscriptionDto {

  @IsNotEmpty()
  readonly external_customer_id: string;
}
