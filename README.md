# Group_project_dbms

# Prerequisites
Before running the project, ensure you have the following prerequisites installed on your system:

1.	Node.js - version 14 or higher.
2.	npm - This is included with Node.js.
3.	MySql- https://dev.mysql.com/downloads/
4.	Visual Studio Code - Used to develop the frontend and backend



# Group Project DBMS Backend

This is the backend server for the Group Project Database Management System (DBMS). It provides API endpoints to interact with the database.

## Prerequisites

Before getting started, ensure you have the following installed:

- Node.js
- MySQL (with a database named `yt_enterprise_dump`)
- npm

## Installation

1. Clone this repository to your local machine.

2. Navigate to the project directory:

   ```bash
   cd Group_project_dbms/backend
3. Install the required Node.js packages: npm install
4. Import the Database, run this command:

mysql -u [your_mysql_username] -p yt_enterprise < yt_enterprise_dump.sql // replace 'your_mysql_username' with your actual username .

## Configuration

Make sure to update the MySQL connection details in the Backend and CRUD operation file and rename it with 'server.js' in VS code, specifically:

const pool = mysql.createPool({
    host: "localhost", //your host_name
    user: "root", // your_username
    password: "YOUR_MYSQL_PASSWORD", //your password
    database: "yt_enterprise"
});

## Usage


1. Start the server, run this code:
   node server.js

2. Accessing the API

To access the API and interact with the database, you can make HTTP requests to the following endpoints:

•	Get All Customers:
To retrieve a list of all customers, make a GET request to:
http://localhost:3000/customers

•	Get a Specific Customer:
To retrieve a specific customer by their ID, make a GET request to:
http://localhost:3000/customers/{3}



























