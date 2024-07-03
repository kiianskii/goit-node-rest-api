import express from "express";

import authControllers from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);

export default usersRouter;
