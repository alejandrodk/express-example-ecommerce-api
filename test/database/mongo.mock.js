const {
  productsMock,
  filteredProductsMock,
} = require("../mocks/products.mocks");
const sinon = require("sinon");

const getAllStub = sinon.stub();
const createOneStub = sinon.stub().resolves("fake-product-id");

const tagQuery = { tags: { $in: ["expensive"] } };

getAllStub.withArgs("products").resolves(productsMock);
getAllStub
  .withArgs("products", tagQuery)
  .resolves(filteredProductsMock("expensive"));

class MongoMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  createOne(collection, data) {
    return createOneStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createOneStub,
  MongoMock,
};
