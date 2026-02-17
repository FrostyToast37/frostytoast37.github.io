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
    res.status(200).json({
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
    if(hash) {var result = await check(hash,password)}
    res.status(200).json({
      success: true,
      message: "Logged In" 
    })
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
let con;

async function connect() {
  try {
    con = await mysql.createConnection({
      host: "localhost",
      user: "newt",
      password: "@lVAiR^Gr0$nDUt1%BHY",
      database: "newtdb"
    });
    console.log("Connected to MySQL");

  } catch (err) {
    console.error("MySQL connection failed:", err.message);
  }
}

connect();


//funcs
async function insertIntoSQL(inputUser, inputHash) {
  try {
    let sql = "INSERT INTO logins (username, hash) VALUES (?, ?)";
    await con.query(sql, [inputUser, inputHash]);
    console.log("1 record inserted");  
    
  } catch (err) {
    console.error(err);
    throw err; 
  }
}

async function pullFromSQL(inputUser){
  try {
    let sql = "SELECT hash FROM logins WHERE username = ?";
    const [rows] = await con.query(sql, [inputUser]);
    console.log("Hash found");
    if(rows.length > 0) {
      var hash = rows[0].hash;
    } else {
      console.log("No user found");
    }

    return hash;

  } catch (err) {
    console.error(err);
    throw err;
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