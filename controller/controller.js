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

function increase(req, res){
  let callback = () => { }
  dbs.increase(callback);
};

function decrease(req, res){
  let callback = () => { }
  dbs.decrease(callback);
};
module.exports = {
  get: get,
  increase: increase,
  decrease: decrease
}