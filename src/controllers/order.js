import Order from '../models/order.js'
import OrderDetail from '../models/order_detail.js'

export const getAll = async (req, res) => {
    try {
        const orders = await Order.find()
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
        const orderDetails = carts.map(({ productDetailId, price, quantity, color, size, totalMoney }) => ({
            orderId: order._id,
            productDetailId,
            price,
            quantity,
            color,
            size,
            totalMoney
        }));
        console.log(orderDetails);
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
        });
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
