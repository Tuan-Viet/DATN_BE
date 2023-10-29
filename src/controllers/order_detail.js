import Order from '../models/order'
import OrderDetail from '../models/order_detail'

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
        populate: "orderId",
    };
    try {
        const { docs: OrderDetails } = await OrderDetail.paginate(searchQuery, optinos);
        if (!OrderDetails) {
            return res.status(404).json({
                message: "OrderDetail not found",
            });
        }
        return res.status(200).json(OrderDetails);
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const get = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
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