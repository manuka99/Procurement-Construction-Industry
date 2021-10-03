const { Schema, model, Types } = require("mongoose");

const SupplierOrderSchema = new Schema(
  {
    siteOrderItemID: [
      {
        type: Types.ObjectId,
        ref: "site_order_item",
        required: true,
      },
    ],
    user: {
      type: Types.ObjectId,
      ref: "user",
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
    ppItem: {
      type: Number,
      required: true,
    },
    requiredDate: {
      type: Date,
      required: true,
    },
    deliveryLocation: {
      type: String,
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
    evidences: [
      {
        type: Types.ObjectId,
        ref: "supplier_order_evidence",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const SupplierOrder = model("supplier_order", SupplierOrderSchema);
module.exports = SupplierOrder;
