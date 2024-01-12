import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(data) {
    return await this.postModel.create(data);
  }

  async getAll() {
    const posts = await this.postModel.find();
    return posts;
  }
}
