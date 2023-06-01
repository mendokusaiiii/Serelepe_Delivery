const { expect } = require('chai');
const sinon = require('sinon');
const SalesService = require('../../services/saleService');
const SalesController = require('../../controllers/saleController');
const { createSaleMockResponse, salesMock,
     userCustomerLocalStorage, salesMockList } = require('../mocks/salesMock');

describe('Sales Controller', function () {


    const req = {};
    const res = {};

    beforeEach(function () {
        sinon.stub(SalesService, 'createSale').resolves(createSaleMockResponse.dataValues);
        sinon.stub(SalesService, 'getAllSales').resolves(salesMockList);
        sinon.stub(SalesService, 'updateSale').resolves([1]);
        res.status = sinon.stub().returns(res);
        res.sendStatus = sinon.stub();
        res.json = sinon.stub();
    });

    afterEach(function () {
        sinon.restore();
    });

    describe('Checking if a sales has been created.', function () {
        it('Status code 201 must be returned.', async function () {
            req.body = salesMock;
            req.headers = { authorization: userCustomerLocalStorage.token };
            await SalesController.createSale(req, res);
            expect(res.status.calledWith(201));
            expect(res.json.calledWith(createSaleMockResponse.dataValues));
        });
    });

    describe('Checking all sales list', function () {
        it('Status code 200 must be returned', async function () {
            req.headers = { authorization: userCustomerLocalStorage.token };
            await SalesController.getAllSales(req, res);
            expect(res.status.calledWith(200))
            expect(res.json.calledWith(salesMockList))
        });
    });
    
    describe('Checking updating sales', function () {
        it('Status code 200 must be returned.', async function () {
            req.body = { status: 'teste' };
            req.params = { id: 1 };
            req.headers = { authorization: userCustomerLocalStorage.token };
            await SalesController.updateSale(req, res);
            expect(res.status.calledWith(200)).to.be.equal(true);
            expect(res.json.calledWith([1])).to.be.equal(true);
        });
    });
});