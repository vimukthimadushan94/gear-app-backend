import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MediaService } from 'src/media/media.service';
import { Media, MediaSchema } from 'src/media/schemas/media.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
    MulterModule.register({
      dest: './files',
    }),
  ],
  exports: [PostsService],
  controllers: [PostsController],
  providers: [PostsService, MediaService],
})
export class PostsModule {}
