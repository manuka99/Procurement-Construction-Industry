const { expect } = require("chai");
const supertest = require("supertest");
const defaults = require("superagent-defaults");
const app = require("../app");
const Admin = require("../Schemas/Users/Admin");
const Supplier = require("../Schemas/Users/Supplier");
const ProductType = require("../Schemas/ProductType");
const { connect, close, clearDatabase } = require("../Startups/Database/index");
var request = defaults(supertest(app)); // or url
var TOKEN = "";
var SUPPLIER_ID = "";
var TYPE_ID = "";
var PRODUCT_ID = "";
var SITE_ID = "";
var SITE_ORDER_ID = "";
var SITE_ORDER_ITEM_ID = "";

describe("Site and Orders", () => {
  /**
   * Connect to a new in-memory database before running any tests.
   */
  before((done) => {
    connect()
      .then(() => {
        setDataSet()
          .then(() => done())
          .catch((e) => done(e));
      })
      .catch((err) => done(err));
  });

  /**
   * Remove and close the db and server.
   */
  after((done) => {
    close()
      .then(() => done())
      .catch((err) => done(err));
  });

  /**
   * Clear all test data after every test.
   */
  beforeEach((done) => {
    clearDatabase()
      .then(() => done())
      .catch((err) => done(err));
  });

  it("Create a supplier with valid data success", (done) => {
    request
      .set({ authorization: "Bearer " + TOKEN })
      .post("/api/public/register")
      .send(validSupplier)
      .then((res) => {
        const { supplier } = res.body.data;
        expect(supplier).to.contain.property("_id");
        SUPPLIER_ID = supplier._id;
        done();
      })
      .catch((err) => done(err));
  });

  it("Create a product type with valid data success", (done) => {
    request
      .set({ authorization: "Bearer " + TOKEN })
      .post("/api/auth/types")
      .send(validType)
      .then((res) => {
        const { productType } = res.body.data;
        expect(productType).to.contain.property("_id");
        TYPE_ID = productType._id;
        console.log(TYPE_ID);
        done();
      })
      .catch((err) => done(err));
  });

  it("Create a product with valid data success", (done) => {
    request
      .set({ authorization: "Bearer " + TOKEN })
      .post("/api/auth/products")
      .send({ supplier: SUPPLIER_ID, productType: TYPE_ID, ...validProduct })
      .then((res) => {
        const { product } = res.body.data;
        expect(product).to.contain.property("_id");
        PRODUCT_ID = product._id;
        done();
      })
      .catch((err) => done(err));
  });

  it("Create a product with invalid data fails", (done) => {
    request
      .set({ authorization: "Bearer " + TOKEN })
      .post("/api/auth/products")
      .send({ productType: TYPE_ID, ...validProduct })
      .then((res) => {
        const { errors } = res.body.data;
        expect(errors).to.contain.property("supplier");
        done();
      })
      .catch((err) => done(err));
  });

  it("Create a site with valid data success", (done) => {
    request
      .set({ authorization: "Bearer " + TOKEN })
      .post("/api/auth/sites")
      .send(validSite)
      .then((res) => {
        const { site } = res.body.data;
        expect(site).to.contain.property("_id");
        SITE_ID = site._id;
        done();
      })
      .catch((err) => done(err));
  });

  it("Create a site with invalid data fails", (done) => {
    request
      .set({ authorization: "Bearer " + TOKEN })
      .post("/api/auth/sites")
      .send({ ...validSite, name: undefined })
      .then((res) => {
        const { errors } = res.body.data;
        expect(errors).to.contain.property("name");
        done();
      })
      .catch((err) => done(err));
  });

  it("Create a site budget with valid data success", (done) => {
    request
      .set({ authorization: "Bearer " + TOKEN })
      .post("/api/auth/sites-items")
      .send({ site: SITE_ID, productType: TYPE_ID })
      .then((res) => {
        const { siteItem } = res.body.data;
        expect(siteItem).to.contain.property("_id");
        done();
      })
      .catch((err) => done(err));
  });

  it("Create a site budget with invalid data fails", (done) => {
    request
      .set({ authorization: "Bearer " + TOKEN })
      .post("/api/auth/sites-items")
      .send({ site: SITE_ID })
      .then((res) => {
        const { errors } = res.body.data;
        expect(errors).to.contain.property("productType");
        done();
      })
      .catch((err) => done(err));
  });

  it("Create a site order with valid data success", (done) => {
    request
      .set({ authorization: "Bearer " + TOKEN })
      .post("/api/auth/site-orders")
      .send({ site: SITE_ID })
      .then((res) => {
        const { siteOrder } = res.body.data;
        expect(siteOrder).to.contain.property("_id");
        SITE_ORDER_ID = siteOrder._id;
        done();
      })
      .catch((err) => done(err));
  });

  it("Create a site order with invalid data success", (done) => {
    request
      .set({ authorization: "Bearer " + TOKEN })
      .post("/api/auth/site-orders")
      .send({})
      .then((res) => {
        const { errors } = res.body.data;
        expect(errors).to.contain.property("site");
        done();
      })
      .catch((err) => done(err));
  });

  it("Create a site order item with valid data success", (done) => {
    request
      .set({ authorization: "Bearer " + TOKEN })
      .post("/api/auth/site-order-items")
      .send({
        siteOrderID: SITE_ORDER_ID,
        productType: TYPE_ID,
        quantity: 20,
        requiredDate: new Date(),
      })
      .then((res) => {
        const { siteOrderItem } = res.body.data;
        expect(siteOrderItem).to.contain.property("_id");
        SITE_ORDER_ITEM_ID = siteOrderItem._id;
        done();
      })
      .catch((err) => done(err));
  });

  it("Create a site order item with invalid data success", (done) => {
    request
      .set({ authorization: "Bearer " + TOKEN })
      .post("/api/auth/site-order-items")
      .send({})
      .then((res) => {
        const { errors } = res.body.data;
        expect(errors).to.contain.property("siteOrderID");
        done();
      })
      .catch((err) => done(err));
  });

  it("Create a supplier order with valid data success", (done) => {
    request
      .set({ authorization: "Bearer " + TOKEN })
      .post("/api/auth/supplier-orders")
      .send({
        siteOrderItemID: SITE_ORDER_ITEM_ID,
        product: PRODUCT_ID,
        quantity: 4,
        requiredDate: new Date(),
        deliveryLocation: "108/2 colombo 4",
      })
      .then((res) => {
        const { supplierOrder } = res.body.data;
        expect(supplierOrder).to.contain.property("_id");
        done();
      })
      .catch((err) => done(err));
  });

  it("Create a supplier order with invalid data success", (done) => {
    request
      .set({ authorization: "Bearer " + TOKEN })
      .post("/api/auth/supplier-orders")
      .send({
        siteOrderItemID: SITE_ORDER_ITEM_ID,
        product: PRODUCT_ID,
        quantity: 20,
        requiredDate: new Date(),
        deliveryLocation: "108/2 colombo 4",
      })
      .then((res) => {
        expect(res.body.data).to.contain.property("message");
        done();
      })
      .catch((err) => done(err));
  });
});

const setDataSet = async () => {
  try {
    const admin = await Admin.create(validAdmin);
    TOKEN = admin.getSignedJwtToken();
  } catch (error) {
    console.log(error);
  }
};

const validAdmin = {
  firstName: "Admin",
  lastName: "User",
  phone: "0775963963",
  email: "adm@gmail.com",
  address: "71/3 colombo 6",
  password: "12345678",
  role: "ADMIN",
};

const validSupplier = {
  firstName: "Rohan khan",
  lastName: "Hardware PVT",
  phone: "0775588963",
  email: "sup@gmail.com",
  address: "78/2 colombo 2",
  password: "123456789",
  role: "SUPPLIER",
  logo: "https://img.freepik.com/free-psd/luxury-beauty-logo-mockup_4513-551.jpg",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  isApproved: true,
};

const validType = {
  name: "Cement",
  metric: "1 kg",
  description: "Test des",
};

const validProduct = {
  quantity: 50,
  price: 1005,
};

const validSite = {
  name: "Arad",
  location: "colombo",
  allocatedBudgetValue: 4500,
  totalSpace: 1000,
};

const validBudgetItem = {
  site: "Arad",
  productType: "colombo",
  allocatedBudgetValue: 4500,
  totalSpace: 1000,
};
