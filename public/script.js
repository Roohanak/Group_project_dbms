document.getElementById('addButton').addEventListener('click', function() {
    console.log("Add button clicked"); 
    document.getElementById('addButton').style.display = 'none';
    document.getElementById('add-customer-tab').style.display = 'block';
});

document.getElementById('add-customer-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;

    fetch('/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ID: id, Name: name, Email: email, Address: address }),
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 409) {
                // Handle ID taken error
                alert("ID taken. Please try a different ID.");
                return;
            } else {
                // Handle other errors
                alert("An error occurred. Please try again later.");
                return;
            }
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            console.log('Success:', data);
            loadCustomers();
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

function loadCustomers() {
    fetch('/customers')
    .then(response => response.json())
    .then(data => {
        var customerList = document.getElementById('customer-list');
        customerList.innerHTML = '';
        data.forEach(function(customer) {
            var li = document.createElement('li');
            li.textContent = customer.Name + ' (' + customer.Email + ')';
            customerList.appendChild(li);
        });
    });
}

// Initial load of customers when the page is loaded
loadCustomers();
