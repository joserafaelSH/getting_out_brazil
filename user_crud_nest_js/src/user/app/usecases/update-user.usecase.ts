import { UserRepository } from '@/user/domain/repositories/user.repository';
import { UserOutput, UserOutputMapper } from '../dto/user-output';
import { UseCase as DefaultUseCase } from '@/shared/app/usecases/use-case';

export namespace UpdateUserUseCase {
  export type Input = {
    id: string;
    first_name?: string;
    last_name?: string;
    email?: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id);
      entity.update(input.first_name, input.last_name, input.email);
      await this.userRepository.update(entity);
      return UserOutputMapper.toOutput(entity);
    }
  }
}
