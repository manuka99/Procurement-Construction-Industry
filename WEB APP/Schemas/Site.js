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
    managers: [
      {
        type: Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    allocatedBudgetValue: {
      type: Number,
      required: true,
    },
    budgetItems: [
      {
        type: Types.ObjectId,
        ref: "site_item",
      },
    ],
    totalSpace: {
      type: Number,
      required: true,
    },
    usedSpace: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
      },
    ],
    description: String,
    noOfworkers: Number,
    estimatedDateRange: String,
  },
  { timestamps: true }
);

const Site = model("site", SiteSchema);
module.exports = Site;
