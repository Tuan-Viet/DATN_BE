import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  images: {
    type: Object,
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  }],

},
  {
    timestamps: true,
    versionKey: false,
  });

export default mongoose.model('Category', categorySchema);