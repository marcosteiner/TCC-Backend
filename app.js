let express = require('express');
let app = express();
let controller = require('./controller/controller');


app.get('/', (req, res) => controller.get(req, res));

app.get('/total-count', (req, res) => controller.totalCount(req, res));

app.get('/users', (req, res) => controller.getUsers(req, res));

app.post('/increase', (req, res) => controller.increase(req, res));

app.post('/decrease', (req, res) => controller.decrease(req, res));
  
app.listen(3000, () => console.log("Listening on port 3000..."));