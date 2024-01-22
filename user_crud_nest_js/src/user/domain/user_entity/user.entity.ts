import { Entity } from '@/shared/domain/entity/entity';
import { UserValidatorFactory } from './user.validator';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';

export type UserProps = {
  user_name: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  last_login: Date;
  created_at: Date;
  is_active: boolean;
};

export class UserEntity extends Entity<UserProps> {
  constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  update(
    user_name?: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    is_active?: boolean,
  ): void {
    UserEntity.validate({
      created_at: this.props.created_at,
      email: email ?? this.props.email,
      first_name: first_name ?? this.props.first_name,
      is_active: is_active ?? this.props.is_active,
      last_login: this.props.last_login,
      last_name: last_name ?? this.props.last_name,
      password: this.props.password,
      user_name: user_name ?? this.props.user_name,
    });
    this.props.user_name = user_name ?? this.props.user_name;
    this.props.first_name = first_name ?? this.props.first_name;
    this.props.last_name = last_name ?? this.props.last_name;
    this.props.email = email ?? this.props.email;
    this.props.is_active = is_active ?? this.props.is_active;
  }

  updateLastLogin(): void {
    const date = new Date();
    UserEntity.validate({ ...this.props, last_login: date });
    this.props.last_login = date;
  }

  updatePassword(password: string): void {
    UserEntity.validate({ ...this.props, password });
    this.props.password = password;
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
