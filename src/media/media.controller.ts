import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('api/media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Get('/')
  async getAll() {
    return this.mediaService.get();
  }

  @Post('upload-media/:postId')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: './uploads/posts',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `post-${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Param('postId') postId,
  ) {
    images.forEach((file) => {
      this.mediaService.uploadFile(file, postId);
    });
    return images;
  }

  @Post('update-avatar/:userId')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/avatar',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `avatar-${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  async updateProfileImage(
    @UploadedFile() avatar: Express.Multer.File,
    @Param('userId') userId,
  ) {
    const response = this.mediaService.uploadAvatar(avatar, userId, 'User');
    return response;
  }
}
