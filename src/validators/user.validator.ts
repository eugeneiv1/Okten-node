import joi from "joi";

import { regexConstant } from "../constants/regex.constant";
export class UserValidator {
  private static password = joi.string().regex(regexConstant.PASSWORD).trim();
  private static email = joi
    .string()
    .regex(regexConstant.EMAIL)
    .trim()
    .lowercase();
  private static userName = joi.string().min(3).max(20).trim();
  private static age = joi.number().min(3).max(99);

  public static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  public static create = joi.object({
    name: this.userName.required(),
    email: this.email.required(),
    password: this.password.required(),
    age: this.age,
  });
}
