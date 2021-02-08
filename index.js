const express = require("express");
const path = require("path");
const productsApiRouter = require('./routes/api/products.routes');

// app
const app = express();

// static files
app.use("/static", express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// routes
app.use("/api/products", productsApiRouter);

//app.get('/', (req, res, next) => res.redirect('/products'));

// server 
const server = app.listen(8000, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
});
