import express from "express";
import userRoutes from "./routes/UserRoutes.js";
import connectToMongo from "./config/db.js";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/auth", userRoutes);

connectToMongo();
app.listen(3000, () => {
  console.log("Running");
});
