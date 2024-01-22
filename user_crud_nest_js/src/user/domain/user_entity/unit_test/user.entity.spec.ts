import { UserGenerator } from '@/user/utils/user_entity.generator';
import { UserEntity, UserProps } from '../user.entity';
import { v4 as uuidv4 } from 'uuid';

describe('UserEntity unit test', () => {
  it('Should create a user entity with id', () => {
    const sut: UserEntity = UserGenerator.generateUserWithId(uuidv4());
    expect(sut).toBeDefined();
    expect(sut.props).toBeDefined();
    expect(sut.id).toBeDefined();
    expect(sut.props.user_name).toBeDefined();
    expect(sut.props.user_name.length).toBeGreaterThan(0);
    expect(sut.props.password).toBeDefined();
    expect(sut.props.password.length).toBeGreaterThan(0);
    expect(sut.props.first_name).toBeDefined();
    expect(sut.props.first_name.length).toBeGreaterThan(0);
    expect(sut.props.last_name).toBeDefined();
    expect(sut.props.last_name.length).toBeGreaterThan(0);
    expect(sut.props.email).toBeDefined();
    expect(sut.props.email.length).toBeGreaterThan(0);
    expect(sut.props.last_login).toBeDefined();
    expect(sut.props.created_at).toBeDefined();
    expect(sut.props.is_active).toBeDefined();
  });

  it('Should create a user entity without id', () => {
    const user_props: UserProps = {
      user_name: 'user_name',
      password: 'password',
      first_name: 'first_name',
      last_name: 'last_name',
      email: 'email',
      last_login: new Date(),
      created_at: new Date(),
      is_active: true,
    };
    const sut: UserEntity = UserGenerator.generateUserWithoutId(user_props);
    expect(sut).toBeDefined();
    expect(sut.props).toBeDefined();
    expect(sut.id).toBeDefined();
    expect(sut.id.length).toBeGreaterThan(0);
    expect(sut.props.user_name).toBe(user_props.user_name);
    expect(sut.props.password).toBe(user_props.password);
    expect(sut.props.first_name).toBe(user_props.first_name);
    expect(sut.props.last_name).toBe(user_props.last_name);
    expect(sut.props.email).toBe(user_props.email);
    expect(sut.props.last_login).toBe(user_props.last_login);
    expect(sut.props.created_at).toBe(user_props.created_at);
    expect(sut.props.is_active).toBe(user_props.is_active);
  });
});
