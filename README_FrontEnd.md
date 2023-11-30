# Frontend
This README provides instructions on how to access the website through a local server to interact with our database.

## How to access:
1. Make sure you complete the prerequisites, installations, and configurations before you can access the user interface. (Refer to README.md)
2. Open a new terminal in VSCode and type "node server.js"
3. Once you see "Server is running on port 3000," you're connected to the server
4. Open your web browser and type in "localhost:3000"

You have successfully accessed our website!

## Information
- Remember to replace the user and password you created into const pool = mysql.createPool({...}) in server.js to access the database with the frontend.
- There are five tabs as seen on the top navigation bar. Each represents a different source table in the yt_enterprise_dump database that users are retrieving from.
- By clicking on a button, the user may add, update, or delete based on information submitted on the form.
- Existing sections will display available information that's found in the database.


























