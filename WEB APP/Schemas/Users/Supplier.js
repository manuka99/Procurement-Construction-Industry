const User = require("./User");

const { Schema, Types } = require("mongoose");

const SupplierSchema = new Schema({
  logo: {
    type: String,
    required: [true, "Logo must not be empty."],
  },
  description: {
    type: String,
    required: [true, "description must not be empty."],
    minlength: [8, "description must have at least 8 characters."],
    maxlength: [650, "description must not have more than 650 characters."],
  },
  payments: [{ type: Types.ObjectId, ref: "payment" }],
  isApproved: {
    type: Boolean,
    default: false,
  },
  approvalReason: {
    type: String,
    default:
      "All new registrations must be approved by the management, our team will get in touch with you within 3 working days.",
  },
  approvedBy: {
    type: Types.ObjectId,
    required: false,
    ref: "user",
  },
});

const Supplier = User.discriminator("supplier", SupplierSchema);
module.exports = Supplier;
