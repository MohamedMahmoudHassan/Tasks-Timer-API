const express = require("express");
const api = require("../routes/api");

module.exports = app => {
  app.use(express.json());
  app.use("/api", api);
};
