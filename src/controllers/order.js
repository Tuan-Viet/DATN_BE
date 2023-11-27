import Order from '../models/order.js'
import Cart from '../models/cart.js'
import User from '../models/user.js'
import OrderDetail from '../models/order_detail.js'
import ProductDetail from '../models/product_detail.js';
import Product from '../models/product.js';

export const getAll = async (req, res) => {
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
        const { docs: orders } = await Order.paginate(searchQuery, optinos);
        // const orders = await Order.find()
        if (!orders) {
            return res.status(404).json({
                message: "Order not found",
            });
        }
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const get = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "orderDetails"
        );
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }
        return res.status(200).json(
            order
        );
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const create = async (req, res) => {
    try {
        const { userId, fullName, email, phoneNumber, address, vourcher_code, note, pay_method, totalMoney, carts, orderId } = req.body
        const newOrder = { userId, fullName, email, phoneNumber, address, vourcher_code, note, pay_method, totalMoney, orderId }
        const order = await Order.create(newOrder);
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }
        const orderDetails = carts.map(async ({ productDetailId, price, quantity, color, size, totalMoney }) => {
            const product = await Product.findOne({ "variants": productDetailId })
            return {
                orderId: order._id,
                productDetailId,
                price,
                costPrice: product.costPrice,
                quantity,
                color,
                size,
                totalMoney
            }
        });
        await orderDetails.forEach(async (newOrderDetail) => {
            const orderDetail = await OrderDetail.create(newOrderDetail)
            if (!orderDetail) {
                return res.status(404).json({
                    message: "orderDetail not found",
                });
            }
            await Order.findByIdAndUpdate(orderDetail.orderId, {
                $addToSet: {
                    orderDetails: orderDetail._id,
                },
            });
            const productDetail = await ProductDetail.findById({ _id: orderDetail.productDetailId })
            await ProductDetail.findByIdAndUpdate(
                { _id: orderDetail.productDetailId },
                {
                    sold: orderDetail.quantity,
                    quantity: productDetail.quantity - orderDetail.quantity
                },
                { new: true }
            )
        });
        const allCart = await Cart.find()
        const userCart = await allCart.filter(cart => cart.userId === newOrder.userId)
        await userCart.forEach(async item => {
            await Cart.findOneAndDelete({ _id: item._id })
        })

        const user = await User.findById({ _id: userId })
        const vourcher = user.voucherwallet.find(vourcher => vourcher.vourcher_code == vourcher_code)
        await user.findOneAndDelete(
            { _id: userId },
            { $pull: { voucherwallet: vourcher._id } },
            { new: true }
        )
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const update = async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
