import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path, { join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import cameraRouter from "./Routers/cameraRouter.js";

import authRoute from "./Routers/auth.js";
import storyRoute from "./Routers/story.js";
import userRoute from "./Routers/user.js";
import commentRoute from "./Routers/comment.js";

import IndexRoute from "./Routers/index.js";
import connectDatabase from "./Helpers/database/connectDatabase.js";
import customErrorHandler from "./Middlewares/Errors/customErrorHandler.js";

dotenv.config({
  path: "./Config/config.env",
});

connectDatabase();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", IndexRoute);
// app.use("/camera", cameraRouter);
// app.use("/auth", authRoute);
// app.use("/story", storyRoute);
// app.use("/user", userRoute);
// app.use("/comment", commentRoute);

app.use(customErrorHandler);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT} : ${process.env.NODE_ENV}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error : ${err}`);

  server.close(() => process.exit(1));
});
