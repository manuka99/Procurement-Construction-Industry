const Product = require("../Schemas/Product");
const SupplierOrder = require("../Schemas/SupplierOrder/SupplierOrder");
const Supplier = require("../Schemas/Users/Supplier");

exports.createNewSupplier = async (data) => {
  var supplier = await Supplier.create(data);
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
  supplier.products = await Product.find({
    supplier: supplier._id,
  }).populate("product");
  return supplier;
};

exports.findAll = async () => {
  const suppliers = await Supplier.find();
  return suppliers;
};

exports.findAllWithProductCount = async () => {
  const suppliers = await Supplier.find();
  for (let index = 0; index < suppliers.length; index++) {
    const supplier = suppliers[index];
    supplier.products = await Product.count({
      supplier: supplier._id,
    });
  }
  return suppliers;
};

exports.delete = async (_id) => {
  var supplierOrderCount = await SupplierOrder.count({ supplier: _id });
  if (supplierOrderCount && supplierOrderCount > 0)
    throw new Error("Cannot delete a supplier which has orders");
  const supplier = await supplier.deleteOne({ _id });
  return supplier;
};
