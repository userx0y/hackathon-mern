import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hackathon_db')
  .then(() => console.log('Connected to Database!!!'))
  .catch((err) => console.log('DB Error', err));

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
  console.log('Server Started on port', PORT);
});