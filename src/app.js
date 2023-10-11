import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import router from "./routers";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// process.env.MONGODB_URL
// Conect to MongoDB
connectDB('mongodb://127.0.0.1/datn-database')

app.use("/api", router);


export const viteNodeApp = app;
