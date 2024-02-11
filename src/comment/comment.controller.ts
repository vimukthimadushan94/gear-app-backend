import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentService } from './comment.service';
import { CommentCreateDto } from './dto/commentCreate.dto';
import { PostsService } from 'src/posts/posts.service';

@UseGuards(JwtAuthGuard)
@Controller('api/comment')
export class CommentController {
  constructor(
    private commentService: CommentService,
    private postService: PostsService,
  ) {}

  @Post('/:postId')
  async createComment(
    @Param() param,
    @Body() body: CommentCreateDto,
    @Req() req: any,
  ) {
    const { postId } = param;
    const post = await this.postService.findById(postId);

    if (post) {
      body.post_id = postId;
      const userId = req.user.userId;
      const comment = this.commentService.create(body, userId);
      return comment;
    } else {
      throw new NotFoundException('Post not exists');
    }
  }

  @Get('/:postId')
  async getComments(@Param() param) {
    const { postId } = param;
    const comments = this.commentService.getByPostId(postId);
    return comments;
  }
}
