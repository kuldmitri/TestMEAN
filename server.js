var express = require("express");
var config = require("./config");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var serveStatic = require("serve-static");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var passport = require("passport");
var fs = require("fs");
var flash = require("connect-flash");
var session = require("express-session");
var app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.get("db"));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(
  session({
    secret: "passport",
    resave: false,
    saveUnitialized: false
  })
);
app.use(passport.initialize());
app.use(flash());
app.use(serveStatic(__dirname + ""));

app.use(function(req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, PUT, OPTIONS, DELETE, GET"
  );
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(require("./routers"));

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

var initPassport = require("./Passport/passport-init");
initPassport(passport);

app.listen(config.get("port"));
