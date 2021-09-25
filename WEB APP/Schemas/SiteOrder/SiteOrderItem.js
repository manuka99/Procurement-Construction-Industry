const { Schema, model, Types } = require("mongoose");

const OrderItemSchema = new Schema(
  {
    siteOrderID: {
      type: Types.ObjectId,
      ref: "site_order",
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
      enum: ["Pending", "Approved", "Declined", "Placed"],
      default: "Pending",
    },
    brand: String,
    description: String,
    statusDescription: String,
  },
  { timestamps: true }
);

const OrderItem = model("site_order_item", OrderItemSchema);
module.exports = OrderItem;
