import { IsNotEmpty } from 'class-validator';

export class CommentCreateDto {
  @IsNotEmpty()
  comment: string;

  post_id: string;
}
