import bcryptjs from "bcryptjs";
import User from "../models/User.model.js";
import { errorHandler } from "../utils/error.js";
export const user = async (req, res) => {
  return res.json({
    success: true,
    message: "api is working",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({
      success: false,
      message: "You can update only your aacount",
    });
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    updateUser.password = undefined;
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured during updatin user",
      error: error.message,
    });
  }
};
//deleteUser
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    res.status(401).json({
      success: false,
      message: "You can Update only your account",
    });
  }
  try {
    const getuserdeleted = await User.findByIdAndDelete(req.user.id);
    return res.status(200).json({
      success: false,
      message: "User Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured during deleting user",
    });
  }
};
export const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout success");
};
