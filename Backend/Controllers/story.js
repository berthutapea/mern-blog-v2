import Story from "../Models/story.js";
import Image from "../Models/image.js";
import asyncErrorWrapper from "express-async-handler";
import deleteImageFile from "../Helpers/Libraries/deleteImageFile.js";
import { searchHelper, paginateHelper } from "../Helpers/query/queryHelpers.js";
import path, { join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
// import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addStory = asyncErrorWrapper(async (req, res, next) => {
  const { title, content } = req.body;

  var wordCount = content.trim().split(/\s+/).length;

  let readtime = Math.floor(wordCount / 200);

  try {
    const image = req.files.image;
    const imageExtention =
      image.name.split(".")[image.name.split(".").length - 1];
    // store the new story in DB
    const newStory = await Story.create({
      title,
      content,
      author: req.user._id,
      image: `avatar.${imageExtention}`,
      readtime,
    });

    // create a new directory stories
    if (
      !fs.existsSync(
        `${join(__dirname, `../data/users/${req.body.userId}/stories`)}`
      )
    ) {
      fs.mkdirSync(
        `${join(__dirname, `../data/users/${req.body.userId}/stories`)}`
      );
    }
    // create a new directory for this new story
    if (
      !fs.existsSync(
        `${join(
          __dirname,
          `../data/users/${req.body.userId}/stories/${newStory._id}`
        )}`
      )
    ) {
      fs.mkdirSync(
        `${join(
          __dirname,
          `../data/users/${req.body.userId}/stories/${newStory._id}`
        )}`
      );
    }
    // create a new directory avatar for the new story
    if (
      !fs.existsSync(
        `${join(
          __dirname,
          `../data/users/${req.body.userId}/stories/${newStory._id}/avatar`
        )}`
      )
    ) {
      fs.mkdirSync(
        `${join(__dirname, `../data/users/${req.body.userId}`)}/stories/${
          newStory._id
        }/avatar`
      );
    }
    // create a new directory images for the new story
    if (
      !fs.existsSync(
        `${join(
          __dirname,
          `../data/users/${req.body.userId}/stories/${newStory._id}/images`
        )}`
      )
    ) {
      fs.mkdirSync(
        `${join(__dirname, `../data/users/${req.body.userId}`)}/stories/${
          newStory._id
        }/images`
      );
    }

    // store the avatar img to avatar story directory
    image.mv(
      join(
        __dirname,
        `../data/users/${req.body.userId}/stories/${newStory._id}/avatar/avatar.${imageExtention}`
      ),
      async (err) => {
        //console.log(err);
        if (err) {
          return res.status(401).json({
            success: false,
            message: err.message,
            data: newStory,
          });
        } else {
          // try {

          return res.status(200).json({
            success: true,
            message: "add story successfully ",
            data: newStory,
          });
          // } catch (error) {
          //   return next(error);
          // }
        }
      }
    );
  } catch (error) {
    // console.log(error);
    deleteImageFile(req);

    return next(error);
  }
});

export const getAllStories = asyncErrorWrapper(async (req, res, next) => {
  let query = Story.find();

  query = searchHelper("title", query, req);

  const paginationResult = await paginateHelper(Story, query, req);

  query = paginationResult.query;

  query = query.sort("-likeCount -commentCount -createdAt");

  const stories = await query;

  return res.status(200).json({
    success: true,
    count: stories.length,
    data: stories,
    page: paginationResult.page,
    pages: paginationResult.pages,
  });
});

export const detailStory = asyncErrorWrapper(async (req, res, next) => {
  const { storyId } = req.params;
  const { activeUser } = req.body;
  // console.log(req.body);
  const story = await Story.findById(storyId).populate("author likes");
  // console.log(story.author);
  const storyLikeUserIds = story.likes.map((json) => json.id);
  const likeStatus = storyLikeUserIds.includes(activeUser._id);

  return res.status(200).json({
    success: true,
    data: story,
    likeStatus: likeStatus,
  });
});

export const likeStory = asyncErrorWrapper(async (req, res, next) => {
  const { activeUser } = req.body;
  const { storyId } = req.params;

  const story = await Story.findById(storyId).populate("author likes");

  const storyLikeUserIds = story.likes.map((json) => json._id.toString());

  if (!storyLikeUserIds.includes(activeUser._id)) {
    story.likes.push(activeUser);
    story.likeCount = story.likes.length;
    await story.save();
  } else {
    const index = storyLikeUserIds.indexOf(activeUser._id);
    story.likes.splice(index, 1);
    story.likeCount = story.likes.length;

    await story.save();
  }

  return res.status(200).json({
    success: true,
    data: story,
  });
});

export const editStoryPage = asyncErrorWrapper(async (req, res, next) => {
  const { storyId } = req.params;

  const story = await Story.findById(storyId).populate("author likes");

  return res.status(200).json({
    success: true,
    data: story,
  });
});

export const editStory = asyncErrorWrapper(async (req, res, next) => {
  //console.log("BODY", req.body);
  const { storyId } = req.params;
  const { title, content, image, previousImage } = req.body;

  const story = await Story.findById(storyId);

  story.title = title;
  story.content = content;
  //story.image = req.files.image.name;

  if (!req.files) {
    // if the image is not sent
    await story.save();
    return res.status(200).json({
      success: true,
      data: story,
    });
  } else {
    // if the image sent
    // old image locatıon delete
    deleteImageFile(
      `${story.author}/stories/${story._id}/avatar/${previousImage}`
    )
      .then(async () => {
        story.image = req.files.image.name;
        req.files.image.mv(
          join(
            __dirname,
            `../data/users/${story.author}/stories/${story._id}/avatar/${req.files.image.name}`
          ),
          async (error) => {
            if (error) {
              //console.log(error);
              return res.status(500).json({ success: false, error: error });
            } else {
              await story.save();
              return res.status(200).json({
                success: true,
                data: story,
              });
            }
          }
        );
      })
      .catch((error) => {
        //console.log(error);
        return res.status(500).json({ success: false, error: error });
      });
  }
});

export const deleteStory = asyncErrorWrapper(async (req, res, next) => {
  const { storyId } = req.params;

  const story = await Story.findById(storyId);

  deleteImageFile(`${story.author}/stories/${story._id}`, {
    recursive: true,
    force: true,
  })
    .then(async () => {
      await story.remove();
      return res.status(200).json({
        success: false,
        message: "delete Story  successfully ",
      });
    })
    .catch((error) => {
      // console.log(error);
      return res.status(500).json({
        success: false,
        message: "delete Story failed successfully ",
        error: error,
      });
    });
});

export const getStoryAvatar = asyncErrorWrapper(async (req, res, next) => {
  const { userId, storyId, image } = req.query;
  try {
    res.sendFile(
      join(
        __dirname,
        `../data/users/${userId}/stories/${storyId}/avatar/${image}`
      )
    );
  } catch (error) {
    res.status(404).send("");
  }
});

export const getStoryImages = asyncErrorWrapper(async (req, res, next) => {
  const { storyId, userId } = req.body;
  //console.log(req.body);
  try {
    const images = await Image.find({ storyId: storyId }).populate("userId");
    //console.log(images);
    if (userId) return res.status(200).json({ success: true, images: images });
    else {
      return res.status(404).json({ success: false });
    }
  } catch (error) {
    //console.log(error);
    return res.status(401).json({ success: false, error: error });
  }
});

export const story = {
  addStory,
  getAllStories,
  detailStory,
  likeStory,
  editStoryPage,
  editStory,
  deleteStory,
  getStoryAvatar,
  getStoryImages,
};
export default story;
