import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";

class UserController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();
      return res.status(200).json({ data: users });
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const user = await userService.getById(id);
      res.status(200).json({ data: user });
    } catch (e) {
      next(e);
    }
  }

  public async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body;
      const newUser = await userService.addUser(user);
      console.log(newUser);
      res.status(200).json(newUser);
    } catch (e) {
      next(e);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const deletedUser = await userService.deleteById(id);
      res.status(200).json(deletedUser);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
