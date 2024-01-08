import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Media } from './schemas/media.schema';
import { Model } from 'mongoose';

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media.name) private mediaModel: Model<Media>) {}

  async uploadFile(file: Express.Multer.File, modelId: any) {
    await this.mediaModel.create({
      related_model: modelId,
      type: 'Post',
      original_name: file.originalname,
      file_name: file.filename,
      size: file.size,
      mime_type: file.mimetype,
      path: file.path,
    });
  }

  async get() {
    return await this.mediaModel.find().populate('related_model');
  }
}
