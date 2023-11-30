/*************************************************************************/
/*                         EVENT LISTENERS                               */
/*************************************************************************/


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

// Event listener for 'Add Shirt Condition' button
document.getElementById('add-shirt_condition-button')?.addEventListener('click', () => {
    toggleVisibility('add-shirt_condition-tab', true);
    toggleVisibility('add-shirt_condition-button', false);
});

// Event listener for 'buy' button
document.getElementById('add-buy-button')?.addEventListener('click', () => {
    toggleVisibility('add-buy-tab', true);
    toggleVisibility('add-buy-button', false);
});


// Event listener for 'add endorsement' button
document.getElementById('add-endorsement-button')?.addEventListener('click', () => {
    toggleVisibility('add-endorsement-tab', true);
    toggleVisibility('add-endorsement-button', false);
});


// Event listener for 'Edit Shirt' button
document.getElementById('edit-shirt-button')?.addEventListener('click', () => {
    toggleVisibility('edit-shirt-tab', true);
    toggleVisibility('edit-shirt-button', false);
});

// Event listener for 'Edit YouTuber' button
document.getElementById('edit-youtuber-button')?.addEventListener('click', () => {
    toggleVisibility('edit-youtuber-tab', true);
    toggleVisibility('edit-youtuber-button', false);
});

// Event listener for 'Delete YouTuber' button
document.getElementById('delete-youtuber-button')?.addEventListener('click', () => {
    toggleVisibility('delete-youtuber-tab', true);
    toggleVisibility('delete-youtuber-button', false);
});

// Event listener for 'Delete Shirt' button
document.getElementById('delete-shirt-button')?.addEventListener('click', () => {
    toggleVisibility('delete-shirt-tab', true);
    toggleVisibility('delete-shirt-button', false);
});

// Event listener for 'Delete wishlist' button
document.getElementById('delete-wishlist-button')?.addEventListener('click', () => {
    toggleVisibility('delete-wishlist-tab', true);
    toggleVisibility('delete-wishlist-button', false);
});


// date formatting
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; 
}



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


// Event listener for the wishlist form submission(might not be how you populate this table)
const wishForm = document.getElementById('add-wishlist-form');
if (wishForm) {
    wishForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const shirtid = document.getElementById('shirtid').value;
        const cartid = document.getElementById('cartid').value;
        const customerid = document.getElementById('customerid').value;
        const dateadded = document.getElementById('dateadded').value;

        fetch('/wishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shirtID: shirtid, CartID: cartid, CustomerID: customerid, DateAdded: dateadded }),
        })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(result => {
            if (result.status === 409) {
                // Specific error handling for conflicts
                if (result.body.error.includes("CartID already exists")) {
                    alert("CartID already exists. Please try a different ID.");
                } else if (result.body.error.includes("ShirtID conflict")) {
                    alert("Conflict with ShirtID. Please try a different ID.");
                } else if (result.body.error.includes("CustomerID conflict")) {
                    alert("Conflict with CustomerID. Please try a different ID.");
                }
                return;
            }
            if (result.status === 404) {
                // Specific error handling for not found
                if (result.body.error.includes("ShirtID does not exist")) {
                    alert("ShirtID does not exist. Please try a different ID.");
                } else if (result.body.error.includes("CustomerID does not exist")) {
                    alert("CustomerID does not exist. Please try a different ID.");
                }
                return;
            }
            if (result.status !== 200) {
                alert("An error occurred. Please try again later.");
                return;
            }

            console.log('Success:', result.body);
            alert("Form has been successfully inserted into the wishlist.");
            window.location.href = 'wishlist.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while processing your request.");
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
            window.location.href = 'youtuber.html'; 
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


// Event listener for the 'Add Shirt Condition' form submission
document.getElementById('add-shirt_condition-form')?.addEventListener('submit', (event) => {
    event.preventDefault();

    // Collect the form data
    const qualityControlId = document.getElementById('qa-id').value;
    const checkerName = document.getElementById('qacheckername').value;
    const inspectionDate = document.getElementById('inspecdate').value;
    const qualityRating = document.getElementById('qualityrating').value;
    const qualityIssues = document.getElementById('qualityissues').value;

   

    // Send the POST request
    fetch('/shirt-quality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            QualityControlID: qualityControlId, 
            CheckerName: checkerName,
            InspectionDate: inspectionDate, 
            QualityRating: qualityRating, 
            QualityIssues: qualityIssues 
        }),
    })
    .then(response => {
        if (!response.ok) {
            alert("An error occurred. Please try again later.");
            return;
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            console.log('Success:', data);
            alert("Shirt condition information has been successfully added.");
            window.location.href = 'shirts.html'; 
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
    });
});


