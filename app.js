let express = require('express');
let app = express();
let controller = require('./controller/controller');


app.get('/', (req, res) => controller.get(req, res));
  
app.listen(3000, () => console.log("Listening on port 3000..."));