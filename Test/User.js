const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const { connect, close, clearDatabase } = require("../Startups/Database/index");

describe("POST /public/auth/register", () => {
  /**
   * Connect to a new in-memory database before running any tests.
   */
  before((done) => {
    connect()
      .then(() => done())
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

  it("Registering as a admin using public ep fails", (done) => {
    request(app)
      .post("/api/public/register")
      .send(validAdmin)
      .then((res) => {
        expect(res.status).to.be.eql(403);
        done();
      })
      .catch((err) => done(err));
  });

  it("Registering as a site manager using public ep fails", (done) => {
    request(app)
      .post("/api/public/register")
      .send(validSiteManager)
      .then((res) => {
        expect(res.status).to.be.eql(403);
        done();
      })
      .catch((err) => done(err));
  });

  it("Registering as accountant using public ep fails", (done) => {
    request(app)
      .post("/api/public/register")
      .send(validAccountant)
      .then((res) => {
        expect(res.status).to.be.eql(403);
        done();
      })
      .catch((err) => done(err));
  });

  it("Registering as a supplier with fake data fails", (done) => {
    request(app)
      .post("/api/public/register")
      .send(inValidSupplier)
      .then((res) => {
        const { supplier = {}, token = "", errors = {} } = res.body.data;
        expect(supplier).to.be.empty;
        expect(token).to.be.empty;
        expect(errors).to.contain.property("logo");
        expect(errors).to.contain.property("description");
        done();
      })
      .catch((err) => done(err));
  });

  it("Registering as a supplier with valid data success", (done) => {
    request(app)
      .post("/api/public/register")
      .send(validSupplier)
      .then((res) => {
        const { supplier = {}, token = "" } = res.body.data;
        expect(supplier).to.contain.property("_id");
        expect(token).to.not.be.empty;
        expect(supplier).to.contain.property("password", null);
        done();
      })
      .catch((err) => done(err));
  });
});

const validAdmin = {
  firstName: "Admin",
  lastName: "User",
  phone: "0775963963",
  email: "adm@gmail.com",
  address: "71/3 colombo 6",
  password: "1234567",
  role: "ADMIN",
};

const validSiteManager = {
  firstName: "sssss",
  lastName: "ss3434",
  phone: "0775963963",
  email: "sm@gmail.com",
  address: "71/3 colombo 6",
  password: "1234567",
  role: "SITEMANAGER",
};

const validAccountant = {
  firstName: "acc",
  lastName: "sa32",
  phone: "0775963963",
  email: "acc@gmail.com",
  address: "71/3 colombo 6",
  password: "1234567",
  role: "ACCOUNTANT",
};

const inValidSupplier = {
  firstName: "Rohan",
  lastName: "Hardware PVT",
  phone: "0775588963",
  email: "sup@gmail.com",
  address: "78/2 colombo 2",
  password: "123456789",
  role: "SUPPLIER",
  isApproved: true,
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
