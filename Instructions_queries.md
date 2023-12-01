## Instructions tp run Sql Queries:

After following installation and dumping MYSQL file steps written in "yt_enterprise Database-Readme.txt", you just need to run the Single Transaction file(Script) and run the following queries:

1. -- Retrieve customers with email domains 'gmail.com':
SELECT * FROM customer WHERE Email LIKE '%gmail.com%';

3. – Retrieve YouTubers with 'Tech' in their channel name:
SELECT * FROM youtuber WHERE Channel LIKE '%Tech%';

4. – Retrieve shirts with a deadline before '2023-05-01':
SELECT * FROM shirt WHERE Deadline < '2023-05-01';

4.--Retrieve forms where action taken is 'Replacement sent':
SELECT * FROM return_form WHERE ActionTaken = 'Replacement sent';

5. -- Retrieve Shirt Information with Quality Control Ratings:
SELECT s.ShirtID, s.Size, s.Color, s.Deadline, s.DesignPercentage, q.QualityRating, q.QualityIssues
FROM shirt s
LEFT JOIN quality_control_form q ON s.ShirtID = q.QualityControlID;


