
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
        expect(body).to.equal('[{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":27},{"coffee_name":"Espresso","person_name":"Marco","coffee_count":2},{"coffee_name":"Milchkaffee","person_name":"Pascal","coffee_count":27}]');
        done();
      });
    });

  });

  describe("Increase coffee counter", function(){
    this.timeout(10000);

    let url = "/increase";

    it("returns status 200", (done) => {
      server.post(url)
      .send('{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":27}')
      .expect(200)
      .end((err, res) => {
        done();
      });
    });

    it("returns status returns the updated table row", (done) => {
      server.post(url)
      .send('{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":28}')
      .expect("Content-type",/json/)
      .end((err, res) => {
        expect(res.body).to.equal('{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":29}');
        done();
      });
    });

    it("returns the coffee updated coffee consumption data", (done) => {
      request(url, (error, response, body) => {
        expect(body).to.equal('[{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":29},{"coffee_name":"Espresso","person_name":"Marco","coffee_count":2},{"coffee_name":"Milchkaffee","person_name":"Pascal","coffee_count":27}]');
        done();
      });
    });

    it("decreases the value once for each request", (done) => {
      server.post("/decrease")
      .send('{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":29}');

      server.post("/decrease")
      .send('{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":28}')
      .end((err, res) => {
        expect(res.body).to.equal('{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":27}');
        done();
      });
    });

    it("The default values for the database are restored", (done) => {
      request(url, (error, response, body) => {
        expect(body).to.equal('[{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":27},{"coffee_name":"Espresso","person_name":"Marco","coffee_count":2},{"coffee_name":"Milchkaffee","person_name":"Pascal","coffee_count":27}]');
        done();
      });
    });

  });
  
});