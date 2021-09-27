const { Schema, model, Types } = require("mongoose");

const SiteSchema = new Schema(
  {
    site: {
      type: Types.ObjectId,
      ref: "site",
      required: true,
    },
    productType: {
      type: Types.ObjectId,
      ref: "product_type",
      required: true,
    },
    quantity: {
      default: 10,
      type: Number,
    },
    brand: String,
    description: String,
  },
  { timestamps: true }
);

const Site = model("site_item", SiteSchema);
module.exports = Site;
