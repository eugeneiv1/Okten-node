import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middleWares/common.middleware";

const router = Router();

router.get("", userController.getAll);

router.post("", userController.addUser);

router.get("/:id", commonMiddleware.isIdValid, userController.getById);

router.delete("/:id", commonMiddleware.isIdValid, userController.deleteUser);

export const userRouter = router;
