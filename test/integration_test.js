var expect  = require("chai").expect;
var request = require("request");
let supertest = require("supertest");

let server = supertest.agent("http://localhost:3000");

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

  describe("Increase coffee counter", function() {

    let url = "http://localhost:3000/increase";

    it("returns status 200", (done) => {
      server.post(url)
      .send('{"coffee_name":"Milchkaffee","person_name":"Marco"}')
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        res.body.error.should.equal(false);
        res.body.data.should.equal(30);
        done();
      });
    });

  });
  
});