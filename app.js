let express = require('express');
let app = express();
let controller = require('./controller/controller');


app.get('/', (req, res) => controller.get(req, res));

app.get('/total-count', (req, res) => controller.totalCount(req, res));

app.get('/users', (req, res) => controller.getUsers(req, res));

app.get('/coffees', (req, res) => controller.getCoffees(req, res));

app.post('/increase/:username/:coffeename', (req, res) => controller.increase(req, res));

app.post('/decrease/:username/:coffeename', (req, res) => controller.decrease(req, res));

app.post('/create/user/:name', (req, res) => controller.createUser(req, res));

app.post('/delete/user/:name', (req, res) => controller.deleteUser(req, res));
  
app.listen(3001, () => console.log("Listening on port 3001..."));