const sinon = require('sinon');
const chai = require('chai');
const dbs = require('../services/db_service');
const controller = require('../controller/controller');
const httpMocks = require('node-mocks-http');

describe("The Coffee Counter controller test", () => {
    describe("Get coffee consumption data", () => {
        it("Should return all data about coffee consumption", () => {

            let request  = httpMocks.createRequest();
        
            let response = httpMocks.createResponse();

            let dbsStub = sinon.spy(dbs, 'getData')

            controller.get(request, response);

            sinon.assert.calledOnce(dbsStub);
            chai.assert(response._isJSON);
        })
    });

    describe("Change coffee consumption data", () => {
        it("Should increase the counter of one entry", () => {

            let request  = httpMocks.createRequest();
        
            let response = httpMocks.createResponse();

            let dbsStub = sinon.spy(dbs, 'increase')

            controller.increase(request, response);

            sinon.assert.calledOnce(dbsStub);
            chai.assert(response._isJSON);
        });

        it("Should decrease the counter of one entry", () => {

            let request  = httpMocks.createRequest();
        
            let response = httpMocks.createResponse();

            let dbsStub = sinon.spy(dbs, 'decrease')

            controller.decrease(request, response);

            sinon.assert.calledOnce(dbsStub);
            chai.assert(response._isJSON);
        });
    });
});