# README - yt_enterprise_dump Database

This README provides instructions for setting up and using the `yt_enterprise_dump.sql` MySQL database along with the provided SQL dump file.

## Table of Contents

1. [Database Overview](#database-overview)
2. [Prerequisites](#prerequisites)
3. [Importing the Database](#importing-the-database)
4. [Using the Database](#using-the-database)
5. [Troubleshooting](#troubleshooting)

## Database Overview

The `yt_enterprise_dump` database contains information related to the YT-Shirts enterprise, as described in the project documentation.

## Prerequisites

To work with the `yt_enterprise_dump` database, you'll need:

- MySQL installed on your system.
- Appropriate MySQL user credentials (username and password).

## Importing the Database

1. Open your system's command prompt or terminal.

2. Navigate to the directory where you have saved the `yt_enterprise_dump.sql` file.

3. Run the following command to import the database:

   bash
   mysql -u your_username -p -D your_database < yt_enterprise_dump.sql

or 

after saving file in your directory, open your mysql workbench and follow these steps:
"file" > import > reverse engineer SQL script > select file "yt_enterprise_dump" > Run the Single Transaction file that you just uploaded.

Note: our file name and database name is same: "yt_enterprise_dump"
