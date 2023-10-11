import express from "express"
import routerProduct from "./product"
const router = express.Router()

router.use('/products', routerProduct)

export default router