const chai = require('chai');
const chaiHttp = require('chai-http');
const { Router } = require('express');
const loginController = require('../../controllers/loginController');

chai.use(chaiHttp);
const { expect } = chai;

describe('Login Routes', () => {
  let app;

  before(() => {
    const routes = Router();
    routes.post('/', loginController.login);

    app = require('express')();
    app.use(routes);
  });

  it('Login', async () => {
    const res = await chai.request(app).get('/');

    expect(res).to.have.status(404);

  });
});
