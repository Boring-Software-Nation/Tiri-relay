import { IsNotEmpty } from 'class-validator';

export class FeedbackDto {

  @IsNotEmpty()
  readonly wallet: string;

  @IsNotEmpty()
  readonly email: string;

  readonly subject: string;

  @IsNotEmpty()
  readonly message: string;

}
