import bcrypt from "bcrypt";

import fs from "fs/promises";
import Jimp from "jimp";
import path from "path";
import gravatar from "gravatar";

import HttpError from "../helpers/HttpError.js";

import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../helpers/ctrlWrapper.js";

import { createToken } from "../helpers/jwt.js";

const avatarsPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await authServices.findUser({ email });

  if (user) {
    throw HttpError(409, "User with this email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await authServices.signup({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const { _id: id } = user;
  const payload = {
    id,
  };

  const token = createToken(payload);

  await authServices.updateUser({ _id: id }, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = (req, res) => {
  const { email, subscription, avatarURL } = req.user;

  res.json({
    email,
    subscription,
    avatarURL,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await authServices.updateUser({ _id }, { token: "" });

  res.json({
    message: "Logout success",
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;

  const newPath = path.join(avatarsPath, filename);

  Jimp.read(oldPath, (err, img) => {
    if (err) throw err;
    img.resize(250, 250).write(newPath);
  });

  await fs.rename(oldPath, newPath);

  const avatarURL = path.join("avatars", filename);
  await authServices.setAvatar(_id, avatarURL);
  return res.json({ avatarURL });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
