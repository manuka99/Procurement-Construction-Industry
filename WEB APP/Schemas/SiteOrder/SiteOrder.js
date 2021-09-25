const { Schema, model, Types } = require("mongoose");

const SiteOrderSchema = new Schema(
  {
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
    description: String,
    statusDescription: String,
  },
  { timestamps: true }
);

const SiteOrder = model("site_order", SiteOrderSchema);
module.exports = SiteOrder;
