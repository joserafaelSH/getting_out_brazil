import { UserProps } from '../user.entity';
import { UserValidator, UserValidatorFactory } from '../user.validator';
import { faker } from '@faker-js/faker';

describe('UserEntityValidator unit test', () => {
  let props: UserProps;
  let sut: UserValidator;

  beforeEach(() => {
    sut = UserValidatorFactory.create();
    props = {
      user_name: faker.internet.userName(),
      password: 'A12345678!',
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      last_login: faker.date.recent(),
      created_at: faker.date.recent(),
      is_active: faker.datatype.boolean(),
    };
  });

  it('Invalidation test: user_name is empty', () => {
    const isValidate = sut.validate({ ...props, user_name: '' });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['user_name']).toStrictEqual([
      'Username must be at least 3 characters long',
      'user_name should not be empty',
    ]);
  });
  it('Invalidation test: user_name is null', () => {
    const isValidate = sut.validate({ ...props, user_name: null });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['user_name']).toStrictEqual([
      'Username must be at least 3 characters long',
      'user_name should not be empty',
      'user_name must be a string',
    ]);
  });

  it("Invalidation test: password doesn't have at least 1 uppercase letter", () => {
    const isValidate = sut.validate({ ...props, password: 'a12345678!' });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['password']).toStrictEqual([
      'Password too weak, must contain at least 8 characters, 1 letter, 1 number and 1 special character',
    ]);
  });

  it("Invalidation test: password doesn't have 8 characters", () => {
    const isValidate = sut.validate({ ...props, password: 'A12345!' });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['password']).toStrictEqual([
      'Password too weak, must contain at least 8 characters, 1 letter, 1 number and 1 special character',
    ]);
  });

  it("Invalidation test: password doesn't have special characters", () => {
    const isValidate = sut.validate({ ...props, password: 'A12345678' });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['password']).toStrictEqual([
      'Password too weak, must contain at least 8 characters, 1 letter, 1 number and 1 special character',
    ]);
  });

  it("Invalidation test: password doesn't have special characters", () => {
    const isValidate = sut.validate({ ...props, password: '!12345678' });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['password']).toStrictEqual([
      'Password too weak, must contain at least 8 characters, 1 letter, 1 number and 1 special character',
    ]);
  });

  it('Invalidation test: first_name is empty', () => {
    const isValidate = sut.validate({ ...props, first_name: '' });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['first_name']).toStrictEqual([
      'first name must be at least 3 characters long',
      'first_name should not be empty',
    ]);
  });
  it('Invalidation test: first_name is null', () => {
    const isValidate = sut.validate({ ...props, first_name: null });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['first_name']).toStrictEqual([
      'first name must be at least 3 characters long',
      'first_name should not be empty',
      'first_name must be a string',
    ]);
  });

  it('Invalidation test: last_name is empty', () => {
    const isValidate = sut.validate({ ...props, last_name: '' });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['last_name']).toStrictEqual([
      'last name must be at least 3 characters long',
      'last_name should not be empty',
    ]);
  });
  it('Invalidation test: last_name is null', () => {
    const isValidate = sut.validate({ ...props, last_name: null });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['last_name']).toStrictEqual([
      'last name must be at least 3 characters long',
      'last_name should not be empty',
      'last_name must be a string',
    ]);
  });

  it('Invalidation test: email is empty', () => {
    const isValidate = sut.validate({ ...props, email: '' });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['email']).toStrictEqual([
      'Invalid email',
      'email should not be empty',
    ]);
  });

  it('Invalidation test: email is null', () => {
    const isValidate = sut.validate({ ...props, email: null });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['email']).toStrictEqual([
      'Invalid email',
      'email should not be empty',
      'email must be a string',
    ]);
  });

  it('Invalidation test: email is invalid', () => {
    let isValidate = sut.validate({ ...props, email: 'email' });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['email']).toStrictEqual(['Invalid email']);
    isValidate = sut.validate({ ...props, email: 'email@' });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['email']).toStrictEqual(['Invalid email']);
    isValidate = sut.validate({ ...props, email: 'email@domain' });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['email']).toStrictEqual(['Invalid email']);
  });

  it('Invalidation test: last_login is null', () => {
    const isValidate = sut.validate({ ...props, last_login: null });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['last_login']).toStrictEqual([
      'last_login must be a Date instance',
      'last_login should not be empty',
    ]);
  });

  it('Invalidation test: created_at is null', () => {
    const isValidate = sut.validate({ ...props, created_at: null });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['created_at']).toStrictEqual([
      'created_at must be a Date instance',
      'created_at should not be empty',
    ]);
  });

  it('Invalidation test: is_active is null', () => {
    let isValidate = sut.validate({ ...props, is_active: 'null' as any });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['is_active']).toStrictEqual([
      'is_active must be a boolean value',
    ]);
    isValidate = sut.validate({ ...props, is_active: null });
    expect(isValidate).toBeFalsy();
    expect(sut.errors['is_active']).toStrictEqual([
      'is_active must be a boolean value',
      'is_active should not be empty',
    ]);
  });
});
