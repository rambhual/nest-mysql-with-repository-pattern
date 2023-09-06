import { Logger, NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  EntityManager,
  EntityTarget,
  FindOneOptions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

/**
 * The `BaseRepository` class is an abstract class that provides basic CRUD (Create, Read, Update, Delete) operations for entities using the TypeORM library in TypeScript.
 * @template T The type of the entity being managed by the repository.
 */
export abstract class BaseRepository<T> {
    protected readonly logger = new Logger(BaseRepository.name)
  /**
   * Creates a new instance of the `BaseRepository` class.
   * @param entityClass The class of the entity being managed by the repository.
   * @param entityManager The EntityManager instance used to perform database operations.
   */
  constructor(
    private readonly entityClass: EntityTarget<T>,
    protected readonly entityManager: EntityManager,
  ) {}

  /**
   * Creates a new entity by using the provided data and saves it to the database.
   * @param data The data to create the entity.
   * @returns A promise that resolves to the created entity.
   */
  async create(data: DeepPartial<T>): Promise<T> {
   try {
    const entity = this.entityManager.create(this.entityClass, data);
    return await this.entityManager.save(entity);
   } catch (error) {
    this.logger.log(error)
   }
  }

  /**
   * Find an entity by its ID using the provided options.
   * @param options - The options to find the entity.
   * @returns A promise that resolves to the found entity, or undefined if not found.
   * @throws NotFoundException if the entity is not found.
   */
  async findById(options: FindOneOptions<T>): Promise<T | undefined> {
    const entity = await this.entityManager.findOne(this.entityClass, options);
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }

  /**
   * Updates an entity by ID using the provided options and data, and returns the updated entity.
   * @param options The options to find the entity to update.
   * @param data The data to update the entity.
   * @returns A promise that resolves to the updated entity, or undefined if not found.
   */
  async update(
    options: FindOneOptions<T>,
    data: QueryDeepPartialEntity<T>,
  ): Promise<T | undefined> {
    await this.entityManager.update(this.entityClass, options, data);
    return await this.findById(options);
  }

  /**
   * Deletes an entity by ID using the provided options.
   * @param options The options to find the entity to delete.
   * @returns A promise that resolves when the entity is deleted.
   */
  async delete(options: FindOneOptions<T>): Promise<void> {
    await this.entityManager.delete(this.entityClass, options);
  }

  /**
   * Finds all entities of the specified type.
   * @returns A promise that resolves to an array of all entities.
   */
  async findAll(options?: FindOneOptions<T>): Promise<T[]> {
    return await this.entityManager.find(this.entityClass, options);
  }
}
