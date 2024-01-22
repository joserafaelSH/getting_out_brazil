import { HashProvider } from '@/shared/app/providers/hash-provider';
import { DrizzleProvider } from '@/shared/infra/database/drizzle/drizzle.provider';
import { Module } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { CreateUserUseCase } from '../app/usecases/create-user.usecase';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserDrizzleRepository } from './database/drizzle/user-drizzle.repository';
import { BcryptjsHashProvider } from './providers/hash_provider/bcryptjs-hash.provider';
import { UpdatePasswordUseCase } from '../app/usecases/update-password.usecase';
import { UpdateUserUseCase } from '../app/usecases/update-user.usecase';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'HashProvider',
      useClass: BcryptjsHashProvider,
    },
    ...DrizzleProvider,
    {
      provide: 'UserRepository',
      useFactory: (db: PostgresJsDatabase) => {
        return new UserDrizzleRepository(db);
      },
      inject: ['DrizzleProvider'],
    },
    {
      provide: CreateUserUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new CreateUserUseCase.UseCase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider'],
    },

    {
      provide: UpdatePasswordUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new UpdatePasswordUseCase.UseCase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: UpdateUserUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new UpdateUserUseCase.UseCase(userRepository);
      },
      inject: ['UserRepository', 'HashProvider'],
    },
  ],
})
export class UsersModule {}
