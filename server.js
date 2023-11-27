//server.js

const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json()); // This line is important to handle JSON payloads

const path = require('path');

app.use(express.static('public')); // Serve static files from the 'public' directory

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "LSUtigers12!",
    database: "yt_enterprise_dump"
});


/*----------------------------------------------------------------------NOTES------------------------------------------------------------------------------------------------------------------
1.)MIGHT BE BETTER TO CREATE A SINGLE FUNCTION FOR EACH CRUD (ADD/UPDATE/DELETE) INSTEAD OF MULTIPLE INSERTS FOR EACH SINGLE THING BUT IM HAVING TROUBLE WITH THAT SO ILL HAVE THIS SCUFF FOR NOW
2.)Also for the primary key such as ID and other IDs they need to be incremented as they are entered in the database but to do that I have to remove all the existing restrictions and dependencies but
I dont want to mess up the database so for now i have them included in the forms to be inputted in.
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    */

/***************************************************************************************************************************/
/*                                                    SELECT OPERATIONS                                                    */
/***************************************************************************************************************************/

// List existing customers in the database
app.get('/existingCustomers', (req, response) => {
    const allCustomers = "SELECT * FROM yt_enterprise_dump.customer;"

    pool.query(allCustomers, (err, results) => {
        if(err) {
            console.log(err);
            response.status(500).json({error: "Internal Server Error"});
        }

        response.json({ data: results });
    });
});


/***************************************************************************************************************************/
/*                                                    INSERT OPERATIONS                                                    */
/***************************************************************************************************************************/

// insert customer
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
//'Cannot add or update a child row: a foreign key constraint fails (`yt_enterprise_dump`.`add-to-wishlist`, CONSTRAINT `shirt_cart_ibfk_1` FOREIGN KEY (`ShirtID`) REFERENCES `shirt` (`ShirtID`)
app.post('/wishlist', (req, res) => {
    const { shirtID, CartID, CustomerID, DateAdded } = req.body;

    // Check if the entry already exists
    const checkQuery = 'SELECT * FROM `add-to-wishlist` WHERE shirtID = ? OR CartID = ? OR CustomerID = ?';
    pool.query(checkQuery, [shirtID, CartID, CustomerID], (checkErr, checkResults) => {
        if (checkErr) {
            console.error(checkErr);
            return res.status(500).json({ error: 'Internal server error', details: checkErr });
        }

        // If the entry already exists, send an error message
        if (checkResults.length > 0) {
            return res.status(409).json({ error: 'Entry already exists in wishlist' });
        }

        // If the entry does not exist, proceed with the insertion
        const insertQuery = 'INSERT INTO `add-to-wishlist` (shirtID, CartID, CustomerID, DateAdded) VALUES (?, ?, ?, ?)';
        pool.query(insertQuery, [shirtID, CartID, CustomerID, DateAdded], (insertErr, insertResults) => {
            if (insertErr) {
                console.error(insertErr);
                return res.status(500).json({ error: 'Internal server error', details: insertErr });
            }
            // If the insertion is successful, send back the results
            res.json({ message: 'Wishlist item has been added' });
        });
    });
});



// insert youtuber
app.post('/youtubers', (req, res) => {
    const { YouTuberID, Name, Channel } = req.body;

    // First, check if the YouTuberID is already in use
    const checkQuery = 'SELECT YouTuberID FROM youtuber WHERE YouTuberID = ?';
    pool.query(checkQuery, [YouTuberID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error', details: err });
        }

        // If the YouTuberID is already taken, send an error message
        if (results.length > 0) {
            return res.status(409).json({ error: 'YouTuberID taken' });
        }

        // If the YouTuberID is not taken, proceed with the insertion
        const insertQuery = 'INSERT INTO youtuber (YouTuberID, Name, Channel) VALUES (?, ?, ?)';
        pool.query(insertQuery, [YouTuberID, Name, Channel], (insertErr, insertResults) => {
            if (insertErr) {
                console.error(insertErr);
                return res.status(500).json({ error: 'Internal server error', details: insertErr });
            }
            // If the insertion is successful, send back the results
            res.json(insertResults);
        });
    });
});


// Insert 'Return Shirt form' data
app.post('/return-form', (req, res) => {
    const { ReturnID, CheckerName, ReturnDate, ReasonForReturn, ActionTaken } = req.body;

    // First, check if the ReturnID is already taken
    const checkQuery = 'SELECT ReturnID FROM return_form WHERE ReturnID = ?';
    pool.query(checkQuery, [ReturnID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error', details: err });
        }

        // If the ReturnID is already taken, send an error message
        if (results.length > 0) {
            return res.status(409).json({ error: 'ReturnID taken' });
        }

        // If the ReturnID is not taken, proceed with the insertion
        const insertQuery = 'INSERT INTO return_form (ReturnID, CheckerName, ReturnDate, ReasonForReturn, ActionTaken) VALUES (?, ?, ?, ?, ?)';
        pool.query(insertQuery, [ReturnID, CheckerName, ReturnDate, ReasonForReturn, ActionTaken], (insertErr, insertResults) => {
            if (insertErr) {
                console.error(insertErr);
                return res.status(500).json({ error: 'Internal server error', details: insertErr });
            }
            // If the insertion is successful, send back the results
            res.json(insertResults);
        });
    });
});


