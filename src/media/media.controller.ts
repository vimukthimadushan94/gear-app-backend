import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from 'src/user/user.service';

@UseGuards(JwtAuthGuard)
@Controller('api/media')
export class MediaController {
  constructor(
    private mediaService: MediaService,
    private userService: UserService,
  ) {}

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

  @Post('update-avatar')
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
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    const mediaResponse = await this.mediaService.uploadAvatar(
      avatar,
      userId,
      'User',
    );
    const userResponse = await this.userService.updateUserAvatar(
      mediaResponse,
      userId,
    );
    return userResponse;
  }
}
