import mongoose from "mongoose";

const connectDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

  console.log("MongoDB Connection Successfully");
};

export default connectDatabase;
