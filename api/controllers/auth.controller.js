import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);
  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "User created succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured during creating user",
      error: error.message,
    });
  }
};
