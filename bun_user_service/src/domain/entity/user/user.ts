import { Entity } from "../entity";

export type UserProps = {
  user_name: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  last_login: Date | null;
  created_at?: Date;
};

export class User extends Entity<UserProps> {
  constructor(props: UserProps, id?: string) {
    props.last_login = null;
    props.created_at = new Date();
    super(props, id);
  }

  update(props: UserProps): void {
    this.props.user_name = props.user_name || this.props.user_name;
    this.props.password = props.password || this.props.password;
    this.props.first_name = props.first_name || this.props.first_name;
    this.props.last_name = props.last_name || this.props.last_name;
    this.props.email = props.email || this.props.email;
    this.props.last_login = props.last_login;
  }

  get user_name(): string {
    return this.props.user_name;
  }

  get password(): string {
    return this.props.password;
  }

  get first_name(): string {
    return this.props.first_name;
  }

  get last_name(): string {
    return this.props.last_name;
  }

  get email(): string {
    return this.props.email;
  }

  get last_login(): Date | null {
    return this.props.last_login;
  }

  get created_at(): Date {
    return this.props.created_at!;
  }
}
