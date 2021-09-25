const Product = require("../Schemas/Product");
const SupplierOrderItem = require("../Schemas/SupplierOrder/SupplierOrderItem");

exports.findAll = async () => {
  const products = await Product.find();
  return products;
};

exports.create = async (data) => {
  const product = await Product.create(data);
  return product;
};

exports.delete = async (_id) => {
  var productCount = await SupplierOrderItem.count({ product: _id });
  if (productCount && productCount > 0)
    throw new Error("Cannot delete a product which is used by suppliers");
  const product = await Product.deleteOne({ _id });
  return product;
};
