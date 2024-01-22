/* eslint-disable @typescript-eslint/no-unused-vars */
import { DrizzleAsyncProvider } from '@/shared/infra/database/drizzle/drizzle.provider';
import { users } from '@/shared/infra/database/drizzle/schema';
import { UserRepository } from '@/user/domain/repositories/user.repository';
import { UserEntity } from '@/user/domain/user_entity/user.entity';
import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { UserModelMapper } from './user-model.mapper';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

export class UserDrizzleRepository implements UserRepository.Repository {
  constructor(@Inject(DrizzleAsyncProvider) private db: PostgresJsDatabase) {}
  emailExists(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  sortableFields: string[];
  search(
    props: UserRepository.SearchParams,
  ): Promise<UserRepository.SearchResult> {
    throw new Error('Method not implemented.');
  }
  insert(entity: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
  update(entity: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.db
        .select()
        .from(users)
        .where(eq(users.email, email));

      return UserModelMapper.toEntity(user[0]);
    } catch {
      throw new NotFoundError(`UserModel not found using email ${email}`);
    }
  }
}
