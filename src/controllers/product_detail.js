import Product from "../models/product.js";
import ProductDetail from "../models/product_detail.js";
import { productDetailSchema } from "../validations/product_details.js";
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
    };
    try {
        const { docs: productDetails } = await ProductDetail.paginate(searchQuery, optinos);
        if (!productDetails) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        return res.status(200).json(productDetails);
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const get = async (req, res) => {
    try {
        const productDetail = await ProductDetail.findById(req.params.id);
        if (!productDetail) {
            return res.status(404).json({
                message: "productDetail not found",
            });
        }
        return res.status(200).json(
            productDetail,
        );
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const create = async (req, res) => {
    try {
        const { error } = productDetailSchema.validate(req.body);
        if (error) {
            res.json({
                message: error.details[0].message,
            });
        }
        const productDetail = await ProductDetail.create(req.body);
        if (!productDetail) {
            return res.status(404).json({
                message: "productDetail not found",
            });
        }
        await Product.findByIdAndUpdate(productDetail.product_id, {
            $addToSet: {
                productDetails: productDetail._id,
            },
        });
        return res.status(200).json(
            productDetail,
        );
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const remove = async (req, res) => {
    try {
        const productDetail = await ProductDetail.findOneAndDelete({ _id: req.params.id });
        return res.status(200).json(
            productDetail,
        );
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const update = async (req, res) => {
    try {
        const { error } = productDetailSchema.validate(req.body);
        if (error) {
            res.json({
                message: error.details[0].message,
            });
        }
        const productDetail = await ProductDetail.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!productDetail) {
            return res.status(404).json({
                message: "productDetail not found",
            });
        }
        return res.status(200).json(
            productDetail,
        );
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
