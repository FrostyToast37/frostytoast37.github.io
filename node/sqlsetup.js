/*let mysql = require("mysql2");


let con = mysql.createConnection({
  host: "localhost",
  user: "newt",
  password: "a7cFefl0T0iCMdYiCBiR!",
  database: "newtdb"
});

con.connect(function(err) {
  let sql = "CREATE TABLE logins (username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)"
    if (err) throw err;
    console.log("Connected!");
    con.query(sql , function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
  con.end();
});


*/ 