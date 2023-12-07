import express from "express";
import connectdb from "./config/connectdb.js";
const app = express();
connectdb();
app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(3000, () => {
  console.log("app is listening in port 3000");
});
