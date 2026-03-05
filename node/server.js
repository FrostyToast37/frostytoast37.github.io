//to-do:
//fix-XSS-on-text-adventure

//imports
const fs = require("fs");
const path = require("path");
const express = require("express"); 
let mysql = require("mysql2/promise");
let bcrypt = require("bcrypt");
let session = require("express-session");



//EXPRESS----------------------------------------------------------------------------------------------------------------
  //consts
const SECRET = process.env.SESSION_SECRET
const PORT = process.env.PORT;
const app = express();

  //express middleware configs

app.set('trust proxy', 1)

app.use(session({
  proxy: true,
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, 
    httpOnly: true, 
    sameSite: "lax", 
    maxAge: 1000 * 60 * 60 * 24 //expires in 24 hours
  }
}));
app.use(express.json());

  
  //ROUTE HANDLERS


    //get username and password and put them into the sql database "newtdb" under the table "logins" in columns called "username" and "password"
app.post("/signUp", async (req, res) => {
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

    //checks the sent password against the username and hash stored in newtdb

app.post("/login", async(req, res) => {
  try {
    const { username, password } = req.body;
    const hash = await pullFromSQL(username);
    

    if(!hash) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exist"
      })
    }
    const result = await check(hash,password);
    if (result) {
      //log in to the session
      req.session.authenticated = true;
      req.session.user = {
        username,
        password
      }

      //send back to client that everything is working
      res.status(200).json({
        success: true,
        message: "Logged In" 
      
      })
      // res.redirect(303, "/main");
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

function ensureAuthentication(req, res, next) {
  if (req.session.authenticated) {
    return next();
  } else {
    res.status(403).json({ msg: "You're not authorized to view this page" });
  }
}

app.get("/main", ensureAuthentication, async(req, res) =>{
  try {
    res.sendFile(path.join(__dirname,"main.html"));
    // res.status(200).json({
    //   success: true,
    //   message: "Successful login"
    // })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
})


  //express needs to listen on port whatever, this starts the server

app.listen(PORT, "127.0.0.1", () => {
  console.log(`API listening on port ${PORT}`);
});


//MYSQL------------------------------------------------------------------------------------------------------------------
//consts


//connect to sql database
let con;

async function connect() {
  try {
    con = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
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