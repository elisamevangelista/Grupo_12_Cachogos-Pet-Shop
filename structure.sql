-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: cachogos_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.25-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `brand` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'PRO PLAN','2022-12-28 21:20:19',NULL),(2,'ROYAL CANIN','2022-12-28 21:20:43',NULL),(3,'EUKANUBA','2022-12-28 21:20:57',NULL),(4,'EXCELLENT','2022-12-28 21:21:20',NULL),(5,'OLD PRINCE','2022-12-28 21:21:44',NULL),(6,'PEDIGREE','2022-12-28 21:22:13',NULL),(7,'DOG CHOW','2022-12-28 21:23:30',NULL),(8,'NUTRIQUE','2022-12-28 21:24:07',NULL),(9,'SIEGER','2022-12-28 21:24:21',NULL),(10,'VITALCAN','2022-12-28 21:24:45',NULL),(11,'KONGO','2022-12-28 21:24:59',NULL),(12,'TETRA','2022-12-28 21:25:16',NULL),(13,'NUTRAFIN','2022-12-28 21:25:31',NULL),(14,'VITAFISH','2022-12-28 21:26:22',NULL),(15,'ZOOTEC','2022-12-28 21:26:34',NULL),(16,'AVECOLOR','2022-12-28 21:26:50',NULL),(17,'ALCON','2022-12-28 21:27:05',NULL),(18,'NUTRIBIZ','2022-12-28 21:28:02',NULL),(19,'EXZOOTIX','2022-12-28 21:28:23',NULL),(20,'NELSONI RANCH','2022-12-28 21:28:38',NULL),(21,'CAT CHOW','2022-12-28 21:29:21',NULL),(22,'METRIVE','2022-12-28 21:29:56',NULL),(23,'CANARIUM PLUS','2022-12-28 21:31:08',NULL),(24,'LABCON','2022-12-28 21:31:25',NULL),(25,'SHULET','2022-12-28 21:31:34',NULL),(26,'PRODAC','2022-12-28 21:31:45',NULL),(27,'DOPHIN','2022-12-28 21:31:57',NULL),(28,'WHISKAS','2022-12-28 21:33:57',NULL),(29,'FELIX','2022-12-28 21:34:41',NULL),(30,'ÜNIK','2022-12-28 21:36:16',NULL);
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_sku` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `quantityItems` int(10) unsigned NOT NULL,
  `sold` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carts_FK` (`product_sku`),
  KEY `carts_FK_1` (`user_id`),
  CONSTRAINT `carts_FK` FOREIGN KEY (`product_sku`) REFERENCES `products` (`sku`),
  CONSTRAINT `carts_FK_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `animalType` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Perro','2022-12-23 21:30:01','2022-12-23 21:30:01',NULL),(2,'Gato','2022-12-23 21:30:15','2022-12-23 21:30:15',NULL),(3,'Pez','2022-12-23 21:30:40','2022-12-23 21:30:40',NULL),(4,'Ave','2022-12-23 21:30:54','2022-12-23 21:30:54',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foods`
--

