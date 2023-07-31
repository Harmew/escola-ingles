const express = require("express");

const pessoasRoute = require("./pessoasRoute.routes");
const niveisRoute = require("./niveisRoute.routes");
const turmasRoute = require("./turmasRoute.routes");

module.exports = (app) => {
  app.use(express.json(), pessoasRoute, niveisRoute, turmasRoute);
};
