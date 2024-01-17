import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middleWares/common.middleware";

const router = Router();

router.get("", userController.getAll);

router.get("/:id", commonMiddleware.isIdValid, userController.getById);

router.get("/test", userController.test);

router.post("", commonMiddleware.isUserDataValid, userController.addUser);

router.delete("/:id", commonMiddleware.isIdValid, userController.deleteUser);

export const userRouter = router;