DROP TABLE IF EXISTS `foods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_sku` int(10) unsigned NOT NULL,
  `weight` int(10) unsigned NOT NULL,
  `cost_x_bag` int(10) unsigned NOT NULL,
  `quotesQuantity` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  `stock` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `foods_FK` (`product_sku`),
  CONSTRAINT `foods_FK` FOREIGN KEY (`product_sku`) REFERENCES `products` (`sku`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foods`
--

LOCK TABLES `foods` WRITE;
/*!40000 ALTER TABLE `foods` DISABLE KEYS */;
INSERT INTO `foods` VALUES (7,3,0,0,0,'2022-12-30 20:09:53','2023-02-09 00:18:07',NULL,0),(8,3,0,0,0,'2022-12-30 20:09:53','2023-02-09 00:18:07',NULL,0),(9,3,0,0,0,'2022-12-30 20:09:53','2023-02-09 00:18:07',NULL,0),(10,4,3,100,1,'2023-02-03 00:08:41','2023-02-03 00:15:59',NULL,0),(11,4,8,500,5,'2023-02-03 00:08:41','2023-02-03 00:16:12',NULL,0),(12,4,15,1000,6,'2023-02-03 00:08:41','2023-02-03 00:16:12',NULL,0),(13,10,0,0,0,'2023-02-09 00:50:14','2023-02-09 00:50:14',NULL,0),(14,10,0,0,0,'2023-02-09 00:50:14','2023-02-09 00:50:14',NULL,0),(15,10,0,0,0,'2023-02-09 00:50:14','2023-02-09 00:50:14',NULL,0),(16,11,20,12000,3,'2023-02-09 00:53:45','2023-02-09 00:53:45',NULL,0),(17,11,2,1500,0,'2023-02-09 00:53:45','2023-02-09 00:53:45',NULL,0),(18,11,7,5000,0,'2023-02-09 00:53:45','2023-02-09 00:53:45',NULL,0),(19,13,10,14000,3,'2023-02-09 01:04:56','2023-02-09 01:04:56',NULL,0),(20,13,2,3000,0,'2023-02-09 01:04:56','2023-02-09 01:04:56',NULL,0),(21,13,7,10000,3,'2023-02-09 01:04:56','2023-02-09 01:04:56',NULL,0),(22,15,0,0,0,'2023-02-09 01:10:54','2023-02-09 01:10:54',NULL,0),(23,15,0,0,0,'2023-02-09 01:10:54','2023-02-09 01:10:54',NULL,0),(24,15,0,0,0,'2023-02-09 01:10:54','2023-02-09 01:10:54',NULL,0),(25,16,0,0,0,'2023-02-09 01:14:24','2023-02-09 01:14:24',NULL,0),(26,16,0,0,0,'2023-02-09 01:14:24','2023-02-09 01:14:24',NULL,0),(27,16,0,0,0,'2023-02-09 01:14:24','2023-02-09 01:14:24',NULL,0);
/*!40000 ALTER TABLE `foods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `sku` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `quotesQuantity` int(10) unsigned DEFAULT NULL,
  `stock` int(10) unsigned NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  `cost` decimal(10,0) DEFAULT NULL,
  `discount` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `subcategory_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`sku`),
  KEY `products_FK` (`subcategory_id`),
  CONSTRAINT `products_FK` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (3,'Comida de pez','Comida de pez - Granulos tropicales',0,45,'2023-02-09 00:57:17',NULL,3000,0,'2022-12-30 20:09:53',3),(4,'Alimento seco','Comida de perro a base de carne y verduras',3,44,'2023-02-09 00:27:40',NULL,0,0,'2023-02-03 00:08:41',5),(5,'Juguete de perro','Hueso para para perro grande',0,3,'2023-02-09 01:18:10',NULL,3242,10,'2023-02-04 00:40:55',5),(6,'Piedras Sanitarias','Piedras Sanitarias - Piedras absorbentes y aglutinantes',0,0,'2023-02-09 00:45:57',NULL,3500,0,'2023-02-08 23:55:09',10),(7,'Rascador','Rascador hilo sisal para gatos',0,7,'2023-02-09 00:41:43',NULL,3500,0,'2023-02-08 23:56:33',6),(8,'Alimento para perro ','Alimento para perro adulto a base de cordero, arroz y vegetales',0,12,'2023-02-09 00:35:50',NULL,15000,0,'2023-02-08 23:57:31',1),(9,'Cucha ','Cucha para perro tamaño grande ',0,5,'2023-02-09 00:45:22',NULL,3500,0,'2023-02-08 23:59:45',9),(10,'Comida pouch ','Comida húmeda a base de atún',0,0,'2023-02-09 00:50:14',NULL,600,0,'2023-02-09 00:50:14',2),(11,'Alimento para perro mediano','Alimento seco a base de carne, arroz y vegetales - perros medianos',0,5,'2023-02-09 00:53:44',NULL,0,0,'2023-02-09 00:53:44',1),(12,'Cama para gatos','Cama para gatos con ventosas para colgar sobre vidrios',0,0,'2023-02-09 00:56:43',NULL,6000,0,'2023-02-09 00:56:43',10),(13,'Alimento para gato','Alimento Seco Fit para control de peso',0,4,'2023-02-09 01:04:56',NULL,0,0,'2023-02-09 01:04:56',2),(14,'Colchon para perro ','Colchon para perro grande',0,0,'2023-02-09 01:08:09',NULL,9500,0,'2023-02-09 01:08:09',9),(15,'Comida de pez','Comida de pez disolución lenta',3,0,'2023-02-09 01:10:54',NULL,7000,0,'2023-02-09 01:10:54',3),(16,'Comida de ave','Comida mix para loros contiene semillas de zapallo y mani con cáscara',0,0,'2023-02-09 01:14:24',NULL,1400,0,'2023-02-09 01:14:24',4);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_brands`
--

DROP TABLE IF EXISTS `products_brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_brands` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `brand_id` int(10) unsigned NOT NULL,
  `product_sku` int(10) unsigned NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `products_brands_FK` (`product_sku`),
  KEY `products_brands_FK_1` (`brand_id`),
  CONSTRAINT `products_brands_FK_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_brands`
--

LOCK TABLES `products_brands` WRITE;
/*!40000 ALTER TABLE `products_brands` DISABLE KEYS */;
INSERT INTO `products_brands` VALUES (3,12,3,'2022-12-30 20:09:53',NULL,'2023-02-09 00:18:07'),(4,16,4,'2023-02-03 00:08:41',NULL,'2023-02-03 00:15:09'),(5,11,5,'2023-02-04 00:40:55',NULL,'2023-02-09 01:18:10'),(6,19,6,'2023-02-08 23:55:10',NULL,'2023-02-08 23:55:10'),(7,9,7,'2023-02-08 23:56:33',NULL,'2023-02-09 00:41:43'),(8,5,8,'2023-02-08 23:57:31',NULL,'2023-02-09 00:35:26'),(9,9,9,'2023-02-08 23:59:45',NULL,'2023-02-09 00:45:22'),(10,1,10,'2023-02-09 00:50:14',NULL,'2023-02-09 00:50:14'),(11,3,11,'2023-02-09 00:53:45',NULL,'2023-02-09 00:53:45'),(12,15,12,'2023-02-09 00:56:43',NULL,'2023-02-09 00:56:43'),(13,8,13,'2023-02-09 01:04:56',NULL,'2023-02-09 01:04:56'),(14,9,14,'2023-02-09 01:08:09',NULL,'2023-02-09 01:08:09'),(15,14,15,'2023-02-09 01:10:54',NULL,'2023-02-09 01:10:54'),(16,15,16,'2023-02-09 01:14:24',NULL,'2023-02-09 01:14:24');
/*!40000 ALTER TABLE `products_brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_images`
--

DROP TABLE IF EXISTS `products_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_sku` int(10) unsigned NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_images_FK` (`product_sku`),
  CONSTRAINT `products_images_FK` FOREIGN KEY (`product_sku`) REFERENCES `products` (`sku`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_images`
--

LOCK TABLES `products_images` WRITE;
/*!40000 ALTER TABLE `products_images` DISABLE KEYS */;
INSERT INTO `products_images` VALUES (7,3,'imagen-1675901887303.jpg','2022-12-30 20:09:53','2023-02-09 00:18:07',NULL),(8,3,'imagen-1675901887303.jpg','2022-12-30 20:09:53','2023-02-09 00:18:07',NULL),(9,3,'imagen-1675901887303.jpg','2022-12-30 20:09:53','2023-02-09 00:18:07',NULL),(10,4,'imagen-1675383123377.jpg','2023-02-03 00:08:41','2023-02-03 00:14:43',NULL),(11,5,'imagen-1675905490490.jpg','2023-02-04 00:40:55','2023-02-09 01:18:10',NULL),(12,6,'imagen-1675900509761.jpg','2023-02-08 23:55:10','2023-02-08 23:55:10',NULL),(13,7,'imagen-1675903303589.jpg','2023-02-08 23:56:33','2023-02-09 00:41:43',NULL),(14,8,'imagen-1675902926824.jpg','2023-02-08 23:57:31','2023-02-09 00:35:26',NULL),(15,9,'imagen-1675903522614.jpg','2023-02-08 23:59:45','2023-02-09 00:45:22',NULL),(16,10,'imagen-1675903814740.jpg','2023-02-09 00:50:14','2023-02-09 00:50:14',NULL),(17,11,'imagen-1675904024808.jpg','2023-02-09 00:53:44','2023-02-09 00:53:44',NULL),(18,12,'imagen-1675904203219.jpg','2023-02-09 00:56:43','2023-02-09 00:56:43',NULL),(19,13,'imagen-1675904696458.jpg','2023-02-09 01:04:56','2023-02-09 01:04:56',NULL),(20,14,'imagen-1675904889164.jpg','2023-02-09 01:08:09','2023-02-09 01:08:09',NULL),(21,15,'imagen-1675905054073.jpg','2023-02-09 01:10:54','2023-02-09 01:10:54',NULL),(22,16,'imagen-1675905264403.jpg','2023-02-09 01:14:24','2023-02-09 01:14:24',NULL);
/*!40000 ALTER TABLE `products_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `isbyweight` tinyint(3) unsigned DEFAULT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subcategories_FK` (`category_id`),
  CONSTRAINT `subcategories_FK` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Alimentos',1,1,'2022-12-26 16:03:30','2022-12-26 16:05:10',NULL),(2,'Alimentos',1,2,'2022-12-26 16:05:36','2022-12-26 16:05:36',NULL),(3,'Alimentos',1,3,'2022-12-26 16:05:53','2022-12-26 16:05:53',NULL),(4,'Alimentos',1,4,'2022-12-26 16:06:04','2022-12-26 16:06:04',NULL),(5,'Juguetes',0,1,'2022-12-26 16:06:31','2022-12-26 16:06:31',NULL),(6,'Juguetes',0,2,'2022-12-26 16:06:39','2022-12-26 16:06:39',NULL),(7,'Juguetes',0,3,'2022-12-26 16:07:02','2022-12-26 16:07:02',NULL),(8,'Juguetes',0,4,'2022-12-26 16:07:15','2022-12-26 16:07:15',NULL),(9,'Camas e indumentaria',0,1,'2022-12-26 16:07:57','2022-12-26 16:07:57',NULL),(10,'Camas e indumentaria',0,2,'2022-12-26 16:08:11','2022-12-26 16:08:11',NULL),(11,'Camas e indumentaria',0,3,'2022-12-26 16:08:21','2022-12-26 16:08:21',NULL),(12,'Camas e indumentaria',0,4,'2022-12-26 16:08:34','2022-12-26 16:08:34',NULL),(13,'Paseos y viajes',0,1,'2022-12-26 16:08:56','2022-12-26 16:08:56',NULL),(14,'Paseos y viajes',0,2,'2022-12-26 16:09:07','2022-12-26 16:09:07',NULL),(15,'Paseos y viajes',0,3,'2022-12-26 16:09:14','2022-12-26 16:09:14',NULL),(16,'Paseos y viajes',0,4,'2022-12-26 16:09:26','2022-12-26 16:09:26',NULL);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(128) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  `userType` enum('user','admin') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jonathan','Gira','','image-1672434093751.jpg','$2a$10$9sc9mQrF9pOAC7rKfRxrLOHYBk/S944OzbJb4SznGtp9.qzXFKO02','2022-12-30 21:01:33','2022-12-30 21:01:33',NULL,'user'),(2,'Martin','Gira','martin1999@gmail.com','image-1672783967667.jpg','$2a$10$wf6oYtsMHLRjJAI.XwM5hOkqYyzkaHvu9gEjuBoOx6WCAc8K.w0BC','2023-01-03 22:12:47','2023-01-03 22:12:47',NULL,'user'),(3,'tomas','perez','alfaro77@gmail.com','image-1674003231109.jpg','$2a$10$jrofPWcj2Mh.GTkfm8HD2uGszZVKfbzzhyi6Nv.jbvGC7BhHfB9Z6','2023-01-03 22:25:52','2023-01-18 00:53:51',NULL,'user'),(4,'ana','gomez','anag@gmail.com','image-1675207709046.jpg','$2a$10$ZmixQo3ouKCcu1IZ7EpDoOQoByT83epXJuYid33d3iwYQXWrVNBqe','2023-01-31 23:28:29','2023-01-31 23:28:29',NULL,'user'),(5,'juan','pelotas','juanpelotas1@gmail.com','image-1675374814030.jpg','$2a$10$SH1C64Gi.GTgPEL3aN681.EN4NdcC9ufNlARUopUkYxs/Xm44eKUy','2023-02-02 21:53:34','2023-02-02 21:53:34',NULL,'user'),(6,'jorge','garcia','jorgegarcia@gmail.com','image-1675374914928.jpg','$2a$10$SWpV30pDknt5Q6iciOxLpunVEbRvtGxzmKFcfIKYQi89elI.Y0i7S','2023-02-02 21:55:15','2023-02-02 22:27:04',NULL,'admin'),(7,'sara','wu','sarawu@gmail.com','image-1675899761251.jpeg','$2a$10$BGodSobqm2qaKd86tvsya.XaTCBmdggDi2aB2VBkWnF3vyVm9MsEu','2023-02-08 23:42:42','2023-02-08 23:44:02',NULL,'admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cachogos_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-08 22:21:02
