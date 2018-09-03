const express = require("express");
const bodyParser = require("body-parser");
const cheeseToastie = require("cheese-toastie");
const fileUpload = require("express-fileupload");
const middlewares = require('./middlewares');

var cors = require("cors");

// const loggerServices = require("./services/logger-services");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload());
app.use(express.static("public"));
app.use(cors());
app.use(middlewares.tracking());
app.use(middlewares.requestInit());

cheeseToastie.start(__dirname, app);

app.use(middlewares.logsClose());

module.exports = {
    app: app,
    cheeseToastie: cheeseToastie
};