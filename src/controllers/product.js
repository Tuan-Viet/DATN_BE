import Category from "../models/category.js";
import Product from "../models/product.js";
import ProductDetail from "../models/product_detail.js";
import { productSchema } from "../validations/product.js";
export const getAll = async (req, res) => {
    // req.query._sort => price
    const {
        _page = 1,
        _limit = 100,
        _sort = "createdAt",
        _order = "desc",
        _search
    } = req.query;

    const searchQuery = {};
    if (_search) {
        searchQuery.name = { $regex: _search, $options: "i" };
    }
    const optinos = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order === "desc" ? "-1" : "1",
        },
        populate: "categoryId",
    };
    try {
        const { docs: products } = await Product.paginate(searchQuery, optinos);
        if (!products) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const get = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate(
            "categoryId",
            "products"
        );
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        return res.status(200).json({
            message: "Product found successfully",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

// tìm sản phẩm theo tên
export const getOne = async (req, res) => {
    try {
        const product = await Product.findOne({ name: req.params.name }).populate(
            "categoryId",
            "products"
        );
        console.log(1);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        return res.status(200).json({
            message: "Product found successfully",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const create = async (req, res) => {
    try {
        // const { error } = productSchema.validate(req.body);
        // if (error) {
        //     res.json({
        //         message: error.details[0].message,
        //     });
        // }
        const { title, price, description, discount, images, categoryId, variants } = req.body
        const newProduct = { title, price, description, discount, images, categoryId }
        // console.log(newProduct);

        // console.log(variants);
        // console.log(resultArray);
        const product = await Product.create(newProduct);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        const productDetails = [];

        variants.forEach(variant => {
            const { nameColor, imageColor, sold, items } = variant;
            items.forEach(item => {
                const { size, quantity } = item;
                productDetails.push({ product_id: product._id, nameColor, imageColor, sold, size, quantity });
            });
        });
        await Category.findByIdAndUpdate(product.categoryId, {
            $addToSet: {
                products: product._id,
            },
        });
        productDetails.forEach(async (newproductDetail) => {
            const productDetail = await ProductDetail.create(newproductDetail)
            if (!productDetail) {
                return res.status(404).json({
                    message: "productDetail not found",
                });
            }
            await Product.findByIdAndUpdate(productDetail.product_id, {
                $addToSet: {
                    variants: productDetail._id,
                },
            });
        });
        return res.status(200).json({
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const remove = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id });
        return res.status(200).json({
            message: "Product delete successfully",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const update = async (req, res) => {
    try {
        const { title, price, description, discount, images, categoryId, variants } = req.body
        const newProduct = { title, price, description, discount, images, categoryId }
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id },
            newProduct,
            { new: true }
        );
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        const productDetails = [];

        variants.forEach(variant => {
            if (variant.product_id) {
                const { nameColor, imageColor, sold, items, product_id } = variant;
                items.forEach(item => {
                    if (item._id) {
                        const { size, quantity, _id } = item;
                        productDetails.push({ _id, product_id, nameColor, imageColor, sold, size, quantity });
                    } else {
                        const { size, quantity } = item;
                        productDetails.push({ product_id, nameColor, imageColor, sold, size, quantity });
                    }
                });
            } else {
                const { nameColor, imageColor, sold, items } = variant;
                items.forEach(item => {
                    const { size, quantity } = item;
                    productDetails.push({ product_id: product.id, nameColor, imageColor, sold, size, quantity });
                });
            }
        });
        productDetails.forEach(async (newproductDetail) => {
            if (!newproductDetail._id) {
                const productDetail = await ProductDetail.create(newproductDetail)
                if (!productDetail) {
                    return res.status(404).json({
                        message: "productDetail not found",
                    });
                }
                await Product.findByIdAndUpdate(productDetail.product_id, {
                    $addToSet: {
                        variants: productDetail._id,
                    },
                });
            } else {
                const productDetail = await ProductDetail.findOneAndUpdate(
                    { _id: newproductDetail._id },
                    newproductDetail,
                    { new: true }
                );
                if (!productDetail) {
                    return res.status(404).json({
                        message: "productDetail not found",
                    });
                }
            }
        });
        return res.status(200).json({
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
