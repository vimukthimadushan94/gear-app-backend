import { IsNotEmpty } from 'class-validator';

export class postCreateDto {
  @IsNotEmpty()
  description: string;
}
