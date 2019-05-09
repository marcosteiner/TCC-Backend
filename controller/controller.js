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

function getUsers(req, res){
  let callback = (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  }
  dbs.getUsers(callback);
}

function getCoffees(req, res){
  let callback = (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  }
  dbs.getCoffees(callback);
}

function totalCount(req, res){
  let callback = (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  }
  dbs.totalCount(callback);
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

function createUser(req, res){
  let callback = (err, rows) => {
    if (err) {
      throw err;
    }
    res.send();
  }
  dbs.createUser(callback, "Marco");
}

function deleteUser(req, res){
  let callback = (err, rows) => {
    if (err) {
      throw err;
    }
    res.send();
  }
  dbs.deleteUser(callback, "Marco");
}

module.exports = {
  get: get,
  getUsers: getUsers,
  increase: increase,
  decrease: decrease,
  totalCount: totalCount,
  getCoffees: getCoffees,
  createUser: createUser,
  deleteUser: deleteUser
}