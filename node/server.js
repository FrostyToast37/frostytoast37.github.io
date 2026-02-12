//imports
const fs = require("fs");
const express = require("express"); 
let mysql = require("mysql2/promise");
let bcrypt = require("bcrypt");



//EXPRESS----------------------------------------------------------------------------------------------------------------
  //consts
const PORT = 3000;
const app = express();

  //express needs to know to use json
app.use(express.json());
  //express needs to listen on port whatever

app.listen(PORT, "127.0.0.1", () => {
  console.log(`API listening on port ${PORT}`);
});

  //FETCH REQUESTS
    //get username and password and put them into the sql database "newtdb" under the table "logins" in columns called "username" and "password"
app.post("/register", async (req, res) => {
  try{
    const { username, password } = req.body;
    const hash = await encrypt(password);
    await insertIntoSQL(username, hash);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

    //
app.post("/datacheck", async(req, res) => {
  const { username, password } = req.body;

  const hash = await pullFromSQL(username);
  await check(hash,password);
});



//MYSQL------------------------------------------------------------------------------------------------------------------
//consts

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

//funcs
async function insertIntoSQL(inputUser, inputPassword) {
  let sql = "INSERT INTO logins (username, password) VALUES (?, ?)";
  await con.query(sql, [inputUser, inputPassword], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    } else {
      console.log("1 record inserted");
      res.json({ success: true });
    }
  });
}

async function pullFromSQL(inputUser){
  let sql = "SELECT hash FROM logins WHERE username = ?";
  await con.query(sql, [inputUser], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    } else {
      console.log("1 record inserted");
      res.json({ success: true });
    }
    return result;
  });
}

//BCRYPT------------------------------------------------------------------------------------------------------------------
//consts
const saltRounds = 10;

//encryption
async function encrypt(inputPassword){
  await bcrypt.hash(inputPassword, saltRounds, function(err, hash) {
    //returns salted and hashed password
    return hash;
  });
}

async function check(hash, inputPassword){
  await bcrypt.compare(inputPassword, hash, function(err, result) {
    if(err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }
    return result;
  });
}