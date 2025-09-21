import express from "express";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { apiKeyAuthenticate } from "../middlewares/apiKey.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { addResults, getResults } from "../controllers/result.controller.js";

const resultRoute = express.Router();


resultRoute.use(authenticateJWT,apiKeyAuthenticate);
resultRoute.post("/",authorize(["admin"]),addResults);
resultRoute.get("/:studentId",getResults);
export default resultRoute;