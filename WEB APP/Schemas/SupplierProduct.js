const { Schema, model, Types } = require("mongoose");

const SupplierProductSchema = new Schema(
  {
    supplier: {
      type: Types.ObjectId,
      ref: "supplier",
      required: true,
    },
    product: {
      type: Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    threshold: Number,
    brand: String,
  },
  { timestamps: true }
);

const SupplierProduct = model("supplier_product", SupplierProductSchema);
module.exports = SupplierProduct;
