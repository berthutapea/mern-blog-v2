import express from "express";

import imageUpload from "../Helpers/Libraries/imageUpload.js";

import {
  profile,
  editProfile,
  changePassword,
  addStoryToReadList,
  readListPage,
} from "../Controllers/user.js";
import { getAccessToRoute } from "../Middlewares/Authorization/auth.js";

const router = express.Router();

router.get("/profile", getAccessToRoute, profile);

router.post(
  "/editProfile",
  [getAccessToRoute, imageUpload.single("photo")],
  editProfile
);

router.put("/changePassword", getAccessToRoute, changePassword);

router.post("/:slug/addStoryToReadList", getAccessToRoute, addStoryToReadList);

router.get("/readList", getAccessToRoute, readListPage);

export default router;
