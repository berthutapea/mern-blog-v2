import asyncErrorWrapper from "express-async-handler";
import User from "../Models/user.js";
import Story from "../Models/story.js";
import CustomError from "../Helpers/error/CustomError.js";
import {
  comparePassword,
  validateUserInput,
} from "../Helpers/input/inputHelpers.js";

export const profile = asyncErrorWrapper(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
});

export const editProfile = asyncErrorWrapper(async (req, res, next) => {
  const { email, username } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      email,
      username,
      photo: req.savedUserPhoto,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({
    success: true,
    data: user,
  });
});

export const changePassword = asyncErrorWrapper(async (req, res, next) => {
  const { newPassword, oldPassword } = req.body;

  if (!validateUserInput(newPassword, oldPassword)) {
    return next(new CustomError("Please check your inputs ", 400));
  }

  const user = await User.findById(req.user.id).select("+password");

  if (!comparePassword(oldPassword, user.password)) {
    return next(new CustomError("Old password is incorrect ", 400));
  }

  user.password = newPassword;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Change Password  Successfully",
    user: user,
  });
});

export const addStoryToReadList = asyncErrorWrapper(async (req, res, next) => {
  const { slug } = req.params;
  const { activeUser } = req.body;

  const story = await Story.findOne({ slug });

  const user = await User.findById(activeUser._id);

  if (!user.readList.includes(story.id)) {
    user.readList.push(story.id);
    user.readListLength = user.readList.length;
    await user.save();
  } else {
    const index = user.readList.indexOf(story.id);
    user.readList.splice(index, 1);
    user.readListLength = user.readList.length;
    await user.save();
  }

  const status = user.readList.includes(story.id);

  return res.status(200).json({
    success: true,
    story: story,
    user: user,
    status: status,
  });
});

export const readListPage = asyncErrorWrapper(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const readList = [];

  for (let index = 0; index < user.readList.length; index++) {
    var story = await Story.findById(user.readList[index]).populate("author");

    readList.push(story);
  }

  return res.status(200).json({
    success: true,
    data: readList,
  });
});

export const userControl = {
  profile,
  editProfile,
  changePassword,
  addStoryToReadList,
  readListPage,
};

export default userControl;
