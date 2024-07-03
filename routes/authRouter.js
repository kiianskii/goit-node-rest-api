import express from "express";
import validateBody from "../helpers/validateBody.js";
import isEmptyBody from "../middlewares/emptyBodyCheck.js";

import {
  authSignupSchema,
  authSigninSchema,
  authVerifySchema,
} from "../schemas/authSchemas.js";

import authControllers from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(authSignupSchema),
  authControllers.signup
);

authRouter.get("/verify/:verificationCode", authControllers.verify);

authRouter.post(
  "/verify",
  isEmptyBody,
  validateBody(authVerifySchema),
  authControllers.resendEmail
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(authSigninSchema),
  authControllers.signin
);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.signout);

export default authRouter;
