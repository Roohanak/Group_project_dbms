//server.js

const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json()); // This line is important to handle JSON payloads

const path = require('path');


// Serve static files from the 'public' directory
app.use(express.static('public'));

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Flygon=03",
    database: "yt_enterprise_dump"
});

/*
// Create an endpoint to get all customers
app.get('/customers', (req, res) => {
    pool.query('SELECT * FROM yt_enterprise_dump.customer', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});
*/


// insert customer (Only one working so far, haven't tried the other ones)
app.post('/customers', (req, res) => {
    const { ID, Name, Email, Address } = req.body;

    // First, check if the ID is already taken
    const checkQuery = 'SELECT ID FROM customer WHERE ID = ?';
    pool.query(checkQuery, [ID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error', details: err });
        }

        // If the ID is already taken, send an error message
        if (results.length > 0) {
            return res.status(409).json({ error: 'ID taken' });
        }

        // If the ID is not taken, proceed with the insertion
        const insertQuery = 'INSERT INTO customer (ID, Name, Email, Address) VALUES (?, ?, ?, ?)';
        pool.query(insertQuery, [ID, Name, Email, Address], (insertErr, insertResults) => {
            if (insertErr) {
                console.error(insertErr);
                return res.status(500).json({ error: 'Internal server error', details: insertErr });
            }
            // If the insertion is successful, send back the results
            res.json(insertResults);
        });
    });
});



// Create an endpoint to get a specific customer by ID
app.get('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    pool.query('SELECT * FROM yt_enterprise_dump.customer WHERE ID = ? ', [customerId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});








// Update a customer
app.put('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    const { Name, Email, Address } = req.body;
    pool.query('UPDATE yt_enterprise_dump.customer SET Name = ?, Email = ?, Address = ? WHERE ID = ?', [Name, Email, Address, customerId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});


// Delete a customer
app.delete('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    pool.query('DELETE FROM yt_enterprise_dump.customer WHERE ID = ?', [customerId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});







// Create a new shirt
app.post('/shirt', (req, res) => {
    const { Size, Color, Deadline, DesignPercentage } = req.body;
    pool.query('INSERT INTO yt_enterprise_dump.shirt (Size, Color, Deadline, DesignPercentage) VALUES (?, ?, ?, ?)', [Size, Color, Deadline, DesignPercentage], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

// Get all shirts
app.get('/shirt', (req, res) => {
    pool.query('SELECT * FROM yt_enterprise_dump.shirt', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

// Get a specific shirt by ID
app.get('/shirt/:id', (req, res) => {
    const shirtId = req.params.id;
    pool.query('SELECT * FROM yt_enterprise_dump.shirt WHERE ShirtID = ?', [shirtId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

// Update a shirt
app.put('/shirt/:id', (req, res) => {
    const shirtId = req.params.id;
    const { Size, Color, Deadline, DesignPercentage } = req.body;
    pool.query('UPDATE yt_enterprise_dump.shirt SET Size = ?, Color = ?, Deadline = ?, DesignPercentage = ? WHERE ShirtID = ?', [Size, Color, Deadline, DesignPercentage, shirtId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

// Delete a shirt
app.delete('/shirt/:id', (req, res) => {
    const shirtId = req.params.id;
    pool.query('DELETE FROM yt_enterprise_dump.shirt WHERE ShirtID = ?', [shirtId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});
















// Serve the customer.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public' , 'customer.html'));
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



