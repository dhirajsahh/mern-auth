import express from "express";
import connectdb from "./config/connectdb.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.route.js";
const app = express();
connectdb();
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.listen(3000, () => {
  console.log("app is listening in port 3000");
});
