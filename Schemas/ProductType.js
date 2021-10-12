const { Schema, model, Types } = require("mongoose");

const ProductTypeSchema = new Schema(
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

const ProductType = model("product_type", ProductTypeSchema);
module.exports = ProductType;
