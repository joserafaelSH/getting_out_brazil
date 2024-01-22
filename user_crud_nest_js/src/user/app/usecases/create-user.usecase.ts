import { UserRepository } from '@/user/domain/repositories/user.repository';
import { UserOutput, UserOutputMapper } from '../dto/user-output';
import { UseCase as DefaultUseCase } from '@/shared/app/usecases/use-case';
import { HashProvider } from '@/shared/app/providers/hash-provider';
import { InvalidPasswordError } from '@/shared/app/errors/invalid-password-error';
import { UserEntity, UserProps } from '@/user/domain/user_entity/user.entity';

export namespace CreateUserUseCase {
  export type Input = {
    user_name: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { user_name, password, first_name, last_name, email } = input;
      if (!user_name || !password || !first_name || !last_name || !email) {
        throw new InvalidPasswordError('Input data not provided');
      }
      await this.userRepository.emailExists(email);
      const hashPassword = await this.hashProvider.generateHash(password);
      const userProps: UserProps = {
        user_name,
        password: hashPassword,
        first_name,
        last_name,
        email,
        last_login: new Date(),
        created_at: new Date(),
        is_active: true,
      };

      const entity = new UserEntity(userProps);
      await this.userRepository.insert(entity);
      return UserOutputMapper.toOutput(entity);
    }
  }
}
