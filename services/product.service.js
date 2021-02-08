const productsMocks = require("../utils/mocks/products");
const MongoLib = require("../lib/mongo");

class ProductService {
  constructor() {
    this.collection = "products";
    this.mongodb = new MongoLib();
  }

  async getProductsList({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const products = await this.mongodb.getAll(this.collection, query);

    return products;
  }

  async getProduct({ productId }) {
    return Promise.resolve(productsMocks[0]);
  }

  async createProduct({ product }) {
    return Promise.resolve(productsMocks);
  }

  async updateProduct({ productId, product }) {
    return Promise.resolve(productsMocks[0]);
  }

  async deleteProduct({ productId }) {
    return Promise.resolve();
  }
}

module.exports = ProductService;