//  event listner for buy button
const buyForm = document.getElementById('add-buy-form');
if (buyForm) {
    buyForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const customerid = document.getElementById('customerid').value;
        const shirtid = document.getElementById('shirtid').value;
        const purchaseid = document.getElementById('purchaseid').value;

        fetch('/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ CustomerID: customerid, ShirtID: shirtid, PurchaseDate: purchaseid }),
        })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(result => {
            if (result.status === 404) {
                if (result.body.error.includes("ShirtID does not exist")) {
                    alert("ShirtID does not exist. Please try a different ID.");
                } else if (result.body.error.includes("CustomerID does not exist")) {
                    alert("CustomerID does not exist. Please try a different ID.");
                }
                return;
            }
            if (result.status !== 200) {
                alert("An error occurred. Please try again later.");
                return;
            }

            console.log('Success:', result.body);
            alert("Purchase was successfully made.");
            window.location.href = 'index.html'; 
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while processing your request.");
        });
    });
}


//event listner for add endorsement 
const endorsementForm = document.getElementById('add-endorsement-form');
if (endorsementForm) {
    endorsementForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const youtuberID = document.getElementById('add-youtuberID').value;
        const shirtid = document.getElementById('add-shirtid').value;

        fetch('/endorsement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ YoutuberID: youtuberID, ShirtID: shirtid }),
        })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(result => {
            if (result.status === 404) {
                if (result.body.error.includes("YoutuberID does not exist")) {
                    alert("YoutuberID does not exist. Please try a different ID.");
                } else if (result.body.error.includes("ShirtID does not exist")) {
                    alert("ShirtID does not exist. Please try a different ID.");
                }
                return;
            }
            if (result.status !== 200) {
                alert("An error occurred. Please try again later.");
                return;
            }

            console.log('Success:', result.body);
            alert("Endorsement successfully added.");
            window.location.href = 'youtuber.html'; 
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while processing your request.");
        });
    });
}

/*************************************************************************/
/*                      EDIT/UPDATE OPERATIONS                           */
/*************************************************************************/

// event listners for edit customers
document.getElementById('edit-customer-form')?.addEventListener('submit', (event) => {
    
    event.preventDefault();

    // Collect the form data
    const customerId = document.getElementById('edit-id').value;
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;
    const address = document.getElementById('edit-address').value;

    // Send the PUT request
    fetch(`/customers/${customerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            Name: name, 
            Email: email, 
            Address: address 
        }),
    })
    .then(response => {
        if (!response.ok) {
            alert("An error occurred. Customer with that ID could not found or could not be updated.");
            return;
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            console.log('Success:', data);
            alert("Customer information has been successfully updated.");
            window.location.href = 'customer.html'; 
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
    });
});


// Event listener for 'Edit Shirt' form submission
document.getElementById('edit-shirt-form')?.addEventListener('submit', (event) => {
    
    event.preventDefault();

    // Collect the form data
    const shirtId = document.getElementById('edit-shirtid').value;
    const size = document.getElementById('edit-size').value;
    const color = document.getElementById('edit-color').value;
    const deadline = document.getElementById('edit-deadline').value;
    const designPercentage = document.getElementById('edit-designpercentage').value;

    // Send the PUT request
    fetch(`/shirts/${shirtId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            Size: size, 
            Color: color, 
            Deadline: deadline, 
            DesignPercentage: designPercentage 
        }),
    })
    .then(response => {
        if (!response.ok) {
            alert("An error occurred. Shirt with that ID could not found or could not be updated.");
            return;
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            console.log('Success:', data);
            alert("Shirt information has been successfully updated.");
            window.location.href = 'shirts.html'; 
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
    });
});

