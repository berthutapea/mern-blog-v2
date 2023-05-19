import path, { join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deleteImageFile = async (pa, option) => {
  // const rootDir = path.dirname(require.main.filename)

  // filePath = join(__dirname, `/public/storyImages/${deleteImage}`);

  if (option) {
    fs.rmSync(join(__dirname, `../../data/users/${pa}`), option);
  } else {
    fs.unlinkSync(join(__dirname, `../../data/users/${pa}`));
  }
};

export default deleteImageFile;
