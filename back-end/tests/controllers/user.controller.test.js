const { expect } = require('chai');
const sinon = require('sinon');
const userService = require('../../services/userService');
const userController = require('../../controllers/userController');
const {
    allMockList,
} = require('../mocks/userServiceMock');

describe('Checking user', function () {

    const req = {};
    const res = {};

    before(async function () {
        sinon.stub(userService, 'getAllUsers').resolves(allMockList);
        sinon.stub(userService, 'getUserId').resolves(allMockList);
        sinon.stub(userService, 'deleteUser').resolves();

        res.status = sinon.stub().returns(res);
        res.sendStatus = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
    });

    after(function () {
        sinon.restore();
    });

    describe('Checking User Controller', function () {
        describe('Checking all the users have been listed..', function () {
            it('successfully', async function () {
                req.headers = { authorization:
                     `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
                     .eyJuYW1lIjoiRGVsaXZlcnkgQXBwIEFkbWluIiwiZW1haWwiOiJhZGVsaXZl
                     cnlhcHAuY29tIiwicm9sZSI6ImFkbW1uaXN0cmF0b3IiLCJpYXQiOjE2NjQ0O
                     DA3NDd9.Acx1J5LDIXkXEeVwoZcxrd3kCXIczBkHuy2s` };
                await userController.getAllUsers(req, res);
                expect(res.status.calledWith(200)).to.be.equal(true);
                expect(res.json.calledWith(allMockList)).to.be.equal(true);
            });
        });
        describe('Checking if the user has been deleted.', function () {
            it('successfully', async function () {
                req.headers = { authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
                eyJuYW1lIjoiRGVsaXZlcnkgQXBwIEFkbWluIiwiZW1haWwiOiJhZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6
                ImFkbW1uaXN0cmF0b3IiLCJpYXQiOjE2NjQ0ODA3NDd9
                .Acx1J5LDIXkXEeVwoZcxrd3kCXIczBkHuy2s` };
                req.params = { id: 3 };
                await userController.deleteUser(req, res, () => {});
                expect(res.sendStatus.calledWith(204));
            });
        });
        });
    });
