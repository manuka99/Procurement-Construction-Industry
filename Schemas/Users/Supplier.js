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
    maxlength: [1000, "description must not have more than 650 characters."],
  },
  paymentInfo: String,
  payments: [{ type: Types.ObjectId, ref: "payment" }],
});

const Supplier = User.discriminator("supplier", SupplierSchema);
module.exports = Supplier;
