const express = require("express");
const router = express.Router();
const ProductService = require("../../services/product.service");
const validation = require("../../utils/middlewares/validationHandler");

const productService = new ProductService();
const {
  productIdSchema,
  createProductSchema,
  updateProductSchema,
  productTagSchema,
} = require("../../utils/schemas/product.schema");

router.get("/", async function (req, res) {
  try {
    const { tags } = req.query;

    const productos = await productService.getProductsList({ tags });

    res.status(200).json({
      data: productos,
      message: "products listed",
    });
  } catch (error) {
    console.error(error);
  }
});

router.get("/:productId", async function (req, res) {
  try {
    const { productId } = req.params;

    const producto = await productService.getProduct({ productId });

    res.status(200).json({
      data: producto,
      message: "product retrieved",
    });
  } catch (error) {
    console.error(error);
  }
});

router.post("/", validation(createProductSchema), async function (req, res) {
  try {
    const product = req.body;

    const producto = await productService.createProduct({ product });

    res.status(201).json({
      data: producto,
      message: "products listed",
    });
  } catch (error) {
    console.error(error);
  }
});

router.put(
  "/:productId",
  validation({ productId: productIdSchema }, "params"),
  validation(updateProductSchema, "body"),
  async function (req, res) {
    try {
      const { productId } = req.params;
      const product = req.body;

      const producto = await productService.updateProduct({
        productId,
        product,
      });

      res.status(200).json({
        data: producto,
        message: "products updated",
      });
    } catch (error) {
      console.error(error);
    }
  }
);

router.patch(
  "/:productId",
  validation({ productId: productIdSchema }, "params"),
  validation(updateProductSchema, "body"),
  async function (req, res) {
    try {
      const { productId } = req.params;
      const product = req.body;

      const producto = await productService.updateProduct({
        productId,
        product,
      });

      res.status(200).json({
        data: producto,
        message: "products updated",
      });
    } catch (error) {
      console.error(error);
    }
  }
);

router.delete("/:productId", async function (req, res) {
  try {
    const { productId } = req.params;

    const result = await productService.deleteProduct({ productId });

    res.status(200).json({
      data: result,
      message: "products deleted",
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
