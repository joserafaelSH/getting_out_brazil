import { UserEntity, UserProps } from '../user_entity/user.entity';
import { faker } from '@faker-js/faker';

export abstract class UserGenerator {
  static generateUserWithId(id: string, user_props?: UserProps): UserEntity {
    return new UserEntity(
      {
        user_name: user_props?.user_name ?? faker.internet.userName(),
        password: user_props?.password ?? faker.internet.password(),
        first_name: user_props?.first_name ?? faker.person.firstName(),
        last_name: user_props?.last_name ?? faker.person.lastName(),
        email: user_props?.email ?? faker.internet.email(),
        last_login: user_props?.last_login ?? faker.date.recent(),
        created_at: user_props?.created_at ?? faker.date.recent(),
        is_active: user_props?.is_active ?? true,
      },
      id,
    );
  }

  static generateUserWithoutId(user_props: UserProps): UserEntity {
    return new UserEntity(user_props);
  }
}
