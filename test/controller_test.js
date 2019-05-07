const sinon = require('sinon');
const chai = require('chai');
const dbs = require('../services/db_service');
const controller = require('../controller/controller');
const httpMocks = require('node-mocks-http');

describe("The Coffee Counter controller test", () => {
    describe("Get coffee consumption data", () => {
        it("Should return all data about coffee consumption", () => {

            let request  = httpMocks.createRequest({
                method: 'GET',
                url: '/user/42',
                params: {
                  id: 42
                }
            });
        
            let response = httpMocks.createResponse();

            let dbsStub = sinon.spy(dbs, 'getData')

            controller.get(request, response);

            sinon.assert.calledOnce(dbsStub);
            chai.assert(response._isJSON);
        })
    })
});