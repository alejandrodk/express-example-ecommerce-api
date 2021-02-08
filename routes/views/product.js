const express = require("express");
const router = express.Router();
const ProductsService = require("../../services/product.service");

const productService = new ProductsService();

router.get("/", async function(req, res, next) {
  const { tags } = req.query;
  try {
    const products = await productService.getProductsList({ tags });
    res.render("products", { products });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
