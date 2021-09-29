const Product = require("../Schemas/Product");
const SupplierOrder = require("../Schemas/SupplierOrder/SupplierOrder");

exports.findAll = async () => {
  const products = await Product.find()
    .populate("supplier")
    .populate("productType");
  return products;
};

exports.findAllFilter = async (filter) => {
  const products = await Product.find(filter)
    .populate("supplier")
    .populate("productType");
  return products;
};

exports.findByID = async (id) => {
  const product = await Product.findById(id)
    .populate("supplier")
    .populate("productType");
  return product;
};

exports.create = async (data) => {
  const product = await Product.create(data);
  return product;
};

exports.delete = async (_id) => {
  var productCount = await SupplierOrder.count({ product: _id });
  if (productCount && productCount > 0)
    throw new Error("Cannot delete a product which is used by supplier orders");
  const product = await Product.deleteOne({ _id });
  return product;
};
