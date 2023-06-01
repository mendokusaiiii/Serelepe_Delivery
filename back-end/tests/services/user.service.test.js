const { expect } = require("chai");
const sinon = require("sinon");
const { Users } = require("../../database/models");
const userService = require("../../services/userService");

const { allMockList, sellerMock } = require("../mocks/userServiceMock");

describe("User test", function() {

  before(async function() {
    sinon
      .stub(userService, "deleteUser")
      .onCall(0)
      .resolves(1)
      .onCall(1)
      .resolves(0);
    sinon
      .stub(userService, "getAllUsers")
      .onCall(0)
      .resolves(allMockList)
      .onCall(1)
      .resolves(sellerMock);
  });

  after(function() {
    sinon.restore();
  });

  describe("UserService test", function() {
    describe("All users can be listed", function() {
      it("successfully", async function() {
        const users = await userService.getAllUsers();
        expect(users).to.be.deep.equal(allMockList);
      });
    });

    describe("User can be deleted.", function() {
      it("successfully", async function() {
       await userService.deleteUser(1);
      });
    });
    describe("User can be deleted...", function() {
      it("unsuccessfully", async function() {
        try {
          await userService.deleteUser(5533);
        } catch (error) {
          expect(error.message).to.be.equal("User not found");
        }
      });
    });
  });
});
