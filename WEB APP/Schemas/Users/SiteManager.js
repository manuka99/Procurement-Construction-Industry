const User = require("./User");

const { Schema } = require("mongoose");

const SiteManagerSchema = new Schema({
  experience: {
    type: String,
    required: false,
    maxlength: [1000, "Experience must not have more than 1000 characters."],
  },
});

const SiteManager = User.discriminator("sitemanager", SiteManagerSchema);
module.exports = SiteManager;
