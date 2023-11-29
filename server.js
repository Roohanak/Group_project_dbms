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

/*----------------------------------------------------------------------NOTES------------------------------------------------------------------------------------------------------------------
1.)MIGHT BE BETTER TO CREATE A SINGLE FUNCTION FOR EACH CRUD (ADD/UPDATE/DELETE) INSTEAD OF MULTIPLE INSERTS FOR EACH SINGLE THING BUT IM HAVING TROUBLE WITH THAT SO ILL HAVE THIS SCUFF FOR NOW
2.)Also for the primary key such as ID and other IDs they need to be incremented as they are entered in the database but to do that I have to remove all the existing restrictions and dependencies but
I dont want to mess up the database so for now i have them included in the forms to be inputted in.
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    */


/**INSERT / ADD OPERATIONS */


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

//INSERT new wishlist(might not be how you populate this table)

app.post('/wishlist', (req, res) => {
    const { shirtID, CartID, CustomerID, DateAdded } = req.body;

    // Check if CartID already exists
    const checkCartQuery = 'SELECT CartID FROM `add-to-wishlist` WHERE CartID = ?';
    pool.query(checkCartQuery, [CartID], (cartErr, cartResults) => {
        if (cartErr) {
            // Handle server error during CartID check
            //console.error("Database error during CartID check:", cartErr);
            //return res.status(500).json({ error: 'Internal server error', details: cartErr });
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (cartResults.length > 0) {
            // Return conflict error if CartID already exists
            return res.status(409).json({ error: 'CartID already exists' });
        }

        // Check if ShirtID exists in the shirt table
        const checkShirtQuery = 'SELECT ShirtID FROM shirt WHERE ShirtID = ?';
        pool.query(checkShirtQuery, [shirtID], (shirtErr, shirtResults) => {
            if (shirtErr || shirtResults.length === 0) {
                return res.status(404).json({ error: 'ShirtID does not exist' });
            }

            // Check if CustomerID exists in the customer table
            const checkCustomerQuery = 'SELECT ID FROM customer WHERE ID = ?';
            pool.query(checkCustomerQuery, [CustomerID], (customerErr, customerResults) => {
                if (customerErr || customerResults.length === 0) {
                    return res.status(404).json({ error: 'CustomerID does not exist' });
                }

                // Insert into the wishlist table if both IDs exist
                const insertQuery = 'INSERT INTO `add-to-wishlist` (shirtID, CartID, CustomerID, DateAdded) VALUES (?, ?, ?, ?)';
                pool.query(insertQuery, [shirtID, CartID, CustomerID, DateAdded], (insertErr, insertResults) => {
                    if (insertErr) {
                        // Handle insertion error
                        return res.status(500).json({ error: 'Failed to add to wishlist' });
                    }

                    res.status(200).json({ message: 'Added to wishlist successfully' });
                });
            });
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



//insert BUY 
app.post('/buy', (req, res) => {
    const { CustomerID, ShirtID, PurchaseDate } = req.body;

    // Check if ShirtID exists in the shirt table
    const checkShirtQuery = 'SELECT ShirtID FROM shirt WHERE ShirtID = ?';
    pool.query(checkShirtQuery, [ShirtID], (shirtErr, shirtResults) => {
        if (shirtErr || shirtResults.length === 0) {
            return res.status(404).json({ error: 'ShirtID does not exist' });
        }

        // Check if CustomerID exists in the customer table
        const checkCustomerQuery = 'SELECT ID FROM customer WHERE ID = ?';
        pool.query(checkCustomerQuery, [CustomerID], (customerErr, customerResults) => {
            if (customerErr || customerResults.length === 0) {
                return res.status(404).json({ error: 'CustomerID does not exist' });
            }

            // Insert into the purchase table if both IDs exist
            const insertQuery = 'INSERT INTO `buy` (CustomerID, ShirtID, PurchaseDate) VALUES (?, ?, ?)';
            pool.query(insertQuery, [CustomerID, ShirtID, PurchaseDate], (insertErr, insertResults) => {
                if (insertErr) {
                    // Handle insertion error
                    console.error("Database error during insert:", insertErr);
                     return res.status(500).json({ error: 'Failed to make purchase', details: insertErr });

                }

                res.status(200).json({ message: 'Purchase successfully made' });
            });
        });
    });
});


// insert endorsement   for youtubers
app.post('/endorsement', (req, res) => {
    const { YoutuberID, ShirtID } = req.body;

    // First, check if the endorsement already exists
    const checkExistQuery = 'SELECT * FROM endorsement WHERE YoutuberID = ? AND ShirtID = ?';
    pool.query(checkExistQuery, [YoutuberID, ShirtID], (existErr, existResults) => {
        if (existErr) {
            console.error("Database error during existence check:", existErr);
            return res.status(500).json({ error: 'Internal server error', details: existErr });
        }

        if (existResults.length > 0) {
            return res.status(409).json({ error: 'Endorsement already exists' });
        }

        // Check if YoutuberID exists
        const checkYoutuberQuery = 'SELECT YouTuberID FROM youtuber WHERE YouTuberID = ?';
        pool.query(checkYoutuberQuery, [YoutuberID], (youtuberErr, youtuberResults) => {
            if (youtuberErr || youtuberResults.length === 0) {
                return res.status(404).json({ error: 'YoutuberID does not exist' });
            }

            // Check if ShirtID exists in the shirt table
            const checkShirtQuery = 'SELECT ShirtID FROM shirt WHERE ShirtID = ?';
            pool.query(checkShirtQuery, [ShirtID], (shirtErr, shirtResults) => {
                if (shirtErr || shirtResults.length === 0) {
                    return res.status(404).json({ error: 'ShirtID does not exist' });
                }

                // Insert into the endorsement table if both IDs exist
                const insertQuery = 'INSERT INTO `endorsement` (YoutuberID, ShirtID) VALUES (?, ?)';
                pool.query(insertQuery, [YoutuberID, ShirtID], (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error("Database error during insert:", insertErr);
                        return res.status(500).json({ error: 'Failed to add endorsement', details: insertErr });
                    }

                    res.status(200).json({ message: 'Endorsement successfully added' });
                });
            });
        });
    });
});










// EDIT/update CRUD OPERATIONS//


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



























/**DELETE/REMOVE OPERATIONS */


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
        if (results.affectedRows === 0) {
            // No rows affected means no customer with this ID
            return res.status(404).json({ error: 'Customer not found' });
        }
        // Successfully deleted the customer
        res.json({ message: `Customer with ID ${id} deleted successfully` });
    });
});








//fallback route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



