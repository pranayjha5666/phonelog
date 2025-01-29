const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD, 
    database: "telephone_app",
});

db.connect(err => {
    if (err) console.error("DB Connection Failed:", err);
    else console.log("Connected to MySQL");
});

// Get all contacts
app.get("/contacts", (req, res) => {
    db.query("SELECT * FROM contacts", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Add contact
app.post("/contacts", (req, res) => {
    const { name, phone, email } = req.body;
    const sql = "INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)";
    db.query(sql, [name, phone, email], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, name, phone, email });
    });
});

// Delete contact
app.delete("/contacts/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM contacts WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Contact deleted" });
    });
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
