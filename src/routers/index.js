import express from "express"
import routerProduct from "./product.js"
import routerProductDetail from "./productDetail.js"
import routerCategory from "./category.js"
import routerImages from "./upload.js"
import routerAuth from "./auth.js"
import routerSize from "./size.js"
import routerColor from "./color.js"
import routerVoucher from "./voucher.js"
import routerCart from "./cart.js"

const router = express.Router()

router.use('/products', routerProduct)
router.use('/productdetails', routerProductDetail)
router.use('/categories', routerCategory)
router.use('/images', routerImages)
router.use('/sizes', routerSize)
router.use('/colors', routerColor)
router.use('/vouchers', routerVoucher)
router.use("/auth", routerAuth);
router.use('/carts', routerCart)



export default router