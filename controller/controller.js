const dbs = require('../services/db_service');

function get(req, res){
    let callback = (err, rows) => {
        if (err) {
          throw err;
        }
        res.json(rows);
      }
    dbs.getData(callback);
};

module.exports = {
  get: get
}