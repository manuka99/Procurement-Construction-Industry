const Product = require("../Schemas/Product");
const SupplierOrder = require("../Schemas/SupplierOrder/SupplierOrder");
const SupplierOrderEvidence = require("../Schemas/SupplierOrder/SupplierOrderEvidences");

exports.findAllBySiteOrderItem = async (siteOrderItemID) => {
  const supplierOrders = await SupplierOrder.find({ siteOrderItemID })
    .populate("product")
    .populate("user");
  return supplierOrders;
};

exports.create = async (data) => {
  delete data.status;
  const product = await Product.findById(data.product);
  data.ppItem = product.price;
  const supplierOrder = await SupplierOrder.create(data);
  return supplierOrder;
};

exports.createEvidence = async (id, data) => {
  const supplierOrderEvidence = await SupplierOrderEvidence.create(data);
  const supplierOrder = SupplierOrder.findByIdAndUpdate(
    id,
    { $push: { evidences: supplierOrderEvidence._id } },
    { new: true, useFindAndModify: false }
  );

  return supplierOrder;
};

exports.update = async (_id, { status, statusDescription }) => {
  const supplierOrder = await SupplierOrder.updateOne(
    { _id },
    { status, statusDescription }
  );
  return supplierOrder;
};

exports.delete = async (_id) => {
  // get Supplier order
  const supplierOrder = await SupplierOrder.findOne({
    _id,
  }).populate("evidences");

  // validate Supplier order
  if (supplierOrder.status != "Pending")
    throw new Error("Cannot delete a order item, where it is proccessed");

  // ------------ DELETE -----------
  var result = await SupplierOrder.deleteOne({ _id });

  supplierOrder.evidences.map((ev) => ev.delete());

  return result;
};
