const User = require("../Schemas/Users/User");

exports.findUserById = async (id) => {
  var user = await User.findById(id);
  return user;
};

exports.findUserByEmailWithPassword = async (email) => {
  var user = await User.findOne({ email }).select("+password");
  return user;
};
