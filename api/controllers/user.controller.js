import bcryptjs from "bcryptjs";
import User from "../models/User.model.js";
import cloudinary from "cloudinary";
export const user = async (req, res) => {
  return res.json({
    success: true,
    message: "api is working",
  });
};
async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//update user
export const updateUser = async (req, res, next) => {
  const updateFields = {
    username: req.body.username,
    email: req.body.email,
  };
  if (req.user.id !== req.params.id) {
    return res.status(401).json("You can update only your account");
  }
  if (req.files) {
    const image = req.files.image;
    const response = await uploadFileToCloudinary(
      req.files.image,
      "learning documents"
    );
    updateFields.profilePicture = response.secure_url;
  }
  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
    updateFields.password = req.body.password;
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: updateFields,
      },
      { new: true }
    );
    updatedUser.password = undefined;
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occured during updating user",
      error: error.message,
    });
  }
};
