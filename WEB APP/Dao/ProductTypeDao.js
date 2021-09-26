const ProductType = require("../Schemas/ProductType");
const Product = require("../Schemas/Product");

exports.create = async (data) => {
  const product = await ProductType.create(data);
  return product;
};

exports.findByID = async (id) => {
  const product = await ProductType.findById(id);
  return product;
};

exports.findByIDWithProducts = async (id) => {
  const productType = await ProductType.findById(id);
  const products = await Product.find({
    productType: productType._id,
  }).populate("supplier");
  return { ...productType._doc, products };
};

exports.findAll = async () => {
  const products = await ProductType.find();
  return products;
};

exports.findAllWithSupplierCount = async () => {
  const products = await ProductType.find();
  for (let index = 0; index < products.length; index++) {
    const product = products[index];
    product.suppliers = await Product.count({ productType: product._id });
  }
  return products;
};

exports.findAllWithSupplier = async () => {
  const products = await ProductType.find();
  var newProducts = [];
  for (let index = 0; index < products.length; index++) {
    var product = products[index];
    const suppliers =
      (await Product.find({ productType: product._id }).populate("supplier")) ||
      [];
    newProducts.push({ ...product._doc, suppliers });
  }
  return newProducts;
};

exports.delete = async (_id) => {
  var ProductCount = await Product.count({ productType: _id });
  if (ProductCount && ProductCount > 0)
    throw new Error("Cannot delete a product which is used by suppliers");
  const product = await ProductType.deleteOne({ _id });
  return product;
};
