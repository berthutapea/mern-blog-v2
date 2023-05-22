import express from "express";

import { getAccessToRoute } from "../Middlewares/Authorization/auth.js";

import {
  addNewCommentToStory,
  getAllCommentByStory,
  commentLike,
  getCommentLikeStatus,
} from "../Controllers/comment.js";

import { checkStoryExist } from "../Middlewares/database/databaseErrorhandler.js";

const router = express.Router();

router.post(
  "/:storyId/addComment",
  [getAccessToRoute, checkStoryExist],
  addNewCommentToStory
);

router.get("/:storyId/getAllComment", getAllCommentByStory);

router.post("/:comment_id/like", commentLike);

router.post("/:comment_id/getCommentLikeStatus", getCommentLikeStatus);

export default router;
// module.exports = router
