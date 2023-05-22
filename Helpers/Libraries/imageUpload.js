import CustomError from "../error/CustomError.js";
import path, { join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // const rootDir = path.dirname(req.main.filename);
    console.log(req.body);
    if (file.fieldname === "photo") {
      // cb(null, path.join(__dirname, "/public/userPhotos"));
      cb(
        null,
        path.join(__dirname, `../../data/users/${req.body.userId}/userPhotos`)
      );
    } else {
      cb(
        null,
        path.join(__dirname, `../../data/users/${req.body.userId}/userPhotos`)
      );
    }
  },

  filename: function (req, file, cb) {
    if (file.fieldname === "photo") {
      const extentions = file.mimetype.split("/")[1];

      req.savedUserPhoto = "photo_user_" + req.user.id + "." + extentions;

      cb(null, req.savedUserPhoto);
    } else {
      req.savedStoryImage =
        "image_" +
        new Date().toISOString().replace(/:/g, "-") +
        file.originalname;

      cb(null, req.savedStoryImage);
    }
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return new CustomError("Please provide a valid image file ", 400), null;
  }

  cb(null, true);
};

const imageUpload = multer({ storage, fileFilter });

export default imageUpload;
