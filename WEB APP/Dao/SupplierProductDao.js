const SupplierProduct = require("../Schemas/SupplierProduct");

exports.create = async (data) => {
  const supplierProduct = await SupplierProduct.create(data);
  return supplierProduct;
};

exports.delete = async (data) => {
  const supplierProduct = await SupplierProduct.create(data);
  return supplierProduct;
};
