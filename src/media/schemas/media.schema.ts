import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MediaDocument = HydratedDocument<Media>;

@Schema({ timestamps: true })
export class Media {
  @Prop()
  model_id: mongoose.Schema.Types.ObjectId;

  @Prop()
  type: string;

  @Prop()
  original_name: string;

  @Prop()
  file_name: string;

  @Prop()
  size: string;

  @Prop()
  mime_type: string;

  @Prop()
  path: string;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
