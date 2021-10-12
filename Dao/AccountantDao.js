const Accountant = require("../Schemas/Users/Accountant");

exports.createNewAccountant = async (data) => {
  var acc = await Accountant.create(data);
  acc.password = null;
  return acc;
};
