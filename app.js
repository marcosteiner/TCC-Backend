let express = require('express');
let app = express();
let controller = require('./controller/controller');


app.get('/', (req, res) => controller.get(req, res));

app.post('/increase', (req, res) => {
    res.json('{}');
});
  
app.listen(3000, () => console.log("Listening on port 3000..."));