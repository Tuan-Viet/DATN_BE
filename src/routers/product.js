import express from "express";
import { create, get, getAll } from "../controllers/product";

const router = express.Router()

router.get('/products', getAll)
router.get('/products/:id', get)
router.post('/products', create)

export default router