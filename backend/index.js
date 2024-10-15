import express from "express";
import userRoutes from "./routes/UserRoutes.js";
import connectToMongo from "./config/db.js";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port=process.env.PORT;
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/auth", userRoutes);

connectToMongo();
app.listen(port, () => {
  console.log("Running");
});
