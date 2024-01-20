import { ClassValidatorFields } from '@/entity/class-validator-fields';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { UserProps } from './user.entity';

export class UserPropsRules {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  user_name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8}$/, {
    message:
      'Password too weak, must contain at least 8 characters, 1 letter, 1 number and 1 special character',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'first name must be at least 3 characters long' })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'last name must be at least 3 characters long' })
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty()
  @IsDate()
  last_login: Date;

  @IsNotEmpty()
  @IsDate()
  created_at: Date;

  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;

  constructor({
    user_name,
    password,
    first_name,
    last_name,
    email,
    last_login,
    created_at,
    is_active,
  }: UserProps) {
    Object.assign(this, {
      user_name,
      password,
      first_name,
      last_name,
      email,
      last_login,
      created_at,
      is_active,
    });
  }
}

export class UserValidator extends ClassValidatorFields<UserPropsRules> {
  validate(data: UserProps): boolean {
    return super.validate(new UserPropsRules(data ?? ({} as UserProps)));
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator();
  }
}
