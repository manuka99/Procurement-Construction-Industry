const { Schema, model, Types } = require("mongoose");

const ProductSchema = new Schema(
  {
    supplier: {
      type: Types.ObjectId,
      ref: "supplier",
      required: true,
    },
    productType: {
      type: Types.ObjectId,
      ref: "product_type",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    brand: {
      type: String,
      default: true,
    },
    threshold: Number,
    description: String,
  },
  { timestamps: true }
);

const Product = model("product", ProductSchema);
module.exports = Product;
