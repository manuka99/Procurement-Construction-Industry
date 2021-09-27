const { Schema, model, Types } = require("mongoose");

const SiteSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    allocatedBudgetValue: {
      type: Number,
      required: true,
    },
    totalSpace: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    type: {
      type: String,
      default: "regular",
      enum: ["phase", "regular"],
    },
    parent: {
      type: Types.ObjectId,
      ref: "site",
    },
    description: String,
    noOfworkers: Number,
    estimatedDateRange: String,
  },
  { timestamps: true }
);

const Site = model("site", SiteSchema);
module.exports = Site;
