const Supplier = require("../Schemas/Users/Supplier");

exports.createNewSupplier = async (data) => {
  var supplier = await Supplier.create(data);
  supplier.password = null;
  return supplier;
};
