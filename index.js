const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const productsApiRouter = require("./routes/api/products.routes");
const productsRouter = require("./routes/views/product");
const authApiRouter = require("./routes/api/auth.routes");

const {
  errorHandler,
  logErrors,
  wrapErrors,
  clientErrorHanlder,
} = require("./utils/middlewares/errorHandler");

// app
const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static files
app.use("/static", express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// routes
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);
app.use("/api/auth", authApiRouter);

app.get("/", (req, res, next) => res.redirect("/products"));

app.use(function (req, res, next) {
  res.status(404).render("404");
});

// Error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHanlder);
app.use(errorHandler);

// server
const server = app.listen(8000, function () {
  console.log(`Listening http://localhost:${server.address().port}`);
});
