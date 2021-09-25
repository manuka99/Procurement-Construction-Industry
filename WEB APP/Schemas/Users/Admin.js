const User = require("./User");

const { Schema } = require("mongoose");

const AdminSchema = new Schema({
  about: {
    type: String,
    required: false,
    minlength: [6, "about must have at least 6 characters."],
    maxlength: [500, "about must not have more than 15 characters."],
  },
});

const Admin = User.discriminator("admin", AdminSchema);
module.exports = Admin;
