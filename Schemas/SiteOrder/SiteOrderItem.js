const { Schema, model, Types } = require("mongoose");

const SiteOrderItemSchema = new Schema(
  {
    siteOrderID: {
      type: Types.ObjectId,
      ref: "site_order",
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

const SiteOrderItem = model("site_order_item", SiteOrderItemSchema);
module.exports = SiteOrderItem;
