import * as t from "bun:test";
import { faker } from "@faker-js/faker";
import { User, type UserProps } from "../user";

t.describe("User class unit tests", () => {
  let user_props: UserProps;
  let sut: User;

  t.beforeAll(() => {
    user_props = {
      user_name: faker.internet.userName(),
      password: faker.internet.password(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      last_login: faker.date.past(),
    };

    sut = new User(user_props);
  });

  t.it("should create a new User instance", () => {
    t.expect(sut).toBeInstanceOf(User);
  });

  t.it("should return the user_name", () => {
    t.expect(sut.user_name).toBe(user_props.user_name);
  });

  t.it("should return the password", () => {
    t.expect(sut.password).toBe(user_props.password);
  });

  t.it("should return the first_name", () => {
    t.expect(sut.first_name).toBe(user_props.first_name);
  });

  t.it("should return the last_name", () => {
    t.expect(sut.last_name).toBe(user_props.last_name);
  });

  t.it("should return the email", () => {
    t.expect(sut.email).toBe(user_props.email);
  });

  t.it("should return the last_login", () => {
    t.expect(sut.last_login).toBe(user_props.last_login);
  });

  t.it("should return the last_login null", () => {
    const new_user_props = { ...user_props, last_login: null };
    sut = new User(new_user_props);
    t.expect(sut.last_login).toBeNull();
  });

  t.it("should update the user_name", () => {
    const new_user_name = faker.internet.userName();

    sut.update({ ...user_props, user_name: new_user_name });

    t.expect(sut.user_name).toBe(new_user_name);
  });
});
