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
    return await this.mongodb.getOne(this.collection, productId);
  }

  async createProduct({ product }) {
    return await this.mongodb.createOne(this.collection, product);
  }

  async updateProduct({ productId, product }) {
    return await this.mongodb.updateOne(this.collection, productId, product);
  }

  async deleteProduct({ productId }) {
    return await this.mongodb.deleteOne(this.collection, productId);
  }
}

module.exports = ProductService;
