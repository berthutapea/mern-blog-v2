import { Router } from "express";
import fileUpload from "express-fileupload";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

import authRoute from "./auth.js";
import storyRoute from "./story.js";
import userRoute from "./user.js";
import commentRoute from "./comment.js";
import cameraRouter from "./cameraRouter.js";

router.use("/camera", cameraRouter);
router.use("/auth", authRoute);
router.use("/story", storyRoute);
router.use("/user", fileUpload(), userRoute);
router.use("/comment", commentRoute);

router.post("/show", (req, res) => {
  console.log(req.body);
  if (req.body.userId)
    fs.readdir(
      join(__dirname, `../data/users/${req.body.userId}/userFiles`),
      (err, files) => {
        if (err) {
          res.json({
            success: false,
            message: " no images founded",
            error: err,
          });
        } else {
          console.log(files);
          res.json({ success: true, images: files });
        }
      }
    );
  else {
    res.json({
      success: false,
      message: " no images founded",
    });
  }
});

export default router;
