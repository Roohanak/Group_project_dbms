CREATE DATABASE  IF NOT EXISTS `yt_enterprise_dump` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `yt_enterprise_dump`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: yt_enterprise_dump
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `add_to_wishlist`
--

DROP TABLE IF EXISTS `add_to_wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `add_to_wishlist` (
  `ShirtID` int DEFAULT NULL,
  `CartID` int NOT NULL,
  `ID` int DEFAULT NULL,
  `DateAdded` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`CartID`),
  KEY `ShirtID` (`ShirtID`),
  KEY `ID` (`ID`),
  CONSTRAINT `add_to_wishlist_ibfk_1` FOREIGN KEY (`ShirtID`) REFERENCES `shirt` (`ShirtID`),
  CONSTRAINT `add_to_wishlist_ibfk_2` FOREIGN KEY (`ID`) REFERENCES `customer` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `add_to_wishlist`
--

LOCK TABLES `add_to_wishlist` WRITE;
/*!40000 ALTER TABLE `add_to_wishlist` DISABLE KEYS */;
INSERT INTO `add_to_wishlist` VALUES (1,1001,1,'2023-11-22 12:30:00'),(2,1002,2,'2023-11-22 13:45:00'),(3,1003,3,'2023-11-22 14:30:00'),(4,1004,4,'2023-11-22 15:15:00'),(5,1005,5,'2023-11-22 16:00:00'),(6,1006,6,'2023-11-22 17:30:00'),(7,1007,7,'2023-11-22 18:15:00');
/*!40000 ALTER TABLE `add_to_wishlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buy`
--

DROP TABLE IF EXISTS `buy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buy` (
  `CustomerID` int NOT NULL,
  `ShirtID` int NOT NULL,
  `PurchaseDate` date DEFAULT NULL,
  PRIMARY KEY (`CustomerID`,`ShirtID`),
  KEY `ShirtID` (`ShirtID`),
  CONSTRAINT `customer_shirt_purchase_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`ID`),
  CONSTRAINT `customer_shirt_purchase_ibfk_2` FOREIGN KEY (`ShirtID`) REFERENCES `shirt` (`ShirtID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buy`
--

LOCK TABLES `buy` WRITE;
/*!40000 ALTER TABLE `buy` DISABLE KEYS */;
/*!40000 ALTER TABLE `buy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `check-shirt`
--

DROP TABLE IF EXISTS `check-shirt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `check-shirt` (
  `QualityControlID` int NOT NULL,
  `ShirtID` int NOT NULL,
  `CustomerID` int NOT NULL,
  PRIMARY KEY (`QualityControlID`),
  KEY `ShirtID` (`ShirtID`),
  KEY `qa_customer_id_idx` (`CustomerID`),
  CONSTRAINT `qa_customer_id` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`ID`),
  CONSTRAINT `quality_control_shirt_ibfk_1` FOREIGN KEY (`QualityControlID`) REFERENCES `quality_control_form` (`QualityControlID`),
  CONSTRAINT `quality_control_shirt_ibfk_2` FOREIGN KEY (`ShirtID`) REFERENCES `shirt` (`ShirtID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `check-shirt`
--

LOCK TABLES `check-shirt` WRITE;
/*!40000 ALTER TABLE `check-shirt` DISABLE KEYS */;
/*!40000 ALTER TABLE `check-shirt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `ID` int NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'John','john@gmail.com','123 Main Street'),(2,'Eva','eva@hotmail.com','456 Oak Avenue'),(3,'Ayesha','ayesha@yahoo.com','789 Elm Drive'),(4,'Sam','sam@gmail.com','101 Pine Road'),(5,'Rahul','rahul@hotmail.com','202 Cedar Lane'),(6,'Ali','ali@yahoo.com','303 Maple Court'),(7,'Frank','frank@gmail.com','404 Birch Street');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endorsement`
--

DROP TABLE IF EXISTS `endorsement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endorsement` (
  `YouTuberID` int NOT NULL,
  `ShirtID` int NOT NULL,
  PRIMARY KEY (`YouTuberID`,`ShirtID`),
  KEY `ShirtID` (`ShirtID`),
  CONSTRAINT `youtuber_endorsement_ibfk_2` FOREIGN KEY (`ShirtID`) REFERENCES `shirt` (`ShirtID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endorsement`
--

LOCK TABLES `endorsement` WRITE;
/*!40000 ALTER TABLE `endorsement` DISABLE KEYS */;
/*!40000 ALTER TABLE `endorsement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quality_control_form`
--

DROP TABLE IF EXISTS `quality_control_form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quality_control_form` (
  `QualityControlID` int NOT NULL,
  `CheckerName` varchar(45) DEFAULT NULL,
  `InspectionDate` date DEFAULT NULL,
  `QualityRating` int DEFAULT NULL,
  `QualityIssues` text,
  PRIMARY KEY (`QualityControlID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quality_control_form`
--

LOCK TABLES `quality_control_form` WRITE;
/*!40000 ALTER TABLE `quality_control_form` DISABLE KEYS */;
INSERT INTO `quality_control_form` VALUES (1,'Checker 1','2023-01-15',4,'Minor scratches on the surface'),(2,'Checker 2','2023-02-20',3,'Inconsistent color in some areas'),(3,'Checker 3','2023-03-10',5,'No issues found'),(4,'Checker 4','2023-04-05',2,'Missing components'),(5,'Checker 5','2023-05-12',4,'Slight misalignment of parts'),(6,'Checker 6','2023-06-08',1,'Significant structural defects'),(7,'Checker 7','2023-07-23',5,'Excellent quality, no issues detected');
/*!40000 ALTER TABLE `quality_control_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `return_form`
--

DROP TABLE IF EXISTS `return_form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `return_form` (
  `ReturnID` int NOT NULL,
  `CheckerName` varchar(45) DEFAULT NULL,
  `ReturnDate` date DEFAULT NULL,
  `ReasonForReturn` text,
  `ActionTaken` text,
  PRIMARY KEY (`ReturnID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `return_form`
--

LOCK TABLES `return_form` WRITE;
/*!40000 ALTER TABLE `return_form` DISABLE KEYS */;
INSERT INTO `return_form` VALUES (1,'CheckerA','2023-01-08','Wrong size','Refund processed'),(2,'CheckerB','2023-02-12','Defective product','Replacement sent'),(3,'CheckerC','2023-03-18','Changed mind','Refund issued'),(4,'CheckerA','2023-04-22','Damaged during shipping','Exchange arranged'),(5,'CheckerB','2023-05-28','Not as described','Refund processed'),(6,'CheckerC','2023-07-02','Received wrong item','Replacement sent'),(7,'CheckerA','2023-08-07','Poor quality','Refund processed');
/*!40000 ALTER TABLE `return_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `returned`
--

DROP TABLE IF EXISTS `returned`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `returned` (
  `ReturnID` int NOT NULL,
  `ShirtID` int NOT NULL,
  `CustomerID` int NOT NULL,
  PRIMARY KEY (`ReturnID`),
  KEY `ShirtID` (`ShirtID`),
  KEY `returned_items_customerID_idx` (`CustomerID`),
  CONSTRAINT `returned_items_customerID` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`ID`),
  CONSTRAINT `returned_items_shirt_ibfk_1` FOREIGN KEY (`ReturnID`) REFERENCES `return_form` (`ReturnID`),
  CONSTRAINT `returned_items_shirt_ibfk_2` FOREIGN KEY (`ShirtID`) REFERENCES `shirt` (`ShirtID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `returned`
--

LOCK TABLES `returned` WRITE;
/*!40000 ALTER TABLE `returned` DISABLE KEYS */;
/*!40000 ALTER TABLE `returned` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shirt`
--

DROP TABLE IF EXISTS `shirt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shirt` (
  `ShirtID` int NOT NULL,
  `Size` varchar(10) DEFAULT NULL,
  `Color` varchar(20) DEFAULT NULL,
  `Deadline` date DEFAULT NULL,
  `DesignPercentage` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`ShirtID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shirt`
--

LOCK TABLES `shirt` WRITE;
/*!40000 ALTER TABLE `shirt` DISABLE KEYS */;
INSERT INTO `shirt` VALUES (1,'Medium','Blue','2023-01-15',75.50),(2,'Large','Red','2023-02-20',90.25),(3,'Small','Green','2023-03-10',60.75),(4,'X-Large','Black','2023-04-05',80.00),(5,'Medium','White','2023-05-12',95.75),(6,'Large','Yellow','2023-06-08',70.25),(7,'Small','Purple','2023-07-23',85.00);
/*!40000 ALTER TABLE `shirt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `youtuber`
--

DROP TABLE IF EXISTS `youtuber`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `youtuber` (
  `YouTuberID` int NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Channel` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`YouTuberID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `youtuber`
--

LOCK TABLES `youtuber` WRITE;
/*!40000 ALTER TABLE `youtuber` DISABLE KEYS */;
INSERT INTO `youtuber` VALUES (1,'YouTuber1','FashionReview'),(2,'YouTuber2','GamingWorld'),(3,'YouTuber3','TechUnboxing'),(4,'YouTuber4','CookingDelights'),(5,'YouTuber5','TravelExplorer'),(6,'YouTuber6','FitnessFreak'),(7,'YouTuber7','DIYMaster');
/*!40000 ALTER TABLE `youtuber` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-22 18:50:16
