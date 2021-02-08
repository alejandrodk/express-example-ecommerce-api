const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const productsApiRouter = require("./routes/api/products.routes");
const productsRouter = require("./routes/views/product");
// app
const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
// static files
app.use("/static", express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// routes
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);

app.get('/', (req, res, next) => res.redirect('/products'));

// server
const server = app.listen(8000, function () {
  console.log(`Listening http://localhost:${server.address().port}`);
});
