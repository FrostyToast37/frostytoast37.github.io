//imports
const fs = require("fs");
const express = require("express"); const app = express();
let mysql = require("mysql");
let bcrypt = require("bcrypt");

//express needs to know to use json
app.use(express.json());
//express needs to listen on port whatever
app.listen(3000);


//connect to sql database
let con = mysql.createConnection({
  host: "db",
  user: "root",
  password: "wpzW6MI8BsLCO4krkx1te3nLWk5CpQwYXGqVcJyxY8yZuNlyvxySXbjjGxEVm2o3YaBQO6Ir",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.post("/register", (req, res) => {
  const { user, password } = req.body;

  let sql = "INSERT INTO customers (user, password) VALUES (?, ?)";
  con.query(sql, [user, password], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }
    console.log("1 record inserted");
    res.json({ success: true });
  });
});
