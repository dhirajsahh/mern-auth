import express from "express";
import user from "../controllers/user.controller.js";
import { signin, signup, google } from "../controllers/auth.controller.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
export default router;
