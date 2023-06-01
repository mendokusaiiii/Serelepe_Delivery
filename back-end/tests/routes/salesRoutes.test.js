const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const saleService = require('../../services/saleService');
const saleController = require('../../controllers/saleController');

chai.use(chaiHttp);

describe('Sale Controller', () => {
  describe('POST /sale', () => {
    it('Create a Sale and return ID', async () => {
      const req = {
        body: {} 
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const saleId = '12345'; 
      sinon.stub(saleService, 'createSale').resolves(saleId);

      await saleController.createSale(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ saleId })).to.be.true;

      sinon.restore();
    });

    it('Error handler and call Next', async () => {
      const req = {
        body: {} 
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };
      const next = sinon.stub();

      const error = new Error('Internal Server Error');
      sinon.stub(saleService, 'createSale').rejects(error);

      await saleController.createSale(req, res, next);

      expect(next.calledWith(error)).to.be.true;

      sinon.restore();
    });
  });

  describe('GET /sale/:id', () => {
    it('Successfully', async () => {
      const req = {
        params: {
          id: '12345' 
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const saleInfo = {}; 
      sinon.stub(saleService, 'detailedSale').resolves(saleInfo);

      await saleController.detailedSale(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(saleInfo)).to.be.true;

      sinon.restore();
    });

    it('Error and Call Next', async () => {
      const req = {
        params: {
          id: '12345' 
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };
      const next = sinon.stub();

      const error = new Error('Internal Server Error');
      sinon.stub(saleService, 'detailedSale').rejects(error);

      await saleController.detailedSale(req, res, next);

      expect(next.calledWith(error)).to.be.true;

      sinon.restore();
    });
  });

});
