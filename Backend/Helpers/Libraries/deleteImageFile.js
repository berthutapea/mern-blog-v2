import path, { join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const deleteImageFile = (req, deleteImage) => {
  // const rootDir = path.dirname(require.main.filename)

  filePath = join(__dirname, `/public/storyImages/${deleteImage}`);

  fs.unlink(filePath, (res) => console.log(res, "file delete "));
};

export default deleteImageFile;
