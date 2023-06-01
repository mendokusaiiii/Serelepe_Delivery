const { expect } = require('chai');
const sinon = require('sinon');
const productsController = require('../../controllers/productsController');
const productsService = require('../../services/productsService');
const productsMockList = require('../mocks/productMock');

describe('Product Controller', () => {
  const req = {};
  const res = {};

  beforeEach(function () {
    sinon.stub(productsService, 'getAllProducts').resolves(productsMockList);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('Checking if a product has been created.', function () {
    it('Success status 200 must be returned.', async function () {
      await productsController.getAllProducts(req, res);
      expect(res.status.calledWith(200)).to.be.deep.equal(true);
      expect(res.json.calledWith(productsMockList)).to.be.equal(true);
    });
  });
});
