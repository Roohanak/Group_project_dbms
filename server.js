//server.js

const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;

const pool = mysql.createPool({
    host: "root",
    user: "marvinj.pam03@gmail.com",
    password: "Flygon=03",
    database: "yt_enterprise"
});

// Create an endpoint to get all customers
app.get('/customers', (req, res) => {
    pool.query('SELECT * FROM yt_enterprise.customer', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

// Create an endpoint to get a specific customer by ID
app.get('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    pool.query('SELECT * FROM yt_enterprise.customer WHERE ID = 3', [customerId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


