import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';
import { MediaModule } from './media/media.module';
import { MediaController } from './media/media.controller';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule,
    AuthModule,
    PostsModule,
    MediaModule,
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController, PostsController, MediaController],
  providers: [AppService],
})
export class AppModule {}
