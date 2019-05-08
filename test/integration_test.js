
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

  describe("Update the coffee counter", function(){
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

    it("returns the updated table row", (done) => {
      server.post(url)
      .send('{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":28}')
      .expect("Content-type",/json/)
      .end((err, res) => {
        expect(res.body).to.deep.equal([{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":29}]);
        done();
      });
    });

    it("returns the updated coffee consumption data", (done) => {
      request("http://localhost:3000/", (error, response, body) => {
        expect(body).to.equal('[{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":29},{"coffee_name":"Espresso","person_name":"Marco","coffee_count":2},{"coffee_name":"Milchkaffee","person_name":"Pascal","coffee_count":27}]');
        done();
      });
    });

    it("decreases the value once for each request", (done) => {
      server.post("/decrease")
      .send('{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":29}')
      .end((err, res) => {
        expect(res.body).to.deep.equal([{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":28}]);
        done();
      });
    });

    it("decreases the value again for next request", (done) => {
      server.post("/decrease")
      .send('{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":28}')
      .end((err, res) => {
        expect(res.body).to.deep.equal([{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":27}]);
        done();
      });
    });

    it("The default values for the database are restored", (done) => {
      request("http://localhost:3000/", (error, response, body) => {
        expect(body).to.equal('[{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":27},{"coffee_name":"Espresso","person_name":"Marco","coffee_count":2},{"coffee_name":"Milchkaffee","person_name":"Pascal","coffee_count":27}]');
        done();
      });
    });

  });
  

  describe("Get the total amount of coffees consumed", () => {

    it("Should return the correct amount of coffees consumed" ,(done) => {
      server.get("/total-count")
      .end((req, res) => {
        expect(res.body).to.deep.equal([{"SUM(coffee_count)":56}]);
        done();
      });
    })
  })

  describe("Get all users", () => {

    it("Should return all users" ,(done) => {
      server.get("/users")
      .end((req, res) => {
        expect(res.body).to.deep.equal([{"person_name": "Marco"},{"person_name": "Nicola"},{"person_name": "Pascal"}]);
        done();
      });
    })
  })
});