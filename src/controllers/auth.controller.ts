import { NextFunction, Request, Response } from "express";

import { authService } from "../services/auth.service";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const userInfo = req.body;
      const createdUser = await authService.signUp(userInfo);
      res.status(200).json(createdUser);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
