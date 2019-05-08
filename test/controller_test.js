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

            let dbsSpy = sinon.spy(dbs, 'getData')

            controller.get(request, response);

            sinon.assert.calledOnce(dbsSpy);
            chai.assert(response._isJSON);
        })
    });

    describe("Operations with the toal coffee count", () => {

        it("should return the sum of all coffees consumed", () => {
            let request  = httpMocks.createRequest();
        
            let response = httpMocks.createResponse();
    
            let dbsSpy = sinon.spy(dbs, 'totalCount')
    
            controller.totalCount(request, response);
    
            sinon.assert.calledOnce(dbsSpy);
            chai.assert(response._isJSON);
        });
    });

    describe("Return all users", () => {
        it("should return all users", () => {

            let request  = httpMocks.createRequest();
        
            let response = httpMocks.createResponse();

            let dbsSpy = sinon.spy(dbs, 'getUsers')

            controller.getUsers(request, response);

            sinon.assert.calledOnce(dbsSpy);
        });
    });

    describe("Change coffee consumption data", () => {
        it("should increase the counter of one entry", () => {

            let request  = httpMocks.createRequest();
        
            let response = httpMocks.createResponse();

            let dbsSpy = sinon.spy(dbs, 'increase')

            controller.increase(request, response);

            sinon.assert.calledOnce(dbsSpy);
            chai.assert(response._isJSON);
        });

        it("should decrease the counter of one entry", () => {

            let request  = httpMocks.createRequest();
        
            let response = httpMocks.createResponse();

            let dbsSpy = sinon.spy(dbs, 'decrease')

            controller.decrease(request, response);

            sinon.assert.calledOnce(dbsSpy);
            chai.assert(response._isJSON);
        });
    });
});