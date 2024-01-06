import { Controller, Post, Req } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('api/posts')
export class PostsController {
  constructor(private postService: PostsService) {}
  @Post('/create')
  async createPost(@Req() req: Request) {
    const post = await this.postService.create(req.body);
    return post;
  }
}
