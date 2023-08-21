import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {

  @IsNotEmpty()
  readonly wallet: string;

  @IsNotEmpty()
  readonly password: string;
}
