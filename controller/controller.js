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
  let onError = (err) => {
    if (err) {
      throw err;
    }
  }

  let callback = (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  }
  dbs.increase(onError, callback);
};

function decrease(req, res){
  let onError = (err) => {
    if (err) {
      throw err;
    }
  }

  let callback = (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  }
  dbs.decrease(onError, callback);
};
module.exports = {
  get: get,
  increase: increase,
  decrease: decrease
}