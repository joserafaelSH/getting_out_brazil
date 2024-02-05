import { t } from "elysia";

export const passwordPattern =
  "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$";

export const regexDataString = "^\\d{4}-\\d{2}-\\d{2}$";

export const userNameValidator = {
  user_name: t.String({
    pattern: "^[a-zA-Z]+$",
    minLength: 3,
    default: "Doe",
  }),
};

export const passwordValidator = {
  password: t.String({
    minLength: 8,
    maxLength: 64,
    pattern: passwordPattern,
    default: "aA12345678!@#$%¨&*()_+=/",
  }),
};

export const firstNameValidator = {
  first_name: t.String({
    pattern: "^[a-zA-Z]+$",
    minLength: 3,
    default: "John",
  }),
};
export const lastNameValidator = {
  last_name: t.String({
    pattern: "^[a-zA-Z]+$",
    minLength: 3,
    default: "John",
  }),
};

export const emailValidator = {
  email: t.String({ format: "email", default: "test@test.com" }),
};

export const lastLoginValidator = {
  last_login:
    t.String({
      pattern: regexDataString,
      default: new Date().toISOString(),
    }) || t.Null(),
};
