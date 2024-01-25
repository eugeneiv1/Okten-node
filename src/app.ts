import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { ApiError } from "./errors/api.error";
import { authRouter } from "./routers/auth.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

app.use(
  "*",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    return res.status(err?.status | 500).json({
      message: err.message,
      status: err.status,
    });
  },
);

const PORT = configs.PORT;
app.listen(PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  console.log(`Server is running on ${PORT}`);
});
