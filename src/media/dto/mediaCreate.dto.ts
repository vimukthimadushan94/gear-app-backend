import { IsNotEmpty } from 'class-validator';

export class mediaCreateDto {
  @IsNotEmpty()
  related_model: string;

  @IsNotEmpty()
  type: ModelTypes.post;

  @IsNotEmpty()
  original_name: string;

  @IsNotEmpty()
  file_name: string;

  @IsNotEmpty()
  size: number;

  @IsNotEmpty()
  mime_type: string;

  @IsNotEmpty()
  path: string;
}

enum ModelTypes {
  post = 'Post',
}
