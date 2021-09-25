const User = require("./User");

const { Schema } = require("mongoose");

const ManagerSchema = new Schema({
  skill: {
    type: String,
    required: false,
    maxlength: [1000, "Skill must not have more than 1000 characters."],
  },
});

const Manager = User.discriminator("manager", ManagerSchema);
module.exports = Manager;
