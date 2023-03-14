import { CreateAuthDto } from './../auth/dto/create-auth.dto';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { Post } from './models/post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private readonly fileService: FilesService
  ){}


  async create(createPostDto: CreatePostDto, image: any) {
    console.log('SERVICE>>>>>>>>>>>>>');
    
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepository.create({
      ...createPostDto,
      image: fileName
    });
    return post
  }
}
