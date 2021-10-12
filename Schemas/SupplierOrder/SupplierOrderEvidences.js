const { Schema, model, Types } = require("mongoose");

const SupplierOrderEvidenncesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    fileUrl: String,
  },
  { timestamps: true }
);

const SupplierOrderEvidence = model(
  "supplier_order_evidence",
  SupplierOrderEvidenncesSchema
);
module.exports = SupplierOrderEvidence;
