const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const Admin = require("../Schemas/Users/Admin");
const { connect, close, clearDatabase } = require("../Startups/Database/index");

describe("POST /public/auth/login", () => {
  /**
   * Connect to a new in-memory database before running any tests.
   */
  before((done) => {
    connect()
      .then(() =>
        setDataSet()
          .then(() => done())
          .catch((err) => done(err))
      )
      .catch((err) => done(err));
  });

  /*
   * clear and close
   */
  after((done) => {
    /**
     * Clear all test data after every test.
     */
    clearDatabase()
      .then(() => {
        /**
         * Remove and close the db and server.
         */
        close()
          .then(() => done())
          .catch((err) => done(err));
      })
      .catch((err) => done(err));

    // close()
    //   .then(() => done())
    //   .catch((err) => done(err));
  });

  it("Login as a admin", (done) => {
    request(app)
      .post("/api/public/login")
      .send(validAdmin)
      .then((res) => {
        const { token } = res.body.data;
        expect(token).to.not.be.empty;
        done();
      })
      .catch((err) => done(err));
  });
});

const setDataSet = () => {
  return new Promise((resolve, reject) => {
    Admin.create(validAdmin)
      .then((d) => {
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
