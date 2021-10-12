const cors = require("cors");
const express = require("express");
const { AppRoutes } = require("./Routes");
const { AppMiddlewares } = require("./Middlewares");
const { HandleError } = require("./Middlewares/HandleError");
const fs = require("fs");

// init the app
const app = express();
app.use(cors());
app.use(express.json());

/* MIDDLEWARES */
AppMiddlewares(app);

/* ROUTES */
AppRoutes(app);

/* ERRORS */
app.use(HandleError);

try {
  if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
} catch (error) {
  console.log(error);
}

module.exports = app;
