import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  /**
   * Retrieves all posts from the database.
   * @returns A promise that resolves to an array of posts.
   */
  async getPosts(userId: string): Promise<PostEntity[]> {
    try {
      return await this.postRepository.find({ where: { userId } });
    } catch (error) {
      console.log(error);
      throw new Error('Failed to get posts');
    }
  }
  /**
   * Creates a new post by saving the provided `createPostDto` object.
   * @param createPostDto The DTO object containing the post data.
   * @returns The created post.
   * @throws InternalServerErrorException if an error occurs while saving the post.
   */
  async createPost(
    userId: string,
    createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    try {
      const createdPost = await this.postRepository.save({
        title: createPostDto.title,
        content: createPostDto.content,
        userId,
      });
      return createdPost;
    } catch (error) {
      console.log(JSON.stringify(error, null, 4));
      throw new InternalServerErrorException('Some things went wrong');
    }
  }
}
