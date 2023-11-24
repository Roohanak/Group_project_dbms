

// Function to toggle visibility of elements
const toggleVisibility = (elementId, isVisible) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = isVisible ? 'block' : 'none';
    }
};

// Event listeners for ADD buttons
document.getElementById('addButton')?.addEventListener('click', () => {
    toggleVisibility('add-customer-tab', true);
    toggleVisibility('addButton', false);
});

//add shirt event listener
document.getElementById('add-shirt-button')?.addEventListener('click', () => {
    toggleVisibility('add-shirt-tab', true);
    toggleVisibility('add-shirt-button', false);
});

//not working yet but for add wishlist
document.getElementById('add-wishlist-button')?.addEventListener('click', () => {
    toggleVisibility('add-wishlist-tab', true);
    toggleVisibility('add-wishlist-button', false);
});


//event listner add youtuber
document.getElementById('add-youtuber-button')?.addEventListener('click', () => {
    toggleVisibility('add-youtuber-tab', true);
    toggleVisibility('add-youtuber-button', false);
});


//event listner return-shirt-form
document.getElementById('return-shirt-button')?.addEventListener('click', () => {
    toggleVisibility('return-shirt-tab', true);
    toggleVisibility('return-shirt-button', false);
});


/* 
// deleter customer event listner(might have to use the function above instead)
document.getElementById('delete-customer-button').addEventListener('click', function() {
    document.getElementById('delete-customer-tab').style.display = 'block';
});*/





// Event listener for the 'Add Customer' form submission
document.getElementById('add-customer-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    fetch('/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ID: id, Name: name, Email: email, Address: address }),
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 409) {
                alert("ID taken. Please try a different ID.");
                return;
            } else {
                alert("An error occurred. Please try again later.");
                return;
            }
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            console.log('Success:', data);
            alert("Form has been successfully inserted into the database.");
            window.location.href = 'customer.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Event listener for the add shirt form submission
const shirtForm = document.getElementById('add-shirt-form');
if (shirtForm) {
    shirtForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        // Collect the form data
        const shirtID = document.getElementById('shirtid').value;
        const size = document.getElementById('size').value;
        const color = document.getElementById('color').value;
        const deadline = document.getElementById('deadline').value;
        const designPercentage = document.getElementById('designpercentage').value;
        
        // Send the POST request
        fetch('/shirt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shirtID: shirtID, Size: size, Color: color, Deadline: deadline, DesignPercentage: designPercentage }),
        })
        .then(response => {
            if (response.status === 409) {
                alert("ID taken. Please try a different ID.");
                return;
            }
            if (!response.ok) {
                // Handle other errors
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Show success message
            if (data) {
                console.log('Success:', data);
                alert("Form has been successfully inserted into the database.");
    
                //go back to 
                window.location.href = 'shirts.html';
            }
        })
        .catch(error => {
            // Show error message
            console.error('Error:', error);
        });
    });
}



// Event listener for the wishlist form submission(not working yet)
//'Cannot add or update a child row: a foreign key constraint fails (`yt_enterprise_dump`.`add-to-wishlist`, CONSTRAINT `shirt_cart_ibfk_1` FOREIGN KEY (`ShirtID`) REFERENCES `shirt` (`ShirtID`)
const wishForm = document.getElementById('add-wishlist-form');
if (wishForm) {
    wishForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        // Collect the form data
        const shirtid = document.getElementById('shirtid').value;
        const cartid = document.getElementById('cartid').value;
        const customerid = document.getElementById('customerid').value;
        const dateadded = document.getElementById('dateadded').value;
        
        
        // Send the POST request
        fetch('/wishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shirtID: shirtid, CartID: cartid, CustomerID: customerid, DateAdded: dateadded }),
        })
        .then(response => {
            if (response.status === 409) {
                alert("ID taken. Please try a different  cart ID.");
                return;
            }
            if (!response.ok) {
                // Handle other errors
                alert("An error occurred. Please try again later.");
                return;
            }
            return response.json();
        })
        .then(data => {
            // Show success message
            if (data) {
                console.log('Success:', data);
                alert("Form has been successfully inserted into the database.");
    
                //go back to 
                window.location.href = 'wishlist.html';
            }
        })
        .catch(error => {
            // Show error message
            console.error('Error:', error);
        });
    });
}





// Event listener for the 'Add YouTuber' form submission
document.getElementById('add-youtuber-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const youtuberID = document.getElementById('youtuberid').value;
    const name = document.getElementById('name').value;
    const channel = document.getElementById('channel').value;

    fetch('/youtubers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ YouTuberID: youtuberID, Name: name, Channel: channel }),
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 409) {
                alert("YouTuberID taken. Please try a different ID.");
                return;
            } else {
                alert("An error occurred. Please try again later.");
                return;
            }
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            console.log('Success:', data);
            alert("Form has been successfully inserted into the database.");
            window.location.href = 'youtuber.html'; // Redirect to a page of your choice
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});




//add the return-form to the database
// Event listener for the 'Return Shirt' form submission
document.getElementById('return-shirt-form')?.addEventListener('submit', (event) => {
    
    event.preventDefault();

    // Collect the form data
    const returnID = document.getElementById('returnid').value;
    const checkerName = document.getElementById('checkername').value;
    const returnDate = document.getElementById('returndate').value;
    const reasonForReturn = document.getElementById('reasonforreturn').value;
    const actionTaken = document.getElementById('actiontaken').value;

    // Send the POST request
    fetch('/return-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            ReturnID: returnID, 
            CheckerName: checkerName, 
            ReturnDate: returnDate, 
            ReasonForReturn: reasonForReturn, 
            ActionTaken: actionTaken 
        }),
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 409) {
                alert("ID taken. Please try a different ID.");
                return;
            } else {
                alert("An error occurred. Please try again later.");
                return;
            }
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            console.log('Success:', data);
            alert("Return information has been successfully inserted into the database.");
            window.location.href = 'shirts.html'; // Redirect to the shirts page
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});




















/**DELETE/REMOVE OPERATION */


/**'Cannot delete or update a parent row: a foreign key constraint fails (`yt_enterprise_dump`.`add-to-wishlist`, CONSTRAINT `shirt_cart_ibfk_3` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`ID`))', must remove current restriction and probably do cascading delete */
// Event listener for the 'Delete Customer' form submission
document.getElementById('delete-customer-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const customerId = document.getElementById('delete-id').value;

    fetch(`/customers/${customerId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert("Customer has been successfully deleted from the database.");
        window.location.href = 'customer.html'; // Redirect 
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
    });
});

