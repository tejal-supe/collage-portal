import express from "express";

import {
  createApiKey,
  getMeController,
  loginUserController,
  registerUserController,
} from "../controllers/user.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/getMe", authenticateJWT, getMeController);
userRouter.post("/generateApiKey", authenticateJWT, createApiKey);

export default userRouter;
