import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import router from "./routers";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', router)

// Conect to MongoDB
// connectDB(process.env.MONGODB_URL)
connectDB('mongodb://127.0.0.1/datn-database')

export const viteNodeApp = app;
