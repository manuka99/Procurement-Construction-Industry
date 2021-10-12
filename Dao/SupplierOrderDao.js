const ValidationError = require("../Common/ValidationError");
const Product = require("../Schemas/Product");
const SiteItem = require("../Schemas/SiteItem");
const SiteOrderItem = require("../Schemas/SiteOrder/SiteOrderItem");
const SupplierOrder = require("../Schemas/SupplierOrder/SupplierOrder");
const SupplierOrderEvidence = require("../Schemas/SupplierOrder/SupplierOrderEvidences");

exports.findAllBySiteOrderItem = async (siteOrderItemID) => {
  const supplierOrders = await SupplierOrder.find({ siteOrderItemID })
    .populate("product")
    .populate("user");
  return supplierOrders;
};

exports.findAll = async () => {
  const supplierOrders = await SupplierOrder.find()
    .populate("user")
    .populate({
      path: "product",
      populate: {
        path: "supplier",
      },
    })
    .populate({
      path: "product",
      populate: {
        path: "productType",
      },
    })
    .populate({
      path: "siteOrderItemID",
      populate: {
        path: "siteOrderID",
        populate: {
          path: "site",
        },
      },
    })
    .sort({ updatedAt: "descending" });
  return supplierOrders;
};

exports.findOneByID = async (_id) => {
  const supplierOrder = await SupplierOrder.findOne({ _id })
    .populate("user")
    .populate({
      path: "product",
      populate: {
        path: "supplier",
      },
    })
    .populate({
      path: "product",
      populate: {
        path: "productType",
      },
    })
    .populate({
      path: "siteOrderItemID",
      populate: {
        path: "siteOrderID",
        populate: {
          path: "site",
        },
      },
    });
  return supplierOrder;
};

exports.create = async (data) => {
  // validate order budget
  const QTY = data.quantity;
  //get site order item
  const siteOrderItem = await SiteOrderItem.findById(
    data.siteOrderItemID
  ).populate("siteOrderID");

  const supplierOrders = await SupplierOrder.find({
    siteOrderItemID: data.siteOrderItemID,
  });
  const s_orderQTY = supplierOrders.reduce((t, c) => t + c.quantity, 0);

  // check if the budget matches
  const siteItems = await SiteItem.find({
    site: siteOrderItem.siteOrderID.site,
    productType: siteOrderItem.productType,
  });
  const totalAllocatedBudget = siteItems.reduce((t, c) => t + c.quantity, 0);

  console.log(totalAllocatedBudget);

  if (
    parseInt(totalAllocatedBudget) == 0 ||
    parseInt(s_orderQTY) + parseInt(QTY) > parseInt(totalAllocatedBudget)
  )
    throw new ValidationError(`Cannot place supplier order as budget exceeded`);

  // check if request order item and supplier order matches
  // check if quantity is more that order item QTY
  if (parseInt(QTY) > parseInt(siteOrderItem.quantity))
    throw new ValidationError(
      `Supplier Order quantity exceeds requested item quantity ( ${QTY} vs ${siteOrderItem.quantity})`
    );

  // check if quantity is more that order item QTY ordered
  if (parseInt(QTY) + parseInt(s_orderQTY) > parseInt(siteOrderItem.quantity))
    throw new ValidationError(
      `Supplier Order quantity exceeds as the item was ordered multiple times (you can only order the remaining ${
        siteOrderItem.quantity - s_orderQTY
      } items.)`
    );

  // save data
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
