//imports
const fs = require("fs");
let mysql = require("mysql");
let bcrypt = require("bcrypt");
let mysql = require('mysql');

//connect to sql database
let con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "mydb"
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  let sql = "INSERT INTO customers (user, password) VALUES ('', '')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});


