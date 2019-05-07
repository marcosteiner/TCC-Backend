let express = require('express');
let app = express();
let controller = require('./controller/controller');


app.get('/', (req, res) => controller.get(req, res));

app.post('/increase', (req, res) => {
    res.json('{"coffee_name":"Milchkaffee","person_name":"Marco"}');
});
  
app.listen(3000, () => console.log("Listening on port 3000..."));