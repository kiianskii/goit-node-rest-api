import express from "express";
import validateBody from "../helpers/validateBody.js";
import isEmptyBody from "../middlewares/emptyBodyCheck.js";
import isValidId from "../helpers/idValid.js";

import { authSignupSchema, authSigninSchema } from "../schemas/authSchemas.js";

import authControllers from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(authSignupSchema),
  authControllers.signup
);

authRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(authSigninSchema),
  authControllers.signin
);

authRouter.get("/current");

authRouter.post("/signout");

export default authRouter;
