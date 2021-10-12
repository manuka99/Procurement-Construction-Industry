const { Schema, model, Types } = require("mongoose");

const SiteOfficerSchema = new Schema(
  {
    site: {
      type: Types.ObjectId,
      ref: "site",
      required: true,
    },
    officer: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    role: String,
    description: String,
  },
  { timestamps: true }
);

const SiteOfficer = model("site_officer", SiteOfficerSchema);
module.exports = SiteOfficer;
