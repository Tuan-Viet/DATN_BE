import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        discount: {
            type: Number,
            required: false,
            min: 0,
        },
        costPrice: {
            type: Number,
            required: false,
            min: 0,
        },
        description: {
            type: String,
        },
        images: [
            {
                type: Object,
                required: true,
            },
        ],
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        variants: [{ type: mongoose.Types.ObjectId, ref: "ProductDetail" }],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        hide: {
            type: Boolean,
            default: false,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);