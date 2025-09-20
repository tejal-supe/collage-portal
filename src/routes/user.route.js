import express from "express";

import {
  createApiKey,
  getMeController,
  loginUserController,
  registerUserController,
} from "../controllers/user.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { validateLoginUser, validateRegisterationUser } from "../utils/validator.js";
import { handleValidationErrors } from "../middlewares/validation.middleware.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  validateRegisterationUser,
  handleValidationErrors,
  registerUserController
);
userRouter.post(
  "/login",
  validateLoginUser,
  handleValidationErrors,
  loginUserController
);
userRouter.use(authenticateJWT);
userRouter.get("/getMe", getMeController);
userRouter.post("/generateApiKey", createApiKey);

export default userRouter;
