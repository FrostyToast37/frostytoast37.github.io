//imports
const fs = require("fs");
const express = require("express"); const app = express();
let mysql = require("mysql2");
let bcrypt = require("bcrypt");
const PORT = 3000;

//express needs to know to use json
app.use(express.json());
//express needs to listen on port whatever

app.listen(PORT, "127.0.0.1", () => {
  console.log(`API listening on port ${PORT}`);
});



//connect to sql database
let con = mysql.createConnection({
  host: "localhost",
  user: "newt",
  password: "@lVAiR^Gr0$nDUt1%BHY",
  database: "newtdb"
});

con.connect(function(err) {
  if (err) {
    console.error("MySQL connection failed:", err.message);
    return;
  }
  console.log("Connected to MySQL");
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
