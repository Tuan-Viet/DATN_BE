import express from "express"
import routerProduct from "./product"
import routerCategory from "./category.js"
import routerImages from "./upload.js"
import routerSize from "./size"

const router = express.Router()

router.use('/products', routerProduct)
router.use('/categories', routerCategory)
router.use('/images', routerImages)
router.use('/sizes', routerSize)


export default router