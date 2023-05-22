import mongoose from "mongoose";
const { Schema, model } = mongoose;

const imageSchema = new Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileSize: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  storyId: {
    type: mongoose.Types.ObjectId,
    ref: "story",
    required: true,
  },
});

const image = model("image", imageSchema);

export default image;
