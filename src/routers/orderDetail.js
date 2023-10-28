import express from "express";
import { get, getAll } from "../controllers/order_detail.js";
const router = express.Router()

router.get('/', getAll),
    router.get('/:id', get)

export default router