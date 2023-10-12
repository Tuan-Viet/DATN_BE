import express from "express";
import { create } from "../controllers/color";

const routerColor = express.Router()

routerColor.post('/add', create)

export default routerColor