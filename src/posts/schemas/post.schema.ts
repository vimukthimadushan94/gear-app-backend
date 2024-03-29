import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Comment } from 'src/comment/schemas/comment.schema';
import { User } from 'src/user/schemas/user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  user_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Comment' })
  latest_comment: Comment;

  @Prop()
  description: string;

  @Prop()
  is_published: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }] })
  user_likes: User[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
