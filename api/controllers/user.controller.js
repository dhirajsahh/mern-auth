import bcryptjs from "bcryptjs";
import User from "../models/User.model.js";
import cloudinary from "cloudinary";
export const user = async (req, res) => {
  return res.json({
    success: true,
    message: "api is working",
  });
};
