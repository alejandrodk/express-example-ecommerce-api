const assert = require("assert");
const proxyquire = require("proxyquire");

const {
  productsMock,
  ProductsServiceMock,
} = require("../mocks/products.mocks");

const testServer = require("../server");

const PRODUCTS_SERVICE_ROUTE = "../../services/product.service";

describe("E2E Test products API", () => {
  const route = proxyquire("../../routes/api/products.routes.js", {
    [PRODUCTS_SERVICE_ROUTE]: ProductsServiceMock,
  });

  const request = testServer(route);

  describe("GET /products", () => {
    it("Should return with status 200", (done) => {
      request.get("/api/products").expect(200, done);
    });
  });

  it("should respond with content type json", function (done) {
    request.get("/api/products").expect("Content-type", /json/, done);
  });

  it("should respond with not error", function (done) {
    request.get("/api/products").end((err, res) => {
      assert.strictEqual(err, null);
      done();
    });
  });

  it("should respond with the list of products", function (done) {
    request.get("/api/products").end((err, res) => {
      assert.notStrictEqual(res.body, {
        data: productsMock,
        message: "products listed",
      });
      done();
    });
  });
});
