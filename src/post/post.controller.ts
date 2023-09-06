import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './entities/post.entity';

@Controller()
export class PostController {
  constructor(private readonly service: PostService) {}
  @Get()
  async getPostByUserId(@Param('userId') userId: string) {
    return this.service.getPosts(userId);
  }

  @Post()
  async createPostByUserId(
    @Param('userId') userId: string,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return await this.service.createPost(userId, createPostDto);
  }
}
