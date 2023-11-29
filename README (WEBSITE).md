# Group_project_dbms

#Access the website


    -Make sure you have the right database info in your server.js 
    const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",              // ur password
    database: "yt_enterprise_dump"    // ur database name});

    -run node server.js in your IDE
    -open localhost in your browser



# What is implemented/working 
    - Add customer , Add shirt , Add return-form , Add Quality Control Form, Add wishlist , Add endorsement, buy
    - Edit customer, Edit shirt , Edit Youtuber
    -Show customer table, Show return form table, Show Shirt table, Show wishlist table




#Extra notes

1. Some restrictions
    -buy (checks if customerID and shirtID exist first before inserting into the database and if not dont insert)
    -add wishlist(checks if customerID and shirtID exist if they dont then stop the insert, check if cartID already exist in wishlist if it does then stop the insert)
    -add endorsement(checks if youtuberid and shirtid exist and if not stop the insert, also check for duplicate entries before entering)

































