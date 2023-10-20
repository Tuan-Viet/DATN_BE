import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "./models/user";
import cookieSession from "cookie-session";
import connectDB from "./config/database.js";
import router from "./routers/index.js";

dotenv.config();
import * as passportSetup from "./middlwares/passport.js"
const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["desired23"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    ocredentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

connectDB(process.env.MONGODB_URL);

app.use("/api", router);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});

export const viteNodeApp = app;
