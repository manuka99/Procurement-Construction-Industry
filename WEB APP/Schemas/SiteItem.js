const { Schema, model, Types } = require("mongoose");

const SiteSchema = new Schema(
  {
    product: {
      type: Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    brand: String,
    description: String,
  },
  { timestamps: true }
);

const Site = model("site_item", SiteSchema);
module.exports = Site;
