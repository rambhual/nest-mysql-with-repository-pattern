import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { BaseRepository } from '../utils/repository';

@Injectable()
export class UserService extends BaseRepository<User> {
  constructor(entityManager: EntityManager) {
    super(User, entityManager);
  }
}
