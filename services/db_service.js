const sqlite3 = require('sqlite3').verbose();
 
function getData(callback){ 
  let sql = `SELECT coffee_name, person_name, coffee_count FROM consumption ORDER BY person_name`;
  let db = new sqlite3.Database('./database/Coffee.db');
  db.serialize(() => {
    db.exec("BEGIN");
    db.all(sql, [], callback);
    db.exec("COMMIT");
  });
  db.close();
}

function getUsers(callback){
  let db = new sqlite3.Database('./database/Coffee.db');
  db.serialize(() => {
    db.exec("BEGIN");
    db.all("SELECT * FROM person ORDER BY name", [], callback);
    db.exec("COMMIT");
  });
  db.close();
}

function getCoffees(callback){
  let db = new sqlite3.Database('./database/Coffee.db');
  db.serialize(() => {
    db.exec("BEGIN");
    db.all("SELECT * FROM coffees ORDER BY name", [], callback);
    db.exec("COMMIT");
  });
  db.close();
}

function totalCount(callback){
  let db = new sqlite3.Database('./database/Coffee.db');
  db.serialize(() => {
    db.exec("BEGIN");
    db.all("SELECT SUM(coffee_count) FROM consumption", [], callback);
    db.exec("COMMIT");
  });
  db.close();
}

function increase(onError, callback, username, coffeename){
  let db = new sqlite3.Database('./database/Coffee.db');
  db.serialize(() => {
    db.exec("BEGIN");
    db.run("UPDATE consumption SET coffee_count = coffee_count + 1 WHERE coffee_name = $coffeeName AND person_name = $personName", 
    {$coffeeName: coffeename, $personName: username}, 
    onError);
    db.all("SELECT coffee_name, person_name, coffee_count FROM consumption WHERE coffee_name = $coffeeName AND person_name = $personName",
    {$coffeeName: coffeename, $personName: username}, 
    callback);
    db.exec("COMMIT");
  });
  db.close();
}

function decrease(onError, callback, username, coffeename){
  let db = new sqlite3.Database('./database/Coffee.db');
  db.serialize(() => {
    db.exec("BEGIN");
    db.run("UPDATE consumption SET coffee_count = coffee_count - 1 WHERE coffee_name = $coffeeName AND person_name = $personName", 
    {$coffeeName: coffeename, $personName: username}, 
    onError);
    db.all("SELECT coffee_name, person_name, coffee_count FROM consumption WHERE coffee_name = $coffeeName AND person_name = $personName",
    {$coffeeName: coffeename, $personName: username}, 
    callback);
    db.exec("COMMIT");  
  });
  db.close();
}

function createUser(callback, username){
  let db = new sqlite3.Database('./database/Coffee.db');
  db.serialize(() => {
    db.exec("BEGIN");
    db.run("INSERT INTO person VALUES ($personName)", 
    {$personName: username}, 
    callback);
    db.exec("COMMIT");  
  });
  db.close();
}

function deleteUser(callback, username){
  let db = new sqlite3.Database('./database/Coffee.db');
  db.serialize(() => {
    db.exec("BEGIN");
    db.run("DELETE FROM person WHERE name = $personName", 
    {$personName: username}, 
    callback);
    db.exec("COMMIT");  
  });
  db.close();
}


module.exports = {
  getData: getData,
  getUsers: getUsers,
  increase: increase,
  decrease: decrease,
  totalCount: totalCount,
  getCoffees: getCoffees,
  createUser: createUser,
  deleteUser: deleteUser
}