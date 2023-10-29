import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderDetailSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        productDetailId: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            min: 0,
            required: true
        },
        quantity: {
            type: Number,
            min: 0,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        totalMoney: {
            type: Number,
            required: true
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, versionKey: false }
);
orderDetailSchema.plugin(mongoosePaginate);

export default mongoose.model("OrderDetail", orderDetailSchema);
