import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Conect to MongoDB
connectDB(process.env.MONGODB_URL)

export const viteNodeApp = app;
