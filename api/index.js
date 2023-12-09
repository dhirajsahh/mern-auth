import express from "express";
import connectdb from "./config/connectdb.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.route.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import { connectcloudinary } from "./config/cloudinary.js";
import cookieParser from "cookie-parser";
const app = express();
connectdb();
connectcloudinary();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.listen(3000, () => {
  console.log("app is listening in port 3000");
});
