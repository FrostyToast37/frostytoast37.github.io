let mysql = require("mysql")

let con = mysql.createConnection({
  host: "db",
  user: "root",
  password: "wpzW6MI8BsLCO4krkx1te3nLWk5CpQwYXGqVcJyxY8yZuNlyvxySXbjjGxEVm2o3YaBQO6Ir",
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
  host: "db",
  user: "root",
  password: "wpzW6MI8BsLCO4krkx1te3nLWk5CpQwYXGqVcJyxY8yZuNlyvxySXbjjGxEVm2o3YaBQO6Ir",
  database: "mydb"
});

con2.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con2.query("CREATE TABLE logins", function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});
