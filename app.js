let express = require('express');
let app = express();
let dbs = require('./services/db_service');


app.get('/', (req, res) => {
    let callback = (err, rows) => {
        if (err) {
          throw err;
        }
        res.json(rows);
      }
    dbs.getData(callback);
});
  
app.listen(3000, () => console.log("Listening on port 3000..."));