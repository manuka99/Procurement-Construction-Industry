const SupplierOrderEP = require("../Endpoints/SupplierOrderEP");
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../uploads");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now().valueOf() + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePrefix}.${file.originalname.split(".").slice(-1)}`);
  },
});

const upload = multer({ storage: storage });

exports.SupplierOrderRoutes = (app) => {
  // ----- Supplier Orders
  app.get(
    "/api/auth/site-order-item-supplier-orders/:id",
    SupplierOrderEP.GetAllOrdersByItem
  );
  app.get("/download/supplier-orders/:id", SupplierOrderEP.DownloadInvoice);
  app.post("/api/auth/supplier-orders", SupplierOrderEP.Create);
  app.delete("/api/auth/supplier-orders/:id", SupplierOrderEP.Delete);
  app.put("/api/auth/supplier-orders/:id", SupplierOrderEP.Update);

  // evidences
  app.post(
    "/api/auth/supplier-orders-evidences/:id",
    upload.single("file"),
    SupplierOrderEP.CreateEvidence
  );
};
