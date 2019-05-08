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

function totalCount(callback){
  let db = new sqlite3.Database('./database/Coffee.db');
  db.serialize(() => {
    db.exec("BEGIN");
    db.all("SELECT SUM(coffee_count) FROM consumption", [], callback);
    db.exec("COMMIT");
  });
  db.close();
}

function increase(onError, callback){
  let db = new sqlite3.Database('./database/Coffee.db');
  db.serialize(() => {
    db.exec("BEGIN");
    db.run("UPDATE consumption SET coffee_count = coffee_count + 1 WHERE coffee_name = $coffeeName AND person_name = $personName", 
    {$coffeeName: "Milchkaffee", $personName: "Marco"}, 
    onError);
    db.all("SELECT coffee_name, person_name, coffee_count FROM consumption WHERE coffee_name = $coffeeName AND person_name = $personName",
    {$coffeeName: "Milchkaffee", $personName: "Marco"}, 
    callback);
    db.exec("COMMIT");
  });
  db.close();
}

function decrease(onError, callback){
  let db = new sqlite3.Database('./database/Coffee.db');
  db.serialize(() => {
    db.exec("BEGIN");
    db.run("UPDATE consumption SET coffee_count = coffee_count - 1 WHERE coffee_name = $coffeeName AND person_name = $personName", 
    {$coffeeName: "Milchkaffee", $personName: "Marco"}, 
    onError);
    db.all("SELECT coffee_name, person_name, coffee_count FROM consumption WHERE coffee_name = $coffeeName AND person_name = $personName",
    {$coffeeName: "Milchkaffee", $personName: "Marco"}, 
    callback);
    db.exec("COMMIT");  
  });
  db.close();
}


module.exports = {
  getData: getData,
  increase: increase,
  decrease: decrease,
  totalCount: totalCount
}