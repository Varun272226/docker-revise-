
const express = require("express");
const mysql = require("mysql2/promise");

const app = express();

const db = mysql.createPool({
    host: "mysql",
    port: 3306,
    user: "root",
    password: "root123",
    database: "myapp"
});

app.get("/", (req, res) => {
    res.json({
        message: "Hello from Docker backend!"
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "UP"
    });
});

app.get("/db-test", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT 1 AS result");

        res.json({
            database: "Connected",
            result: rows[0].result
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);

        res.status(500).json({
            database: "Connection failed",
            error: error.message
        });
    }
});


if (require.main === module) {
    app.listen(3000, "0.0.0.0", () => {
        console.log("Backend running on port 3000");
    });
}

module.exports = app;
