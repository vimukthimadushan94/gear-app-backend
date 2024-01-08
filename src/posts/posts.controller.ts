import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MediaService } from 'src/media/media.service';

@Controller('api/posts')
export class PostsController {
  constructor(
    private postService: PostsService,
    private mediaServce: MediaService,
  ) {}

  @Post('/create')
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
  async createPost(
    @Req() req: Request,
    @UploadedFiles()
    images: Array<Express.Multer.File>,
  ) {
    const post = await this.postService.create(req.body);
    images.forEach((file) => {
      console.log(file);
      this.mediaServce.uploadFile(file, post._id);
    });
    return post;
  }

  @Get('/')
  async getPosts() {
    const posts = await this.postService.getAll();
    return posts;
  }
}
