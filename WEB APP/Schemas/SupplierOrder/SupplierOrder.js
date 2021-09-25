const { Schema, model, Types } = require("mongoose");

const SupplierOrderSchema = new Schema(
  {
    siteOrderID: {
      type: Types.ObjectId,
      ref: "site_order",
      required: true,
    },
    siteOrderItemID: {
      type: Types.ObjectId,
      ref: "site_order_item",
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    site: {
      type: Types.ObjectId,
      ref: "site",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Partialy Approved", "Declined", "Placed"],
      default: "Pending",
    },
    deliveryLocation: String,
    description: String,
    statusDescription: String,
  },
  { timestamps: true }
);

const SupplierOrder = model("supplier_order", SupplierOrderSchema);
module.exports = SupplierOrder;
