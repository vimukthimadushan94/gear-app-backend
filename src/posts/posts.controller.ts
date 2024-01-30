import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MediaService } from 'src/media/media.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { postCreateDto } from './dto/postCreate.dto';

@Controller('api/posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(
    private postService: PostsService,
    private mediaService: MediaService,
  ) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        // destination: './uploads/posts',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `post-${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  async createPost(
    @Body() postBody: postCreateDto,
    @Req() req: any,
    // @UploadedFiles()
    // images: Array<Express.Multer.File>,
  ) {
    const post = await this.postService.create(postBody, req.user.userId);
    // images.forEach((file) => {
    //   this.mediaService.uploadFile(file, post._id);
    // });
    return post;
  }

  @Get('/')
  async getPosts(@Req() req: any) {
    const userId = req.user.userId;
    return await this.postService.getAll(userId);
  }

  @Post('/like/:postId')
  async like(@Param() data, @Req() req: any) {
    const { postId } = data;
    const userId = req.user.userId;
    const post = await this.postService.like(postId, userId);
    return post;
  }

  @Post('/unlike/:postId')
  async unlike(@Param() data, @Req() req: any) {
    const { postId } = data;
    const userId = req.user.userId;
    const post = await this.postService.unLike(postId, userId);
    return post;
  }
}
