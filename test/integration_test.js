var expect  = require("chai").expect;
var request = require("request");

describe("The Coffee Counter API", function() {

    describe("Get coffee consumption data", function() {
  
      var url = "http://localhost:3000/";
  
      it("returns status 200", function(done) {
        request(url, function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
  
      it("returns the coffee consumption data as json", function(done) {
        request(url, function(error, response, body) {
          expect(body).to.equal('[{"coffee_name":"Milchkaffee","person_name":"Marco"},{"coffee_name":"Espresso","person_name":"Marco"},{"coffee_name":"Milchkaffee","person_name":"Pascal"}]');
          done();
        });
      });
  
    });
  
  });