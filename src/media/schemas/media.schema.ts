import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type MediaDocument = HydratedDocument<Media>;

@Schema({ timestamps: true })
export class Media {
  @Prop({ type: mongoose.Schema.Types.ObjectId, refPath: 'type' })
  related_model: Types.ObjectId;

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
