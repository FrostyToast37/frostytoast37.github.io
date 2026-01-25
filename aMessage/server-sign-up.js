//imports
const fs = require("fs");
const express = require("express");
let mysql = require("mysql");
let bcrypt = require("bcrypt");

class AccountInfo {
  constructor(password, username) {
    this.password = password;
    this.username = username;
  }
}

async function getUserInfo() {
  try {
    const response = await fetch("https://frostytoast37.cookiechaos.xyz/aMessage/login.html");
    const data = await response.json();
  } catch (err) {
    console.error(err);
  }
}


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
  let sql = "INSERT INTO customers (user, password) VALUES (?, ?)";
  con.query(sql, [insertUser, insertPassword], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});


