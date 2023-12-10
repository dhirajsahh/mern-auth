import express from "express";
import connectdb from "./config/connectdb.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.route.js";

import cors from "cors";

import cookieParser from "cookie-parser";
import path from "path";
connectdb();
const __dirname = path.resolve();

const app = express();
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(express.json());
app.use(cors());

app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.listen(3000, () => {
  console.log("app is listening in port 3000");
});
