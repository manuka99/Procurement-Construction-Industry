const SiteOrder = require("../Schemas/SiteOrder/SiteOrder");
const SiteOrderItem = require("../Schemas/SiteOrder/SiteOrderItem");
const SupplierOrder = require("../Schemas/SupplierOrder/SupplierOrder");
const SupplierOrderItem = require("../Schemas/SupplierOrder/SupplierOrderItem");

exports.findAll = async () => {
  const siteOrders = await SiteOrder.find().populate("user").populate("site");
  return siteOrders;
};

exports.findAllBySite = async (siteID) => {
  const siteOrders = await SiteOrder.find({ site: siteID }).populate("user");
  return siteOrders;
};

exports.create = async (data) => {
  delete data.status;
  const siteOrder = await SiteOrder.create(data);
  return siteOrder;
};

exports.update = async (_id, { status, description, statusDescription }) => {
  const siteOrder = await SiteOrder.updateOne(
    { _id },
    { status, description, statusDescription }
  );
  return siteOrder;
};

exports.delete = async (id) => {
  const siteOrder = await SiteOrder.findById(id);
  // validate order
  if (siteOrder.status != "pending")
    throw new Error(
      "Cannot delete a order, where its status is " + siteOrder.status
    );
  // get site order items
  const siteOrderItems = await SiteOrderItem.find({
    siteOrderID: siteOrder._id,
  });
  for (let index = 0; index < siteOrderItems.length; index++) {
    const siteOrderItem = siteOrderItems[index];
    // validate site order item
    if (siteOrderItem.status != "pending")
      throw new Error(
        "Cannot delete a order, where its order item is proccessed"
      );
    const supplierOrders = await SupplierOrder.find({
      siteOrderItemID: siteOrderItem._id,
    });
    // get supplier orders
    for (let index2 = 0; index2 < supplierOrders.length; index2++) {
      const supplierOrder = supplierOrders[index2];
      // validate supplier order
      if (supplierOrder.status != "pending")
        throw new Error(
          "Cannot delete a order, where its supplier order is already proccessed"
        );
      // get supplier order items
      const supplierOrderItems = await SupplierOrderItem.find({
        supplierOrderID: supplierOrder._id,
      });
      for (let index3 = 0; index3 < supplierOrderItems.length; index3++) {
        const supplierOrderItem = supplierOrderItems[index3];
        // validate supplier order item
        if (supplierOrderItem.status != "pending")
          throw new Error(
            "Cannot delete a order, where its supplier order item is already proccessed"
          );
      }
    }
  }

  // ------------ DELETE -----------
  // get site order items
  const _siteOrderItems = await SiteOrderItem.find({
    siteOrderID: siteOrder._id,
  });

  for (let index = 0; index < _siteOrderItems.length; index++) {
    const _siteOrderItem = _siteOrderItems[index];
    const _supplierOrders = await SupplierOrder.find({
      siteOrderItemID: _siteOrderItem._id,
    });
    // get supplier orders
    for (let index2 = 0; index2 < _supplierOrders.length; index2++) {
      const _supplierOrder = _supplierOrders[index2];
      // get supplier order items
      await SupplierOrderItem.deleteMany({
        supplierOrderID: _supplierOrder._id,
      });
    }
    // delete Supplier Order
    await SupplierOrder.deleteMany({
      siteOrderItemID: _siteOrderItem._id,
    });
  }

  await SiteOrderItem.deleteMany({ siteOrderID: siteOrder._id });
  await SiteOrder.deleteMany({ _id: id });

  return siteOrder;
};
