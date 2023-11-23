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


//**MIGHT BE BETTER TO CREATE A SINGLE FUNCTION FOR EACH CRUD (ADD/UPDATE/DELETE) INSTEAD OF MULTIPLE INSERTS FOR EACH SINGLE THING BUT IM HAVING TROUBLE WITH THAT SO ILL HAVE THIS SCUFF FOR NOW**//




// insert customer (
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




//insert new shirt
app.post('/shirt', (req, res) => {
    const { shirtID, Size, Color, Deadline, DesignPercentage } = req.body;
    const insertQuery = 'INSERT INTO yt_enterprise_dump.shirt (shirtID, Size, Color, Deadline, DesignPercentage) VALUES (?, ?, ?, ?, ?)';
    
    pool.query(insertQuery, [shirtID, Size, Color, Deadline, DesignPercentage], (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                // Handle duplicate entry for shirtID
                res.status(409).json({ error: 'ShirtID taken' });
            } else {
                // Handle other errors
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            }
            return;
        }
        res.json({ message: 'Shirt has been added' });
    });
});

//INSERT new wishlist(not working yet)
app.post('/wishlist', (req, res) => {
    const { shirtID, CartID, CustomerID, DateAdded } = req.body;
    const insertQuery = 'INSERT INTO yt_enterprise_dump.shirt (shirtID, CartID, CustomerID, DateAdded) VALUES (?, ?, ?, ?)';
    
    pool.query(insertQuery, [shirtID, CartID, CustomerID, DateAdded], (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                // Handle duplicate entry for shirtID
                res.status(409).json({ error: 'ShirtID taken' });
            } else {
                // Handle other errors
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            }
            return;
        }
        res.json({ message: 'Wishlist has been added' });
    });
});







// Route for the customer page
app.get('/customers.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'customers.html'));
});




/*
// Serve the customer.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public' , 'customer.html'));
});
*/
//fallback route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



