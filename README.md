# Group_project_dbms

# Prerequisites
Before running the project, ensure you have the following prerequisites installed on your system:

1.	Node.js - version 14 or higher.
2.	npm - This is included with Node.js.
3.	MySql- https://dev.mysql.com/downloads/
4.	Visual Studio Code - Used to develop the frontend and backend



# Group Project DBMS Backend

The backend server is developed using Express.js and interacts with a MySQL database. It includes:

CRUD operations for managing customers, shirts, YouTubers, wishlists, purchases, and more.
RESTful API endpoints for various database interactions.
Connection pooling for efficient database access.
Basic error handling and validation checks.


## Prerequisites

Before getting started, ensure you have the following installed:

- Node.js
- MySQL (with a database named `yt_enterprise_dump`)
- npm

## Installation

1. save dbms dump file in your downloaded Mysql workbench

2. Install VS code, create folder in VS code. Name it as "Group_project_dbms"
3. After creating folder, open terminal and install the required Node.js packages: npm install 
4. To interact with Database, run this command:npm install sql
5. Create a file in VS code as server.js, copy and paste the code in  "Backend and CRUD operations" file to server.js file.


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



























