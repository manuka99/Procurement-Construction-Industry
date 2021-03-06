const Product = require("../Schemas/Product");
const SupplierOrder = require("../Schemas/SupplierOrder/SupplierOrder");
const Supplier = require("../Schemas/Users/Supplier");

exports.createNewSupplier = async (data) => {
  var supplier = await Supplier.create(data);
  supplier.password = null;
  return supplier;
};

exports.Update = async (_id, data) => {
  var supplier = await Supplier.updateOne({ _id }, data);
  return supplier;
};

exports.findByID = async (id) => {
  const supplier = await Supplier.findById(id);
  return supplier;
};

exports.findByIDWithProducts = async (id) => {
  const supplier = await Supplier.findById(id);
  const productTypes = await Product.find({
    supplier: supplier._id,
  }).populate("productType");
  return { ...supplier._doc, productTypes };
};

exports.findAll = async () => {
  const suppliers = await Supplier.find();
  return suppliers;
};

exports.findAllWithProducts = async () => {
  const suppliers = await Supplier.find();
  var newSuppliers = [];
  for (let index = 0; index < suppliers.length; index++) {
    const supplier = suppliers[index];
    const productTypes = await Product.find({
      supplier: supplier._id,
    }).populate("productType");
    newSuppliers.push({ ...supplier._doc, productTypes });
  }
  return newSuppliers;
};

exports.delete = async (_id) => {
  var supplierOrderCount = await SupplierOrder.count({ supplier: _id });
  if (supplierOrderCount && supplierOrderCount > 0)
    throw new Error("Cannot delete a supplier which has orders");
  const supplier = await Supplier.deleteOne({ _id });
  await Product.deleteMany({ supplier: _id });
  return supplier;
};
