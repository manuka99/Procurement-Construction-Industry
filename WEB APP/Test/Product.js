const { expect } = require("chai");
const supertest = require("supertest");
const defaults = require("superagent-defaults");
const app = require("../app");
const Admin = require("../Schemas/Users/Admin");
const { connect, close, clearDatabase } = require("../Startups/Database/index");
var request = defaults(supertest(app)); // or url
var TOKEN = "";

describe("POST /api/auth/types", () => {
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

  it("Create a product with valid data pass", (done) => {
    request
      .set({ authorization: "Bearer " + TOKEN })
      .post("/api/auth/types")
      .send(validType)
      .then((res) => {
        const { productType } = res.body.data;
        expect(productType).to.not.be.empty;
        expect(productType).to.contain.property("_id");
        expect(productType).to.contain.property("name");
        done();
      })
      .catch((err) => done(err));
  });

  it("Create a product with fake data fails", (done) => {
    request
      .set({ authorization: "Bearer " + TOKEN })
      .post("/api/auth/types")
      .send(inValidType)
      .then((res) => {
        const { errors } = res.body.data;
        expect(errors).to.contain.property("name");
        done();
      })
      .catch((err) => done(err));
  });
});

const setDataSet = () => {
  return new Promise((resolve, reject) => {
    Admin.create(validAdmin)
      .then((d) => {
        TOKEN = d.getSignedJwtToken();
        resolve(d);
      })
      .catch((e) => {
        reject(e);
      });
  });
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

const validType = {
  name: "Cement",
  metric: "1 kg",
  description: "Test des",
};

const inValidType = {
  metric: "1 kg",
  description: "Test des",
};