// Insert 'Shirt Quality Control' data
app.post('/shirt-quality', (req, res) => {
    const { QualityControlID, CheckerName,InspectionDate, QualityRating, QualityIssues } = req.body;

    // First, check if the QualityControlID is already taken
    const checkQuery = 'SELECT QualityControlID FROM quality_control_form WHERE QualityControlID = ?';
    pool.query(checkQuery, [QualityControlID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error', details: err });
        }

        // If the QualityControlID is already taken, send an error message
        if (results.length > 0) {
            return res.status(409).json({ error: 'QualityControlID taken' });
        }

        

        // If the QualityControlID is not taken, proceed with the insertion
        const insertQuery = 'INSERT INTO quality_control_form (QualityControlID, CheckerName, InspectionDate, QualityRating, QualityIssues) VALUES (?, ?, ?, ?, ? )';
        pool.query(insertQuery, [QualityControlID, CheckerName, InspectionDate, QualityRating, QualityIssues], (insertErr, insertResults) => {
            if (insertErr) {
                console.error(insertErr);
                return res.status(500).json({ error: 'Internal server error', details: insertErr });
            }
            // If the insertion is successful, send back the results
            res.json({ message: 'Shirt quality control record added successfully', data: insertResults });
        });
    });
});


/***************************************************************************************************************************/
/*                                                 UPDATE/EDIT OPERATIONS                                                  */
/***************************************************************************************************************************/

// Update a customer by ID
app.put('/customers/:id', (req, res) => {
    const { id } = req.params; // Customer ID from the URL
    const { Name, Email, Address } = req.body; // New data from the request body

    const updateQuery = 'UPDATE customer SET Name = ?, Email = ?, Address = ? WHERE ID = ?';
    pool.query(updateQuery, [Name, Email, Address, id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error', details: err });
        }
        if (results.affectedRows === 0) {
            // No rows affected means no customer with this ID
            return res.status(404).json({ error: 'Customer not found' });
        }
        // Successfully updated the customer
        res.json({ message: `Customer with ID ${id} updated successfully` });
    });
});



// Update a shirt by ShirtID
app.put('/shirts/:id', (req, res) => {
    const { id } = req.params; 
    const { Size, Color, Deadline, DesignPercentage } = req.body; // New data from the request body

    const updateQuery = 'UPDATE shirt SET Size = ?, Color = ?, Deadline = ?, DesignPercentage = ? WHERE ShirtID = ?';
    pool.query(updateQuery, [Size, Color, Deadline, DesignPercentage, id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error', details: err });
        }
        if (results.affectedRows === 0) {
            // No rows affected means no shirt with this ID
            return res.status(404).json({ error: 'Shirt not found' });
        }
        // Successfully updated the shirt
        res.json({ message: `Shirt with ID ${id} updated successfully` });
    });
});


// Update a YouTuber by YouTuberID
app.put('/youtubers/:id', (req, res) => {
    const { id } = req.params; 
    const { Name, Channel } = req.body; // New data from the request body

    const updateQuery = 'UPDATE youtuber SET Name = ?, Channel = ? WHERE YouTuberID = ?';
    pool.query(updateQuery, [Name, Channel, id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error', details: err });
        }
        if (results.affectedRows === 0) {
            // No rows affected means no YouTuber with this ID
            return res.status(404).json({ error: 'YouTuber not found' });
        }
        // Successfully updated the YouTuber
        res.json({ message: `YouTuber with ID ${id} updated successfully` });
    });
});


/***************************************************************************************************************************/
/*                                                DELETE/REMOVE OPERATIONS                                                 */
/***************************************************************************************************************************/


/**'Cannot delete or update a parent row: a foreign key constraint fails (`yt_enterprise_dump`.`add-to-wishlist`, CONSTRAINT `shirt_cart_ibfk_3` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`ID`))', must remove current restriction and probably do cascading delete */

// Delete a customer by ID
app.delete('/customers/:id', (req, res) => {
    const { id } = req.params;
    
    const deleteQuery = 'DELETE FROM customer WHERE ID = ?';
    pool.query(deleteQuery, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error', details: err });
        }
        res.json({ success: results});
    });
});


/***************************************************************************************************************************/
/*                                                          OTHERS                                                         */
/***************************************************************************************************************************/

// Route for the customer page
app.get('/customers.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'customers.html'));
});


//fallback route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
