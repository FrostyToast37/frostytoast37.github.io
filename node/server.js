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
    secure: false,
    httpOnly: true, 
    sameSite: "lax", 
    maxAge: 1000 * 60 * 60 * 24 //expires in 24 hours
  }
}));
app.use(express.json());

//ROUTE FUNCTIONS
  //checks if user is logged in
function ensureAuthentication(req, res, next) {
  if (req.session.authenticated) {
    return next();
  } else {
    res.status(403).json({ msg: "You're not authorized to view this page" });
  }
}

  //ROUTE HANDLERS

  //text-adv Route Handlers
    //saves
app.post("/text-adv/api/save", async(req,res) =>{
  req.session.user.textAdv.save = req.body;
  return res.status(200);
});

    //loads
app.post("/text-adv/api/load", async(req,res) =>{
  return res.status(200).json(req.session.user.textAdv.save);
});

  //aMessage Route Handlers
    //get username and password and put them into the sql database "newtdb" under the table "logins" in columns called "username" and "password"
app.post("/aMessage/api/signUp", async(req, res) => {
  try{
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Missing credentials" });
    }


    const hash = await encrypt(password);
    
    
    if (!await insertIntoSQL(username, hash)) {
      return res.status(409).json({
        success: false,
        message: "Username Taken"
      })
    }
    
    return res.status(200).json({
      success: true,
      message: "Password input"
    });

    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Server error:" + err.message
      });
    }
});

    //checks the sent password against the username and hash stored in newtdb
app.post("/aMessage/api/login", async(req, res) => {
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
      req.session.user = { username };

      //I hate callbacks so this just makes session.save a promise
      await new Promise((resolve, reject) => {
        req.session.save((err) => {
          if (err) return reject(err);
          resolve(); 
        });
      });

      return res.status(200).json({
        success: true,
        message: "Logged In"
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Password"
      });
    }
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

    //currently this route just is for testing
app.post("/aMessage/api/main", async(req, res) => {
  try {
    return res.status(200).json({username: req.session.user.username});
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

    //serves the file only if authenticated
app.get("/aMessage/main", ensureAuthentication, async(req, res) =>{
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
      message: "Server error" + err.message
    });
  }
});


  //express needs to listen on port whatever, this starts the server
  //MAKE SURE THIS STAYS AT THE BOTTOM OF THE EXPRESS SECTION

app.listen(PORT, "127.0.0.1", () => {
  console.log(`API listening on port ${PORT}`);
});


//MYSQL------------------------------------------------------------------------------------------------------------------
//consts
//connect to sql database
let pool;
function connect() {
    pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "newtdb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true, 
    keepAliveInitialDelay: 0
  });
}

connect();


//funcs
async function insertIntoSQL(inputUser, inputHash) {
  try {
    let sql = "SELECT EXISTS(SELECT 1 FROM logins WHERE username = ?) AS existsFlag";
    const [rows] = await pool.query(sql, [inputUser]);

    if (rows[0].existsFlag === 1) {
      console.log("Username already taken.");
      return false;
    }
    
    sql = "INSERT INTO logins (username, password) VALUES (?, ?)";
    await pool.query(sql, [inputUser, inputHash]);
    console.log("1 record inserted");  

    return true;
     
  } catch (err) {
    console.error(err);
    throw err; 
  }
}

async function pullFromSQL(inputUser){
  try {
    let hash;
    let sql = "SELECT password FROM logins WHERE username = ?";
    const [rows] = await pool.query(sql, [inputUser]);
    console.log("Hash found");
    if(rows.length > 0) {
      hash = rows[0].password;
    } else {
      console.log("No user found");
      return null;
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