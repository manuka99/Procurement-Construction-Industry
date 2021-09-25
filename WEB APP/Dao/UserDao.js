const User = require("../Schemas/Users/User");

exports.findUserById = async (id) => {
  var user = await User.findById(id);
  return user;
};
