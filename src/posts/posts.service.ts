import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import mongoose, { Model, Types } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async findById(id) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    const post = await this.postModel.findOne({ _id: id });
    if (post) {
      return post;
    } else {
      return null;
    }
  }

  async create(postCreateDto, userId) {
    postCreateDto.user_id = userId;
    //post published when post created
    postCreateDto.is_published = true;
    postCreateDto.latest_comment = null;
    return await this.postModel.create(postCreateDto);
  }

  async getAll(authUserId) {
    const pipelineArr = [
      {
        $lookup: {
          from: 'media',
          localField: '_id',
          foreignField: 'related_model',
          as: 'medias',
        },
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
        $lookup: {
          from: 'comments',
          let: { postId: '$_id' },
          pipeline: [{ $match: { $expr: { $eq: ['$post_id', '$$postId'] } } }],
          as: 'latest_comment',
        },
      },
      { $unwind: '$user' },
      {
        $addFields: {
          is_liked: {
            $cond: {
              if: {
                $and: [
                  { $isArray: '$user_likes' },
                  { $gt: [{ $size: '$user_likes' }, 0] },
                  {
                    $in: [
                      new mongoose.Types.ObjectId(authUserId),
                      '$user_likes',
                    ],
                  },
                ],
              },
              then: true,
              else: false,
            },
          },
        },
      },
    ];

    const postsWithImages = await this.postModel.aggregate(pipelineArr).exec();
    return postsWithImages;
  }

  async like(id, userId) {
    const post = await this.postModel.findOne({ _id: id });
    if (post) {
      post.user_likes.push(userId);
      const updatedPost = await post.save();
      return updatedPost;
    } else {
      throw new NotFoundException();
    }
  }

  async unLike(id, userId) {
    const post = await this.postModel.findOne({ _id: id });
    if (post) {
      const userIndex = post.user_likes.findIndex(
        (id) => id.toString() === userId,
      );

      if (userIndex !== -1) {
        post.user_likes.splice(userIndex, 1);

        const updatedDoc = await post.save();

        return updatedDoc;
      } else {
        return post;
      }
    } else {
      throw new NotFoundException();
    }
  }
}
