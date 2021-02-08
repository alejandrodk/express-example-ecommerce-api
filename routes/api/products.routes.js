const express = require("express");
const router = express.Router();
const ProductService = require("../../services/product.service");

const productService = new ProductService();

router.get("/", async function (req, res) {
  const { tags } = req.query;

  const productos = await productService.getProductsList({ tags });

  res.status(200).json({
    data: productos,
    message: "products listed",
  });
});

router.get("/:productId", async function (req, res) {
  const { productId } = req.params;

  const producto = await productService.getProduct({ productId });

  res.status(200).json({
    data: producto,
    message: "product retrieved",
  });
});

router.post("/", async function (req, res) {
  const product = req.body;

  const producto = await productService.createProduct({ product });

  res.status(201).json({
    data: producto,
    message: "products listed",
  });
});

router.put("/:productId", async function (req, res) {
  const { productId } = req.params;
  const product = req.body;

  const producto = await productService.updateProduct({ productId, product });

  res.status(200).json({
    data: producto,
    message: "products updated",
  });
});

router.patch("/:productId", async function (req, res) {
    const { productId } = req.params;
    const product = req.body;
  
    const producto = await productService.updateProduct({ productId, product });
  
    res.status(200).json({
      data: producto,
      message: "products updated",
    });
  });

router.delete("/:productId", async function (req, res) {
  const { productId } = req.params;

  const result = await productService.deleteProduct({ productId });

  res.status(200).json({
    data: result,
    message: "products deleted",
  });
});

module.exports = router;
