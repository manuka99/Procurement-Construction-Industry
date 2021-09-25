const { Schema, model, Types } = require("mongoose");

const SupplierOrderItemSchema = new Schema(
  {
    supplierOrderID: {
      type: Types.ObjectId,
      ref: "supplier_order",
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
    requiredDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Partialy Approved",
        "Declined",
        "Placed",
        "Packed",
        "Shipped",
        "Delivered",
        "Returned",
      ],
      default: "Pending",
    },
    description: String,
    statusDescription: String,
  },
  { timestamps: true }
);

const OrderItem = model("supplier_order_item", SupplierOrderItemSchema);
module.exports = OrderItem;
