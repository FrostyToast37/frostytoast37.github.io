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
    res.sendStatus(200).json({
      success: true,
      message: "Password input"
    });

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
  try {
      const { username, password } = req.body;
      const hash = await pullFromSQL(username);
      const result = await check(hash,password);
      res.send(result);
      
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
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
  try {
    let sql = "INSERT INTO logins (username, password) VALUES (?, ?)";
    await con.query(sql, [inputUser, inputPassword]);
    console.log("1 record inserted");  
  } catch (err) {
    console.error(err);
  }
}

async function pullFromSQL(inputUser){
  try {
    let sql = "SELECT hash FROM logins WHERE username = ?";
    const hash = await con.query(sql, [inputUser]);
    console.log("Hash found");
    return hash;
    
  } catch (err) {
    console.error(err);
  }
}

//BCRYPT------------------------------------------------------------------------------------------------------------------
//consts
const saltRounds = 10;

//encryption
async function encrypt(inputPassword){
  //returns salted and hashed password
  return await bcrypt.hash(inputPassword, saltRounds);
}

async function check(hash, inputPassword){
  //returns boolean true or false for the password match to the stored hash
  return await bcrypt.compare(inputPassword, hash);
}