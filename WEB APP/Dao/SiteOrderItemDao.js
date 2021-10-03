const SiteOrder = require("../Schemas/SiteOrder/SiteOrder");
const SiteOrderItem = require("../Schemas/SiteOrder/SiteOrderItem");
const SupplierOrder = require("../Schemas/SupplierOrder/SupplierOrder");
// const SupplierOrderItem = require("../Schemas/SupplierOrder/SupplierOrderItem");

exports.findAllBySiteOrder = async (siteOrderID) => {
  var newItems = [];
  const siteOrderItems = await SiteOrderItem.find({ siteOrderID }).populate(
    "productType"
  );
  for (let index = 0; index < siteOrderItems.length; index++) {
    const siteOrderItem = siteOrderItems[index];
    const supplierOrders = await SupplierOrder.find({
      siteOrderItemID: siteOrderItem._id,
    })
      .populate("user")
      .populate({
        path: "product",
        populate: {
          path: "supplier",
        },
      })
      .populate("evidences");
    newItems.push({ ...siteOrderItem._doc, supplierOrders });
  }
  return newItems;
};

exports.create = async (data) => {
  delete data.status;
  const siteOrderItem = await SiteOrderItem.create(data);
  return siteOrderItem;
};

exports.update = async (_id, { status, statusDescription }) => {
  const siteOrderItem = await SiteOrderItem.updateOne(
    { _id },
    { status, statusDescription }
  );
  return siteOrderItem;
};

exports.delete = async (id) => {
  // get site order items
  const siteOrderItem = await SiteOrderItem.findOne({
    _id: id,
  });

  // validate site order item
  if (siteOrderItem.status != "Pending")
    throw new Error("Cannot delete a order item, where it is proccessed");
  const supplierOrders = await SupplierOrder.find({
    siteOrderItemID: siteOrderItem._id,
  });
  // get supplier orders
  for (let index2 = 0; index2 < supplierOrders.length; index2++) {
    const supplierOrder = supplierOrders[index2];
    // validate supplier order
    if (supplierOrder.status != "Pending")
      throw new Error(
        "Cannot delete a order item, where its supplier order is already proccessed"
      );
    // get supplier order items
    // const supplierOrderItems = await SupplierOrderItem.find({
    //   supplierOrderID: supplierOrder._id,
    // });
    // for (let index3 = 0; index3 < supplierOrderItems.length; index3++) {
    //   const supplierOrderItem = supplierOrderItems[index3];
    //   // validate supplier order item
    //   if (supplierOrderItem.status != "Pending")
    //     throw new Error(
    //       "Cannot delete a order item, where its supplier order item is already proccessed"
    //     );
    // }
  }

  // ------------ DELETE -----------
  // // get site order items
  // const _supplierOrders = await SupplierOrder.find({
  //   siteOrderItemID: siteOrderItem._id,
  // });
  // // get supplier orders
  // for (let index2 = 0; index2 < _supplierOrders.length; index2++) {
  //   const _supplierOrder = _supplierOrders[index2];
  //   // get supplier order items
  //   await SupplierOrderItem.deleteMany({
  //     supplierOrderID: _supplierOrder._id,
  //   });
  // }
  // delete Supplier Order
  await SupplierOrder.deleteMany({
    siteOrderItemID: siteOrderItem._id,
  });

  await SiteOrderItem.deleteOne({ _id: id });

  return siteOrderItem;
};
