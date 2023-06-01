const { expect } = require("chai");
const sinon = require("sinon");
const salesService = require("../../services/saleService");
const {
  salesMockList,
  createSaleMockResponse,
  salesMock,
  userCustomerLocalStorage
} = require("../mocks/salesMock");

describe("Sales Service", function() {
  beforeEach(function() {
    sinon.stub(salesService, "createSale").resolves(createSaleMockResponse);
    sinon.stub(salesService, "getAllSales").resolves(salesMockList);
    sinon.stub(salesService, "updateSale").resolves([1]);
  });

  afterEach(function() {
    sinon.restore();
  });

  describe("Checking if the sale has been created.", function() {
    it("sales array must be returned.", async function() {
      const result = await salesService.createSale(
        salesMock,
        userCustomerLocalStorage
      );
      expect(result).to.be.equal(createSaleMockResponse);
    });
  });

  describe("Getting all.", function() {
    it("the sellers.", async function() {
      const result = await salesService.getAllSales();
      expect(result).to.be.deep.equal(salesMockList);
    });
  });

  describe("Checking the updating.", function() {
    describe("It was done successfully", function() {
      it("Returning the data correctly.", async function() {
        const result = await salesService.updateSale(1, "Entregue");
        expect(result).to.be.deep.equal([1]);
      });
    });
  });
});