// Event listener for 'Edit YouTuber' form submission
document.getElementById('edit-youtuber-form')?.addEventListener('submit', (event) => {
    event.preventDefault();

    // Collect the form data
    const youtuberId = document.getElementById('edit-youtuberid').value;
    const name = document.getElementById('edit-youtubername').value;
    const channel = document.getElementById('edit-channel').value;

    // Send the PUT request
    fetch(`/youtubers/${youtuberId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            Name: name, 
            Channel: channel 
        }),
    })
    .then(response => {
        if (!response.ok) {
            alert("An error occurred. YouTuber with that ID could not be found or could not be updated.");
            return;
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            console.log('Success:', data);
            alert("YouTuber information has been successfully updated.");
            window.location.href = 'youtuber.html'; 
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
    });
});

// UPDATE customer information form appears
function editRowById(id) {
    const updateForm = document.querySelector('#edit-customer');

    const editIdInput = document.querySelector('#edit-id');
    editIdInput.value = id;

    updateForm.hidden = false;
}


/*************************************************************************/
/*                         DELETE OPERATIONS                             */
/*************************************************************************/

// DELETE customer information based on ID
function deleteRowByIdCustomer(id) {
    fetch('/customers/' + id, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            alert(`Cannot delete customer. Dependencies exist.`);
            return;
        }
        return response.json(); 
    })
    .then(data => {
        if (data) {
            console.log('Success:', data);
            alert(`Customer has been successfully removed from the database.`);
            window.location.href = 'customer.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// DELETE Youtuber information based on ID
document.getElementById('delete-youtuber-form')?.addEventListener('submit', (event) => {
    event.preventDefault();

    const youtuberId = document.getElementById('delete-youtuberid').value;

    deleteByYoutuberId(youtuberId);
});

function deleteByYoutuberId(id) {
    fetch('/youtubers/' + id, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            console.log('Success:', data);
            alert(`Youtuber has been successfully removed from the database.`);
            window.location.href = 'youtuber.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// DELETE shirt based on ID
document.getElementById('delete-shirt-form')?.addEventListener('submit', (event) => {
    event.preventDefault();

    const shirtId = document.getElementById('delete-shirtid').value;

    deleteByShirtId(shirtId);
});

function deleteByShirtId(id) {
    fetch('/shirts/' + id, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            alert(`Cannot delete shirt. Dependencies exist.`);
            return;
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            console.log('Success:', data);
            alert(`Shirt has been successfully removed from the database.`);
            window.location.href = 'shirts.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// DELETE wishlist
document.getElementById('delete-wishlist-form')?.addEventListener('submit', (event) => {
    event.preventDefault();

    const wishShirtId = document.getElementById('delete-shirtid').value;
    const wishCartId = document.getElementById('delete-cartid').value;
    const wishCustomerId = document.getElementById('delete-customerid').value;
    const wishDate = document.getElementById('delete-dateadded').value;

    deleteWishItem(wishShirtId, wishCartId, wishCustomerId, wishDate);
});

function deleteWishItem(shirtId, cardId, customerId, date) {
    fetch('/wishlist/', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify ({
            shirtId: shirtId,
            cardId: cardId,
            customerId: customerId,
            date: date
        }),
    })
    .then(response => {
        if (!response.ok) {
            alert(`Cannot delete wish. Dependencies exist.`);
            return;
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            console.log('Success:', data);
            alert(`Item has been removed from the wishlist`);
            window.location.href = 'wishlist.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

/*************************************************************************/
/*                   LOADING EXISTING DATA ONTO TABLE                    */
/*************************************************************************/

// Event listener for fetching customer
document.addEventListener('DOMContentLoaded', function() {
    // Fetch data and load table only for the specific page
    if (window.location.href.includes('http://localhost:3000/customer.html')) {
        fetch('http://localhost:3000/existingCustomers')
            .then(response => response.json())
            .then(data => loadHTMLTable(data['data']));
        
        // If table element exist, user may interact with event listeners
        const tbody = document.querySelector('table tbody');
        if (tbody) {
            tbody.addEventListener('click', function(event) {
                if (event.target.className === "delete-row-btn") {
                    deleteRowByIdCustomer(event.target.dataset.id);
                }
                if (event.target.className === "edit-row-btn") {
                    editRowById(event.target.dataset.id);
                }
            });
        } else {
            console.error("Table tbody not found.");
        }
    }
});

// event listner for fetching the return shirt table
document.addEventListener('DOMContentLoaded', function() {
    const loadReturnButton = document.getElementById('loadReturnButton');
    const returnTable = document.getElementById('listReturnForms'); 

    if (loadReturnButton && returnTable) {
        loadReturnButton.addEventListener('click', function() {
            if (returnTable.style.display === "none" || returnTable.style.display === '') {
                fetch('http://localhost:3000/existingReturnForm')
                    .then(response => response.json())
                    .then(data => {
                        loadHTMLTableReturnForm(data['data']);
                        returnTable.style.display = 'block';
                    });
            } else {
                returnTable.style.display = 'none';
            }
        });
    } else {
        //console.log('Return form elements not found');
    }
});


// event listner for fetching the wishlist
document.addEventListener('DOMContentLoaded', function() {
    const loadWishListButton = document.getElementById('loadWishListTableButton');
    const wishListTable = document.getElementById('listWishList'); 

    if (loadWishListButton && wishListTable) {
        loadWishListButton.addEventListener('click', function() {
            if (wishListTable.style.display === "none" || wishListTable.style.display === '') {
                fetch('http://localhost:3000/existingWishList')
                    .then(response => response.json())
                    .then(data => {
                        loadHTMLTableWishlist(data['data']);
                        wishListTable.style.display = 'block';
                    });
            } else {
                wishListTable.style.display = 'none';
            }
        });
    } else {
        //console.log('Wishlist elements not found');
    }
});

// event listner for fetching the shirts
document.addEventListener('DOMContentLoaded', function() {
    const loadShirtButton = document.getElementById('loadShirtButton');
    const shirtTable = document.getElementById('listShirt'); 

    if (loadShirtButton && shirtTable) {
        loadShirtButton.addEventListener('click', function() {
            if (shirtTable.style.display === "none" || shirtTable.style.display === '') {
                fetch('http://localhost:3000/existingShirts')
                    .then(response => response.json())
                    .then(data => {
                        loadHTMLTableShirt(data['data']);
                        shirtTable.style.display = 'block';
                    });
            } else {
                shirtTable.style.display = 'none';
            }
        });
    } else {
        //console.log('Shirt elements not found');
    }
});

// Event listener for fetching youtubers
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.href.includes('http://localhost:3000/youtuber.html')) {
        fetch('http://localhost:3000/existingYoutubers')
            .then(response => response.json())
            .then(data => loadHTMLTableYoutubers(data['data']));
    }
});


/*************************************************************************/
/*                          DISPLAY TABLES                               */
/*************************************************************************/

// Display customer table
function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    console.log(data);
    
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='6' align='center'><em>There's currently no customer information</em></td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ID, Name, Email, Address}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${ID}</td>`;
        tableHtml += `<td>${Name}</td>`;
        tableHtml += `<td>${Email}</td>`;
        tableHtml += `<td>${Address}</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${ID}>Edit</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${ID}>Delete</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}


function loadHTMLTableReturnForm(data) {
    const table = document.querySelector('#listReturnForms tbody');

    console.log('Data received:', data);

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'><em>There's currently no Return form</em></td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(({ ReturnID, CheckerName, ReturnDate, ReasonForReturn, ActionTaken }) => {
        tableHtml += `<tr>
                        <td>${ReturnID}</td>
                        <td>${CheckerName}</td>
                        <td>${formatDate(ReturnDate)}</td>
                        <td>${ReasonForReturn}</td>
                        <td>${ActionTaken}</td>
                      </tr>`;
    });

    table.innerHTML = tableHtml;
}



// Display a wishlist table
function loadHTMLTableWishlist(data) {
    const table = document.querySelector('table tbody');

    console.log(data);
    
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='4' align='center'><em>There's currently no Wishlist information</em></td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ShirtID, CartID, CustomerID, DateAdded}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${ShirtID}</td>`;
        tableHtml += `<td>${CartID}</td>`;
        tableHtml += `<td>${CustomerID}</td>`;
        tableHtml += `<td>${formatDate(DateAdded)}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}


// Display a shirt table
function loadHTMLTableShirt(data) {
    const table = document.querySelector('table tbody');

    console.log(data);
    
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5' align='center'><em>There's currently no Return form</em></td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ShirtID, Size, Color, Deadline, DesignPercentage}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${ShirtID}</td>`;
        tableHtml += `<td>${Size}</td>`;
        
        tableHtml += `<td>${Color}</td>`;
        tableHtml += `<td>${formatDate(Deadline)}</td>`;
        tableHtml += `<td>${DesignPercentage}</td>`;
        
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}


// Display Return Forms
function loadHTMLTableReturnForm(data) {
    const table = document.querySelector('#listReturnForms tbody');

    console.log('Data received:', data);

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'><em>There's currently no Return form</em></td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(({ ReturnID, CheckerName, ReturnDate, ReasonForReturn, ActionTaken }) => {
        tableHtml += `<tr>
                        <td>${ReturnID}</td>
                        <td>${CheckerName}</td>
                        <td>${formatDate(ReturnDate)}</td>
                        <td>${ReasonForReturn}</td>
                        <td>${ActionTaken}</td>
                      </tr>`;
    });

    table.innerHTML = tableHtml;
}

// Display a wishlist table
function loadHTMLTableWishlist(data) {
    const table = document.querySelector('table tbody');

    console.log(data);
    
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='4' align='center'><em>There's currently no Wishlist information</em></td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ShirtID, CartID, CustomerID, DateAdded}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${ShirtID}</td>`;
        tableHtml += `<td>${CartID}</td>`;
        tableHtml += `<td>${CustomerID}</td>`;
        tableHtml += `<td>${formatDate(DateAdded)}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}


// Display a shirt table
function loadHTMLTableShirt(data) {
    const table = document.querySelector('table tbody');

    console.log(data);
    
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5' align='center'><em>There's currently no Return form</em></td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ShirtID, Size, Color, Deadline, DesignPercentage}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${ShirtID}</td>`;
        tableHtml += `<td>${Size}</td>`;
        tableHtml += `<td>${Color}</td>`;
        tableHtml += `<td>${formatDate(Deadline)}</td>`;
        tableHtml += `<td>${DesignPercentage}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

// Display youtubers
function loadHTMLTableYoutubers(data) {
    const table = document.querySelector('#listYoutubers tbody');

    console.log('Data received:', data);

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='3'><em>There's currently no Youtubers.</em></td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(({ YouTuberID, Name, Channel }) => {
        tableHtml += "<tr>";
        tableHtml += `<td>${YouTuberID}</td>`;
        tableHtml += `<td>${Name}</td>`;
        tableHtml += `<td>${Channel}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}