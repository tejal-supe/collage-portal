import express from "express";

import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { apiKeyAuthenticate } from "../middlewares/apiKey.middleware";
import { changeUserRole, getAllUsers } from "../controllers/admin.controller.js";

const adminRoute = express.Router();

adminRoute.use(authenticateJWT,apiKeyAuthenticate(),authorize(["admin"]));
adminRoute.get("/users",getAllUsers);
adminRoute.put("/users/:id/role",changeUserRole)

export default adminRoute;
