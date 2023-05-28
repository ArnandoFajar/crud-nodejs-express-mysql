const mysql = require("mysql");

const connectDatabase = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs-express-mysql",
  multipleStatements: true,
});

connectDatabase.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected ");
});

module.exports = connectDatabase;
