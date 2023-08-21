import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  readonly wallet: string;

  @IsNotEmpty()
  readonly password: string;
}
