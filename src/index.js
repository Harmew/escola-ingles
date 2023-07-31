const express = require("express");
const routes = require("./routes/index.routes");
const app = express();

routes(app);
app.listen(3000);

module.exports = app;
