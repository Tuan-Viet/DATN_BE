import OrderReturn from '../models/order_return.js'
import Cart from '../models/cart.js'
import User from '../models/user.js'
import Voucher from '../models/voucher.js'
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
        const { docs: orderReturns } = await OrderReturn.paginate(searchQuery, optinos);
        // const orders = await Order.find()
        if (!orderReturns) {
            return res.status(404).json({
                message: "Order not found",
            });
        }
        return res.status(200).json(orderReturns);
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const get = async (req, res) => {
    try {
        const order = await OrderReturn.findById(req.params.id).populate(
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
        const { userId, fullName, phoneNumber, address, reason, totalMoney, orderId, orderDetailIds } = req.body
        const newOrder = { userId, fullName, phoneNumber, address, reason, totalMoney, orderId, orderDetailIds }
        const orderReturn = await OrderReturn.create(newOrder);
        if (!orderReturn) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        return res.status(200).json(orderReturn);
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
