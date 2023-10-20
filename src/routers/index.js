import express from "express"
import routerProduct from "./product"
import routerProductDetail from "./productDetail"
import routerCategory from "./category.js"
import routerImages from "./upload.js"
import routerSize from "./size"
import routerColor from "./color"
import routerVoucher from "./voucher"
import routerAuth from "./auth"

const router = express.Router()

router.use('/products', routerProduct)
router.use('/productDetails', routerProductDetail)
router.use('/categories', routerCategory)
router.use('/images', routerImages)
router.use('/sizes', routerSize)
router.use('/colors', routerColor)
router.use('/vouchers', routerVoucher)
router.use("/auth", routerAuth);



export default router