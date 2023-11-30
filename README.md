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

1. save dbms dump file in your downloaded Mysql workbench

2. Install VS code, create folder in VS code. Name it as "Group_project_dbms"
3. After creating folder, open terminal and install the required Node.js packages: npm install 
4. To interact with Database, run this command:npm install sql



## Configuration



# Change database in server.js

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

To access the API and interact with the database:

•	Go to the Home page:

http://localhost:3000/index

•	Go to the Customer page:

http://localhost:3000/customer





























