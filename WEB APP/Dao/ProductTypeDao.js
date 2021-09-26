const ProductType = require("../Schemas/ProductType");
const SupplierProduct = require("../Schemas/Product");

exports.create = async (data) => {
  const product = await ProductType.create(data);
  return product;
};

exports.findByID = async (id) => {
  const product = await ProductType.findById(id);
  return product;
};

exports.findByIDWithSuppliers = async (id) => {
  const product = await ProductType.findById(id);
  product.suppliers = await SupplierProduct.find({
    product: product._id,
  }).populate("product");
  return product;
};

exports.findAll = async () => {
  const products = await ProductType.find();
  return products;
};

exports.findAllWithSupplierCount = async () => {
  const products = await ProductType.find();
  for (let index = 0; index < products.length; index++) {
    const product = products[index];
    product.suppliers = await SupplierProduct.count({ product: product._id });
  }
  return products;
};

exports.findAllWithSupplier = async () => {
  const products = await ProductType.find();
  var newProducts = [];
  for (let index = 0; index < products.length; index++) {
    var product = products[index];
    const suppliers =
      (await SupplierProduct.find({ product: product._id })) || [];
    newProducts.push({ ...product._doc, suppliers });
  }
  return newProducts;
};

exports.delete = async (_id) => {
  var supplierProductCount = await SupplierProduct.count({ product: _id });
  if (supplierProductCount && supplierProductCount > 0)
    throw new Error("Cannot delete a product which is used by suppliers");
  const product = await ProductType.deleteOne({ _id });
  return product;
};
