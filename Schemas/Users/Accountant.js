const User = require("./User");

const { Schema } = require("mongoose");

const AccountantSchema = new Schema({
  skill: {
    type: String,
    required: false,
    maxlength: [1000, "Skill must not have more than 1000 characters."],
  },
});

const Accountant = User.discriminator("accountant", AccountantSchema);
module.exports = Accountant;
