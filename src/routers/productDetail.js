import express from "express";
import { create, get, getAll, remove, update } from "../controllers/product_detail";

const router = express.Router()

router.get('/', getAll)
router.get('/:id', get)
router.post('/add', create)
router.delete('/:id', remove)
router.put('/:id', update)

export default router