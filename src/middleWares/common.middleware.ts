import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/apiError";

class CommonMiddleware {
  public isIdValid(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id)) {
        throw new ApiError("Id is not a number", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public isUserDataValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, username, email, age } = req.body;
      if (!name || !name.match(/^[a-zA-Z]{3,}$/)) {
        throw new ApiError("Name length must be greater than 3");
      }

      if (!username || !username.match(/^[a-zA-Z]{3,}$/)) {
        throw new ApiError("Username length must be greater than 3");
      }

      if (
        !email ||
        !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ) {
        throw new ApiError("Email not valid");
      }

      if (!age || age < 3) {
        throw new ApiError("Age must be greater than 3");
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const commonMiddleware = new CommonMiddleware();
