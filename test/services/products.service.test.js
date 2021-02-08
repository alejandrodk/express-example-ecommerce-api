const assert = require("assert");
const proxyquire = require("proxyquire");

const {
  MongoMock,
  getAllStub,
  createOneStub,
} = require("../database/mongo.mock");
const {
  productsMock,
  filteredProductsMock,
} = require("../mocks/products.mocks");

const PRODUCTS_DB_ROUTE = "../lib/mongo";

describe("Products Services", () => {
  const ProductsService = proxyquire("../../services/product.service.js", {
    [PRODUCTS_DB_ROUTE]: MongoMock,
  });

  const productsService = new ProductsService();

  describe("When getProductsList is called", async () => {
    it("Should call the getAll mongo method", async () => {
      await productsService.getProductsList({});

      assert.strictEqual(getAllStub.called, true);
    });

    it("should return an array of products", async function () {
      const result = await productsService.getProductsList({});

      const expected = productsMock;
      assert.strictEqual(result, expected);
    });
  });

  describe("when getProducts method is called with tags", async function () {
    it("should all the getAll MongoLib method with tags args", async function () {
      await productsService.getProductsList({ tags: ["expensive"] });

      const tagQuery = { tags: { $in: ["expensive"] } };

      assert.strictEqual(getAllStub.calledWith("products", tagQuery), true);
    });

    it("should return an array of products filtered by the tag", async function () {
      const result = await productsService.getProductsList({
        tags: ["expensive"],
      });

      const expected = filteredProductsMock("expensive");

      assert.notStrictEqual(result, expected);
    });
  });
});
