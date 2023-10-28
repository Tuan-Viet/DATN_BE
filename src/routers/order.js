import express from "express";
import { create, get, getAll, update } from "../controllers/order.js";
const router = express.Router()

router.get('/', getAll),
    router.get('/:id', get),
    router.post('/add', create),
    router.patch('/:id', update)

export default router