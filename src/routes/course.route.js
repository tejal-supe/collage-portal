import express from "express";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { validateCourseCreation, validateMaterialCreation } from "../utils/validator.js";
import { handleValidationErrors } from "../middlewares/validation.middleware.js";
import {
  createCourseController,
  createMaterialController,
  getCourseController,
  getMaterialsForCourseController,
} from "../controllers/course.controller.js";

const courseRoute = express.Router();

courseRoute.use(authenticateJWT);
courseRoute.post(
  "/",
  authorize(
    ["admin", "faculty"],
    validateCourseCreation,
    handleValidationErrors,
    createCourseController
  )
);
courseRoute.get("/", getCourseController);
courseRoute.post("/:id/materials",authorize(["faculty"]),validateMaterialCreation,handleValidationErrors,createMaterialController)
courseRoute.get("/:id/materials",authorize(["student","faculty"]),getMaterialsForCourseController);


export default courseRoute;
