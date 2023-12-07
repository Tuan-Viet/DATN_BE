import express from "express";
import { get, getAll, update } from "../controllers/order_detail.js";
const router = express.Router()

router.get('/', getAll),
    router.get('/:id', get),
    router.patch('/:id/update', update)

export default router