const express = require("express");
const cors = require("cors");
const api = require("../routes/api");

module.exports = app => {
  app.use(cors());
  app.use(express.json());
  app.use("/api", api);
};
