import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
export const connectcloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  } catch (error) {
    console.log("Error occured during connecting cloudinary", error);
  }
};
