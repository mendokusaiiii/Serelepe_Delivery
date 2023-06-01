const chai = require('chai');
const chaiHttp = require('chai-http');
const { Router } = require('express');
const productsController = require('../../controllers/productsController');

chai.use(chaiHttp);
const { expect } = chai;

describe('Products Routes', () => {
  let app;

  before(() => {
    const routes = Router();
    routes.get('/', productsController.getAllProducts);

    app = require('express')();
    app.use(routes);
  });

  it('Return all products', async () => {
    const res = await chai.request(app).get('/');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
