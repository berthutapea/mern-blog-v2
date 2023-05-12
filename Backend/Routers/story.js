import express from "express";
import fileUpload from "express-fileupload";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

import { getAccessToRoute } from "../Middlewares/Authorization/auth.js";
import {
  addStory,
  getAllStories,
  detailStory,
  likeStory,
  editStory,
  deleteStory,
  editStoryPage,
  getStoryAvatar,
  getStoryImages,
} from "../Controllers/story.js";
import {
  checkStoryExist,
  checkUserAndStoryExist,
} from "../Middlewares/database/databaseErrorhandler.js";

const router = express.Router();

router.post("/addstory", [getAccessToRoute, fileUpload()], addStory);

router.post("/images/get", getStoryImages);

router.post("/:storyId", checkStoryExist, detailStory);

router.post("/:storyId/like", [getAccessToRoute, checkStoryExist], likeStory);

router.get(
  "/editStory/:storyId",
  [getAccessToRoute, checkStoryExist, checkUserAndStoryExist],
  editStoryPage
);

router.post(
  //"/story/editStory/:storyId/edit",
  "/story/editStory/:storyId/edit",
  [
    () => {
      console.log("request for", storyId);
    },
    getAccessToRoute,
    checkStoryExist,
    //checkUserAndStoryExist,
    fileUpload(),
    // imageupload.single("image"),
  ],
  editStory
);

router.delete(
  "/story/:storyId/delete",
  [getAccessToRoute, checkStoryExist, checkUserAndStoryExist],
  deleteStory
);

router.get("/getAllStories", getAllStories);

router.get("/story_avatar", getStoryAvatar);

router.get("/images/:userId/:storyId/:image", (req, res) => {
  res.sendFile(
    join(
      __dirname,
      `../data/users/${req.params.userId}/stories/${req.params.storyId}/images/${req.params.image}`
    )
  );
});

// module.exports = router
export default router;
