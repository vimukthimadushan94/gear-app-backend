import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { Post } from 'src/posts/schemas/post.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async create(data, userId) {
    data.user_id = userId;
    const comment = await this.commentModel.create(data);

    if (comment) {
      const post = await this.postModel.findOne({ _id: data.post_id });
      post.latest_comment = comment;
      await post.save();
    }
    return comment;
  }

  async getByPostId(postId) {
    try {
      const comments = await this.commentModel.aggregate([
        {
          $match: { post_id: new mongoose.Types.ObjectId(postId) },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },
      ]);
      return comments;
    } catch (error) {
      throw new NotFoundException('Invalid post Id ' + error.message);
    }
  }
}
