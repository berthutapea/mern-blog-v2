import { Router } from "express";
import fileUpload from "express-fileupload";
import Image from "../Models/image.js";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = Router();
router.use(fileUpload());
router.post("/upload", (req, res) => {
  const { user, storyId } = req.body;
  console.log(user, storyId);
  const bufferFile = req.body.img.replace(/^data:image\/png;base64,/, "");
  const fileSize = formatFileSize(Buffer.from(bufferFile, "base64").byteLength);
  const fileName = getFileName("png");
  console.log("file size:", fileSize, "file name: ", fileName);
  fs.writeFile(
    join(
      __dirname,
      `../data/users/${user}/stories/${storyId}/images/${fileName}`
    ),
    bufferFile,
    "base64",
    (error) => {
      if (error) {
        console.log(error);
        res.json({ success: false, error: error });
      } else {
        // store the name of the file into the database
        Image.create({
          fileName: fileName,
          fileSize: fileSize,
          userId: req.body.user,
          storyId: storyId,
        })
          .then((r) => {
            res.json({ success: true });
          })
          .catch((error) => {
            console.log(error);
            res.json({ success: false, error: error });
          });
      }
    }
  );
});

const getFileName = (fileExtention) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return `${year}.${month}.${day}.${hours}.${minutes}.${seconds}.${fileExtention}`;
};

function formatFileSize(bytes) {
  if (bytes < 1024) {
    return bytes + " bytes";
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  }
}

export default router;
