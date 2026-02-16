let mysql = require("mysql");


let con2 = mysql.createConnection({
  host: "localhost",
  user: "newt",
  password: "@lVAiR^Gr0$nDUt1%BHY",
  database: "newtdb"
});

con.connect(function(err) {
  let sql = "CREATE TABLE logins (username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)"
    if (err) throw err;
    console.log("Connected!");
    con2.query(sql , function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});


//