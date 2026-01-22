let mysql = require("mysql")

let con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});

let con2 = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "mydb"
});

con2.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con2.query("CREATE TABLE mytable", function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});
