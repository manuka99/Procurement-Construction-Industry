const { sendSuccess } = require("../Common/util");
const SupplierOrderDao = require("../Dao/SupplierOrderDao");
const easyinvoice = require("easyinvoice");

// find all
exports.GetAllOrdersByItem = async (req, res, next) => {
  try {
    var supplierOrders = await SupplierOrderDao.findAllBySiteOrderItem(
      req.params.id
    ); //site Order item Id
    sendSuccess(res, { supplierOrders });
  } catch (error) {
    next(error);
  }
};

exports.GetAllSupplierOrders = async (req, res, next) => {
  try {
    var supplierOrders = await SupplierOrderDao.findAll();
    sendSuccess(res, { supplierOrders });
  } catch (error) {
    next(error);
  }
};

exports.DownloadInvoice = async (req, res, next) => {
  try {
    const supplierOrder = await SupplierOrderDao.findOneByID(req.params.id); //site Order item Id
    if (!supplierOrder)
      throw new Error("No supplier orders to generate Invoice.");

    const data = {
      currency: "LKR", //See documentation 'Locales and Currency' for more info
      taxNotation: "vat", //or gst
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo: supplierOrder.product.supplier.logo, //or base64
      background: "https://public.easyinvoice.cloud/img/watermark-draft.jpg", //or base64 //img or pdf
      sender: {
        company: `${supplierOrder.product.supplier.firstName} ${supplierOrder.product.supplier.lastName}`,
        address: supplierOrder.product.supplier.address,
        zip: "Sri Lanka",
        city: `${supplierOrder.product.supplier.email}`,
        country: `${supplierOrder.product.supplier.phone}`,
      },
      client: {
        company: `${supplierOrder.user.firstName} ${supplierOrder.user.lastName} (${supplierOrder.user.role})`,
        address: supplierOrder.deliveryLocation,
        zip: "4567 CD",
        city: "Colombo",
        country: "Sri Lanka",
        custom1: `Contact: ${supplierOrder.user.phone}`,
      },
      invoiceNumber: supplierOrder._id,
      invoiceDate: supplierOrder.createdAt.toString(),
      products: [
        {
          quantity: "2",
          description: `${supplierOrder.product.productType.name} (${supplierOrder.product.brand})`,
          tax: 0,
          price: supplierOrder.product.price,
        },
      ],
      bottomNotice: `This order is currently on ${supplierOrder.status.toUpperCase()} stage.`,
    };

    const result = await easyinvoice.createInvoice(data);
    var pdf = Buffer.from(result.pdf, "base64");

    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });
    return res.end(pdf);
  } catch (error) {
    next(error);
  }
};

exports.Create = async (req, res, next) => {
  try {
    var supplierOrder = await SupplierOrderDao.create(req.body);
    sendSuccess(res, { supplierOrder });
  } catch (error) {
    next(error);
  }
};

exports.CreateEvidence = async (req, res, next) => {
  try {
    if (req.file) req.body.fileUrl = req.file.filename;
    var supplierOrder = await SupplierOrderDao.createEvidence(
      req.params.id,
      req.body
    );
    sendSuccess(res, { supplierOrder });
  } catch (error) {
    next(error);
  }
};

exports.Update = async (req, res, next) => {
  try {
    var supplierOrder = await SupplierOrderDao.update(req.params.id, req.body);
    sendSuccess(res, { supplierOrder });
  } catch (error) {
    next(error);
  }
};

exports.Delete = async (req, res, next) => {
  try {
    var supplierOrder = await SupplierOrderDao.delete(req.params.id);
    sendSuccess(res, { supplierOrder });
  } catch (error) {
    next(error);
  }
};
