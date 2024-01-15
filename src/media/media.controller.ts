import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadValidationPipe } from './file-upload-validation.pipe';
import { FileUploadDto } from './dto/file-upload.dto';

@Controller('api/media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Get('/')
  async getAll() {
    return this.mediaService.get();
  }

  @Post('add')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      storage: diskStorage({
        destination: './uploads', // adjust the destination folder
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
    }),
  )
  @UsePipes(FileUploadValidationPipe)
  async uploadFile(@UploadedFile() file, @Body() body: FileUploadDto) {
    console.log('upoadingg..');
    if (body.name) {
      return 'File uploaded successfully!';
    } else {
      throw new BadRequestException('Name is required');
    }
  }
}
