const sqlite3 = require('sqlite3').verbose();
 
function getData(callback){ 
  let sql = `SELECT coffee_name, person_name, coffee_count FROM consumption
            ORDER BY person_name`;
  let db = new sqlite3.Database('./database/Coffee.db');
  db.serialize(() => {
    db.exec("BEGIN");
    db.all(sql, [], callback);
    db.exec("COMMIT");
  });
  db.close();
}

function increase(callback){
  let db = new sqlite3.Database('./database/Coffee.db');
  db.serialize(() => {
    db.exec("BEGIN");
    db.run("UPDATE consumption SET coffee_count = coffee_count + 1 WHERE coffee_name = $coffeeName AND person_name = $personName", {$coffeeName: "Milchkaffee", $personName: "Marco"}, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row increased updated: ${this.changes}`);
    });
    db.exec("COMMIT");
  });
  db.close();
}

function decrease(callback){
  let db = new sqlite3.Database('./database/Coffee.db');
  db.serialize(() => {
    db.exec("BEGIN");
    db.run("UPDATE consumption SET coffee_count = coffee_count - 1 WHERE coffee_name = $coffeeName AND person_name = $personName", {$coffeeName: "Milchkaffee", $personName: "Marco"}, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row decreased updated: ${this.changes}`);
    
      });
    db.exec("COMMIT");  
  });
  db.close();
}


module.exports = {
  getData: getData,
  increase: increase,
  decrease: decrease
}