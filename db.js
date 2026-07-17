const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pavani",
    database: "student_portal"
});

connection.connect((err) => {
    if (err) {
        console.error("Database Connection Failed:", err.message);
        return;
    }

    console.log("MySQL Connected Successfully");
});

module.exports = connection;