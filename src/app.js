import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import router from "./routers/index.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', router)

// Conect to MongoDB
connectDB(process.env.MONGODB_URL)
// connectDB('mongodb://127.0.0.1/datn-database')

app.use("/api", router);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});

export const viteNodeApp = app;
