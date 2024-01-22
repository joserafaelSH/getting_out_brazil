import { UserEntity } from '@/user/domain/user_entity/user.entity';

export type UserOutput = {
  id: string;
  user_name: string;
  first_name: string;
  last_name: string;
  email?: string;
  last_login: Date;
  created_at: Date;
  is_active: boolean;
};

export class UserOutputMapper {
  static toOutput(entity: UserEntity): UserOutput {
    delete entity.props.password;
    return entity.toJSON();
  }
}
