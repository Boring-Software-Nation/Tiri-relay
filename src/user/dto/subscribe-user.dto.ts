import { IsNotEmpty } from 'class-validator';

export class SubscribeUserDto {

  @IsNotEmpty()
  readonly wallet: string;

  @IsNotEmpty()
  readonly subscriptionCode: string;

  @IsNotEmpty()
  readonly subscriptionAddress: string;

  @IsNotEmpty()
  readonly subscriptionPrice: string;
}
