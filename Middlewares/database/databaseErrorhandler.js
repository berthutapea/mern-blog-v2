import asyncErrorWrapper from "express-async-handler";
import CustomError from "../../Helpers/error/CustomError.js";
import Story from "../../Models/story.js";

export const checkStoryExist = asyncErrorWrapper(async (req, res, next) => {
  const { storyId } = req.params;
  const story = await Story.findById(storyId);
  // console.log(story);

  if (!story) {
    return next(new CustomError("There is no such story with that slug ", 400));
  }

  next();
});

export const checkUserAndStoryExist = asyncErrorWrapper(
  async (req, res, next) => {
    const { author } = req.body;
    const { storyId } = req.params;

    const story = await Story.findOne({
      author: author,
      _id: storyId,
    });

    if (!story) {
      return next(
        new CustomError(
          "There is no story with that slug associated with User ",
          400
        )
      );
    }

    next();
  }
);

export const errorHandler = {
  checkStoryExist,
  checkUserAndStoryExist,
};
export default errorHandler;
