import express from "express";
import User from "../models/user.js";
import createError from "http-errors";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const userRouter = express.Router();
userRouter
  .post("/register", async (req, res, next) => {
    //console.log(req.body);
    try {
      const { name, email, password, confirmPasswordInput } = req.body;
      // check confirm passsword
      if (password !== confirmPasswordInput) {
        return res.json({ success: false, error: "Password dosent match" });
      }
      const usernameCheck = await User.findOne({ name });
      // if (usernameCheck)
      //   return res.json({ msg: "Username already used", status: false });
      // const emailCheck = await User.findOne({ email });
      // if (emailCheck)
      //   return res.json({ msg: "Email already used", status: false });
      const hashedPassword = await hash(password, 10);
      req.body.password = hashedPassword;
      const user = await User.create(req.body);
      delete user.password;

      // create a new directory for the new user
      if (!fs.existsSync(`${join(__dirname, `../data/users/${user.id}`)}`)) {
        fs.mkdirSync(`${join(__dirname, `../data/users/${user.id}`)}`);
      }
      return res.json({ status: true, user });
    } catch (error) {
      res.json(error.message);
      // next(createError(401, error.message));
    }
  })
  .post("/login", async (req, res, next) => {
    console.log("Test from login");
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        next(createError(401, "User not found !!!!!"));
        return;
      }

      const doneLogin = await compare(req.body.password, user.password);
      if (!doneLogin) {
        next(createError(401, "Failed !!!!"));
        return;
      }

      const option = { expiresIn: "10m" };
      const token = jwt.sign({ id: user._id }, process.env.SECRET, option);

      res.send({ user, token });
    } catch (error) {
      next(createError(500, error.message));
    }
  });

export default userRouter;
