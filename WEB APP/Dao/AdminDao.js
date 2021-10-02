const Admin = require("../Schemas/Users/Admin");

exports.createNewAdmin = async (data) => {
  var admin = await Admin.create(data);
  admin.password = null;
  return admin;
};
