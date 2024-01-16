import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(postCreateDto, userId) {
    postCreateDto.user_id = userId;
    //post published when post created
    postCreateDto.is_published = true;
    return await this.postModel.create(postCreateDto);
  }

  async getAll() {
    const pipeline = [
      {
        $lookup: {
          from: 'media',
          localField: '_id',
          foreignField: 'related_model',
          as: 'medias',
        },
      },
    ];

    const postsWithImages = await this.postModel.aggregate(pipeline).exec();
    return postsWithImages;
  }
}
