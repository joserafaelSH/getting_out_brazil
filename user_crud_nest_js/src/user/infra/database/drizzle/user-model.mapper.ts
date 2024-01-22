import { ValidationError } from '@/shared/domain/errors/validation-error';
import { UserEntity, UserProps } from '@/user/domain/user_entity/user.entity';

export class UserModelMapper {
  static toEntity(model: UserProps & { id: string }) {
    try {
      const { id, ...props } = model;
      return new UserEntity(props, id);
    } catch {
      throw new ValidationError('An entity not be loaded');
    }
  }
}
