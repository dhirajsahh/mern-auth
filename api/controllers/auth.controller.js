import User from "../models/User.model.js";
import dotenv from "dotenv";
dotenv.config();
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
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
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let validUser = await User.findOne({ email });

    if (!validUser) {
      return res.status(404).json({
        success: false,
        message: "User doesnot exist",
      });
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Wrong credentials",
      });
    }
    validUser.password = undefined;
    const token = await jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, { httpOnly: true, maxAge: 3600 * 1000 })
      .status(200)
      .json(validUser);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured during signin",
      error: error.message,
    });
  }
};
