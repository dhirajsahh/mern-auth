import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectdb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error occured during connecting mongodb", error);
  }
};
export default connectdb;
