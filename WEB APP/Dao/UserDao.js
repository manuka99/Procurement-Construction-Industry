const User = require("../Schemas/Users/User");

exports.AllSiteManagers = async () => {
  var users = await User.find({ role: "SUPPLIER" }); //change to SITEMANAGER
  return users;
};

exports.findUserById = async (id) => {
  var user = await User.findById(id);
  return user;
};

exports.findUserByEmailWithPassword = async (email) => {
  var user = await User.findOne({ email }).select("+password");
  return user;
};
