

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
document.getElementById('add-shirt-button')?.addEventListener('click', () => {
    toggleVisibility('add-shirt-tab', true);
    toggleVisibility('add-shirt-button', false);
});

//not working yet
document.getElementById('add-wishlist-button')?.addEventListener('click', () => {
    toggleVisibility('add-wishlist-tab', true);
    toggleVisibility('add-wishlist-button', false);
});




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

// Event listener for the shirt form submission
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



// Event listener for the shirt form submission(not working yet)
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




