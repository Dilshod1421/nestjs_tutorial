import { User } from './../users/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { FilesModule } from '../files/files.module';
import { Post } from './models/post.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Post]), FilesModule],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
