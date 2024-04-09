import { IsNotEmpty, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsNotEmpty()
  @IsString({ message: 'First name must be a string' })
  first_name: string;

  @IsString({ message: 'Last name must be a string' })
  last_name: string;

  @IsNotEmpty()
  age: number;
}
