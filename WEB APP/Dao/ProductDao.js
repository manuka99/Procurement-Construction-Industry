const Product = require("../Schemas/Product");
const SupplierProduct = require("../Schemas/SupplierProduct");

exports.create = async (data) => {
  const product = await Product.create(data);
  return product;
};

exports.findByID = async (id) => {
  const product = await Product.findById(id);
  return product;
};

exports.findByIDWithSuppliers = async (id) => {
  const product = await Product.findById(id);
  product.suppliers = await SupplierProduct.find({
    product: product._id,
  }).populate("product");
  return product;
};

exports.findAll = async () => {
  const products = await Product.find();
  return products;
};

exports.findAllWithSupplierCount = async () => {
  const products = await Product.find();
  for (let index = 0; index < products.length; index++) {
    const product = products[index];
    product.suppliers = await SupplierProduct.count({ product: product._id });
  }
  return products;
};

exports.delete = async (_id) => {
  var supplierProductCount = await SupplierProduct.count({ product: _id });
  if (supplierProductCount && supplierProductCount > 0)
    throw new Error("Cannot delete a product which is used by suppliers");
  const product = await Product.deleteOne({ _id });
  return product;
};
