const { Schema, model, Types } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    metric: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
  },
  { timestamps: true }
);

const Product = model("product", ProductSchema);
module.exports = Product;
