import express from "express";
import {
  user,
  updateUser,
  deleteUser,
  signout,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();
router.get("/", user);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/signout", verifyToken, signout);
export default router;
