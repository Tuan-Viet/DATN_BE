import express from "express"
import routerProduct from "./product"
import routerCategory from "./category.js"
const router = express.Router()

router.use('/products', routerProduct)
router.use('/categories', routerCategory)

export default router