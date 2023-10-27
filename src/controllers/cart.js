import Cart from "../models/cart";
import { cartSchema } from "../validations/cart";
export const getAll = async (req, res) => {
    try {
        // const { docs: carts } = await Cart.paginate(optinos);
        const carts = await Cart.find()
        if (!carts) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }
        return res.status(200).json(carts);
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const get = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id).populate(
            "productDetailId",
            "cart"
        );
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }
        return res.status(200).json({
            message: "Cart found successfully",
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const create = async (req, res) => {
    try {
        const { error } = cartSchema.validate(req.body);
        if (error) {
            res.json({
                message: error.details[0].message,
            });
        }
        const cart = await Cart.findOne({ productDetailId: req.body.productDetailId })
        if (cart) {
            const newQuantity = cart.quantity + req.body.quantity
            const newCart = await Cart.findOneAndUpdate(
                { productDetailId: req.body.productDetailId },
                { quantity: newQuantity },
                { new: true }
            );
            if (!newCart) {
                return res.status(404).json({
                    message: "Cart not found",
                });
            }
            return res.status(200).json({
                message: "Cart created successfully",
                data: newCart,
            });
        } else {
            const cart = await Cart.create(req.body);
            if (!cart) {
                return res.status(404).json({
                    message: "Cart not found",
                });
            }
            return res.status(200).json({
                message: "Cart created successfully",
                data: cart,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const remove = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ _id: req.params.id });
        return res.status(200).json({
            message: "Cart delete successfully",
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const update = async (req, res) => {
    try {
        const { error } = cartSchema.validate(req.body);
        if (error) {
            res.json({
                message: error.details[0].message,
            });
        }
        const cart = await Cart.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }
        return res.status(200).json({
            message: "Cart updated successfully",
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

