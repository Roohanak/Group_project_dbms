## Group Project DBMS
# Overview
This project is a Database Management System (DBMS) for managing a business related to
customers, shirts, YouTubers, and other entities. It consists of a Node.js backend server that
interacts with a MySQL database, providing a range of API endpoints for Create, Read, Update,
and Delete (CRUD) operations.


# Prerequisites
Before running the project, ensure the following prerequisites are installed on your system:
● Node.js (version 14 or higher)
● MySQL (https://dev.mysql.com/downloads/)
● Visual Studio Code (or any other IDE for developing the frontend and backend)
● npm (usually included with Node.js)

## Backend Overview
The backend server is developed using Express.js and interacts with a MySQL database. It
includes:
● CRUD operations for managing customers, shirts, YouTubers, wishlists, purchases, and
more.
● RESTful API endpoints for various database interactions.
● Connection pooling for efficient database access.
● Basic error handling and validation checks.

# Installation
Setting Up MySQL
1. Download and install MySQL from the provided link.
2. Create a database named yt_enterprise_dump in your MySQL Workbench.
Setting Up the Node.js Backend
1. Install Visual Studio Code (VS Code) from its official website.
2. Open VS Code and create a new folder named Group_project_dbms.
3. Open the terminal in VS Code and execute the following command to install required
Node.js packages:
4. npm install
5. Install MySQL driver for Node.js:
6. npm install mysql

   
# Configuration
Update the MySQL connection details in the server.js file:
javascript
const pool = mysql.createPool({ host: "localhost", // Update with your host_name user: "root", //
Update with your MySQL username password: "YOUR_MYSQL_PASSWORD", // Update with
your MySQL password database: "yt_enterprise_dump" });

# Usage
Starting the Server
Run the following command in the terminal to start the server:
node server.js
The server will start and listen on port 3000.

# Accessing the API
You can interact with the database using the provided API endpoints. Here are some examples:

● Get All Customers: Retrieve a list of all customers with a GET request to
http://localhost:3000/existingCustomers.

● Get Specific Customer: Retrieve a specific customer by ID with a GET request to
http://localhost:3000/customers/{id} (replace {id} with the actual customer ID).

● Add New Customer: Add a new customer with a POST request to
http://localhost:3000/customers.

● Update Customer: Update a customer's information with a PUT request to
http://localhost:3000/customers/{id}.

● Delete Customer: Remove a customer with a DELETE request to
http://localhost:3000/customers/{id}.













