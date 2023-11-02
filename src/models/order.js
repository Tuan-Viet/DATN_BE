import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        vourcher_code: {
            type: String,
        },
        note: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            default: 1,
        },
        pay_method: {
            type: String,
            required: true,
        },
        orderDetails: [{ type: mongoose.Types.ObjectId, ref: "OrderDetail" }],
        totalMoney: {
            type: Number,
            required: true,
            min: 0,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, versionKey: false }
);
orderSchema.plugin(mongoosePaginate);

export default mongoose.model("Order", orderSchema);
