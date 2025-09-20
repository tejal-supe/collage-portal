import express from "express";

import {
  createAnnouncementController,
  viewAnnouncementController,
} from "../controllers/announcement.controller.js";
import { authorize } from "../middlewares/role.middleware.js";
import { validateAnnouncementCreation } from "../utils/validator.js";
import { handleValidationErrors } from "../middlewares/validation.middleware.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { apiKeyAuthenticate } from "../middlewares/apiKey.middleware.js";

const announcementRoute = express.Router();

announcementRoute.use(authenticateJWT,apiKeyAuthenticate)
announcementRoute.get("/", viewAnnouncementController);
announcementRoute.post(
  "/",
  authorize(["admin", "faculty"]),
  validateAnnouncementCreation,
  handleValidationErrors,
  createAnnouncementController
);

export default announcementRoute;
