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
            required: true,
            max: 100,
        },
        description: {
            type: String,
            required: true,
        },
        images:  [
            {
                type: Object,
                required: true,
            },
        ],
        thumnail: {
            type: String,
            required: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
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
