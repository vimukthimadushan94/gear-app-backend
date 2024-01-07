import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Media } from './schemas/media.schema';
import { Model } from 'mongoose';

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media.name) private mediaModel: Model<Media>) {}

  async uploadFile(file: Express.Multer.File, modelId: any) {
    await this.mediaModel.create({
      model_id: modelId,
      type: 'POST',
      original_name: file.originalname,
      file_name: file.filename,
      size: file.size,
      mime_type: file.mimetype,
      path: file.path,
    });
  }
}
