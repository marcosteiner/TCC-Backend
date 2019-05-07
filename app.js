let express = require('express');
let app = express();
let controller = require('./controller/controller');


app.get('/', (req, res) => controller.get(req, res));

app.post('/increase', (req, res) => controller.increase(req, res));
//(req, res) => { res.json('{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":29}');}

app.post('/decrease', (req, res) => controller.decrease(req, res));
//(req, res) => { res.json('{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":27}');}
  
app.listen(3000, () => console.log("Listening on port 3000..."));