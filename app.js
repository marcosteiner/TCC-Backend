const controller = require('./controller/controller');
var express = require('express');
var app = express();


app.get('/', (req, res) => {
    res.send('[{"coffee_name":"Milchkaffee","person_name":"Marco"},{"coffee_name":"Espresso","person_name":"Marco"},{"coffee_name":"Milchkaffee","person_name":"Pascal"}]')
});
  
app.listen(3000, () => console.log("Listening on port 3000..."));