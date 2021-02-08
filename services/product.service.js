const productsMocks = require("../utils/mocks/products");

class ProductService {
  constructor() {}

  getProductsList({ tags }) {
    return Promise.resolve(productsMocks);
  }

  getProduct({ productId }) {
    return Promise.resolve(productsMocks[0]);
  }

  createProduct({ product }) {
    return Promise.resolve(productsMocks);
  }

  updateProduct({ productId, product }) {
    return Promise.resolve(productsMocks[0]);
  }

  deleteProduct({ productId }) {
    return Promise.resolve();
  }
}

module.exports = ProductService;
