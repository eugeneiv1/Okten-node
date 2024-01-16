import express from "express";

import { configs } from "./configs/config";
import { userRouter } from "./router/user.router";

const app = express();

app.use(express.json);
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

const PORT = configs.PORT;
app.listen(PORT, () => {
  console.log("Server is running");
});
