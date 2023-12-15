import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderReturnSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        orderId: {
            type: String,
            required: true,
        },
        images: [
            {
                type: Object,
                required: true,
            },
        ],
        fullName: {
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
        reason: {
            type: String,
            required: true,
        },
        newOrder: { type: mongoose.Types.ObjectId, ref: "Order" },
        status: {
            type: Number,
            default: 1,
        },
        orderReturnDetails: [{ type: mongoose.Types.ObjectId, ref: "OrderReturnDetail" }],
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, versionKey: false }
);
orderReturnSchema.plugin(mongoosePaginate);

export default mongoose.model("OrderReturn", orderReturnSchema);
