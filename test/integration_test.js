let expect  = require("chai").expect;
let request = require("request");
let supertest = require("supertest");

let server = supertest.agent("http://localhost:3000");

describe("The Coffee Counter API", () => {

  describe("Get coffee consumption data", () => {

    let url = "http://localhost:3000/";

    it("returns status 200", (done) => {
      request(url, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it("returns the coffee consumption data as json", (done) => {
      request(url, (error, response, body) => {
        expect(body).to.equal('[{"coffee_name":"Milchkaffee","person_name":"Marco"},{"coffee_name":"Espresso","person_name":"Marco"},{"coffee_name":"Milchkaffee","person_name":"Pascal"}]');
        done();
      });
    });

  });

  describe("Increase coffee counter", () => {

    let url = "/increase";

    it("returns status 200", (done) => {
      server.post(url)
      .send('{"coffee_name":"Milchkaffee","person_name":"Marco"}')
      .expect("Content-type",/json/)
      .expect(200, done);
    });

  });
  
});