const sqlite3 = require('sqlite3').verbose();
 
function getData(callback){

  // open the database
  let db = new sqlite3.Database('./database/Coffee.db');
  
  let sql = `SELECT coffee_name, person_name FROM consumption
            ORDER BY person_name`;
  
  db.all(sql, [], callback);
  
  // close the database connection
  db.close();
}

module.exports = {
  getData: getData
}