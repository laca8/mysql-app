const mysql = require("mysql2");
const pool1 = mysql.createPool({
  host: process.env.host,
  user: "root",
  password: process.env.password,
  database: "test1",
  port: 3308,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const pool2 = mysql.createPool({
  host: process.env.host,
  user: "root",
  password: process.env.password,
  database: "test2",
  port: 3308,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool1.getConnection(function (err) {
  if (err) {
    console.log(process.env.user);

    console.log(err);
  } else {
    console.log("db1 connection");
  }
});
pool2.getConnection(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("db2 connection");
  }
});
module.exports = { pool1, pool2 };
