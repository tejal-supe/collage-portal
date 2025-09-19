import express from "express";

import {
  createAnnouncementController,
  viewAnnouncementController,
} from "../controllers/announcement.controller.js";
import { authorize } from "../middlewares/role.middleware.js";
import { validateAnnouncementCreation } from "../utils/validator.js";
import { handleValidationErrors } from "../middlewares/validation.middleware.js";

const announcementRoute = express.Router();

announcementRoute.get("/announcements", viewAnnouncementController);
announcementRoute.post(
  "/announcements",
  authorize(["admin", "faculty"]),
  validateAnnouncementCreation,
  handleValidationErrors,
  createAnnouncementController
);

export default announcementRoute;
