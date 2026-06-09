const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Henrique3103//",
  database: "app_tarefas",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;