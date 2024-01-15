import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { Media, MediaSchema } from './schemas/media.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
    MulterModule.register({
      dest: './uploads', // Specify the destination folder for storing the uploaded files
    }),
    NestjsFormDataModule,
  ],
  providers: [MediaService],
  controllers: [MediaController],
  exports: [MediaService, NestjsFormDataModule],
})
export class MediaModule {}
