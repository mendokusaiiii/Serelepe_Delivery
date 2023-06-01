const { expect } = require("chai");
const sinon = require("sinon");
const productService = require("../../services/productsService");
const { productMockList } = require("../mocks/productMock");

describe("Product Service", function() {
  beforeEach(function() {
    sinon.stub(productService, "getAllProducts").resolves(productMockList);
  });

  afterEach(function() {
    sinon.restore();
  });

  describe("Creating a product", function() {
    it("The product array must be returned.", async function() {
      const result = await productService.getAllProducts();
      expect(result).to.be.deep.equal(productMockList);
    });
  });
});
