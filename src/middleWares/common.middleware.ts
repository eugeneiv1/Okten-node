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
}

export const commonMiddleware = new CommonMiddleware();
