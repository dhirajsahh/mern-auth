import express from "express";
import { user } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();
router.get("/", user);
router.post("/update/:id", verifyToken);
export default router;
