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



# What is implemented/working so far
    - add (customer, shirt, youtuber, return_form, endorsement, buy, add-to-wishlist, quality_control_form(**problem with checker name being blank in the DB when added(maybe a restriction?)** ))
    - edit (customer, shirt, youtuber, ) 



# What is NOT implemented/working so far
    -any check button
    -all delete operation
    -check-shirt and returned tables (not sure how to implement them)
    
    



# Extra notes
1. Might be better to create a single function for each CRUD (add/delete/update) instead of multiple crud for each and every entity/table but im having trouble doing that so I'll handle it like this for now 

2. Also for the primary key such as ID and other IDs, they might need to be incremented as they are entered in the database but to do that I have to remove all the existing restrictions and dependencies but
I dont want to mess up the database so for now i have them included in the forms to be inputted in.

3. Im getting this when i try to implement the delete customer 'Cannot delete or update a parent row: a foreign key constraint fails (`yt_enterprise_dump`.`add-to-wishlist`, CONSTRAINT `shirt_cart_ibfk_3` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`ID`))', so I think we have to remove the restrictions again before we implement this or do a cascading delete or soft delete

4. Some restrictions
    -buy (checks if customerID and shirtID exist first before inserting into the database and if not dont insert)
    -add wishlist(checks if customerID and shirtID exist if they dont then stop the insert, check if cartID already exist in wishlist if it does then stop the insert)
    -add endorsement(checks if youtuberid and shirtid exist and if not stop the insert, also check for duplicate entries before entering)

5. I know that the website should not be able to add/edit/ modify the database this much but im not sure which ones are needed to be implemented so I tried to be more inclusive as it is much easier to 
remove a feature than to add new ones.

6. Im not sure what else should go in the home page (index.html)

7. I think that the return_form and returned tables should be combined



























