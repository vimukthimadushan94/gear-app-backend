import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { Media, MediaSchema } from './schemas/media.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MulterModule.register({
      dest: './uploads', // Specify the destination folder for storing the uploaded files
    }),
    NestjsFormDataModule,
  ],
  providers: [MediaService, UserService],
  controllers: [MediaController],
  exports: [MediaService, NestjsFormDataModule],
})
export class MediaModule {}
