import { Entity } from '@/entity/entity';

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
}
