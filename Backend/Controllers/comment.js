import asyncErrorWrapper from "express-async-handler";
import Story from "../Models/story.js";
import Comment from "../Models/comment.js";

export const addNewCommentToStory = asyncErrorWrapper(
  async (req, res, next) => {
    const { storyId } = req.params;

    const { star, content } = req.body;

    const story = await Story.findById(storyId);

    const comment = await Comment.create({
      story: story._id,
      content: content,
      author: req.user.id,
      star: star,
    });

    story.comments.push(comment._id);

    story.commentCount = story.comments.length;

    await story.save();

    return res.status(200).json({
      success: true,
      data: comment,
    });
  }
);

export const getAllCommentByStory = asyncErrorWrapper(
  async (req, res, next) => {
    const { storyId } = req.params;

    // const story = await Story.findOne({ slug: slug });

    const commmentList = await Comment.find({
      story: storyId,
    })
      .populate({
        path: "author",
        select: "username photo",
      })
      .sort("-createdAt");

    return res.status(200).json({
      success: true,
      count: commmentList.length,
      data: commmentList,
    });
  }
);

export const commentLike = asyncErrorWrapper(async (req, res, next) => {
  const { activeUser } = req.body;
  const { comment_id } = req.params;

  const comment = await Comment.findById(comment_id);

  if (!comment.likes.includes(activeUser._id)) {
    comment.likes.push(activeUser._id);
    comment.likeCount = comment.likes.length;

    await comment.save();
  } else {
    const index = comment.likes.indexOf(activeUser._id);
    comment.likes.splice(index, 1);
    comment.likeCount = comment.likes.length;
    await comment.save();
  }

  const likeStatus = comment.likes.includes(activeUser._id);

  return res.status(200).json({
    success: true,
    data: comment,
    likeStatus: likeStatus,
  });
});

export const getCommentLikeStatus = asyncErrorWrapper(
  async (req, res, next) => {
    const { activeUser } = req.body;
    const { comment_id } = req.params;

    const comment = await Comment.findById(comment_id);
    const likeStatus = comment.likes.includes(activeUser._id);

    return res.status(200).json({
      success: true,
      likeStatus: likeStatus,
    });
  }
);

export const commentsControllers = {
  addNewCommentToStory,
  getAllCommentByStory,
  commentLike,
  getCommentLikeStatus,
};

export default commentsControllers;
