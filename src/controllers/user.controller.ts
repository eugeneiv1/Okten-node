import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";

class UserController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("controller");

      const users = await userService.getAll();
      return res.status(200).json({ data: users });
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
