import express from "express";
import { create, get, getAll, keyWordProduct, remove, update } from "../controllers/product.js";

const router = express.Router()

router.get('/', getAll)
router.get('/search', keyWordProduct)
router.get('/:id', get)
router.post('/add', create)
router.delete('/:id', remove)
router.patch('/:id', update)

export default router