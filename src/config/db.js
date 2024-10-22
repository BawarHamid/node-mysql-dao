const mysql = require("mysql2");

try {
  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Userlist",
  });
  module.exports = pool.promise();
} catch (error) {
  console.log(error);
}
