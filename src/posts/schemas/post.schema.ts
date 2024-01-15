import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop()
  user_id: string;

  @Prop()
  description: string;

  @Prop()
  is_published: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
