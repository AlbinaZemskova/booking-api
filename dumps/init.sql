CREATE DATABASE IF NOT EXISTS `booking`;

GRANT ALL ON `booking`.* TO 'root'@'%';
FLUSH PRIVILEGES;

use booking;

CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `role` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `users_UN` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `rooms` (
  `RoomID` int NOT NULL AUTO_INCREMENT,
  `DataOwnerID` int DEFAULT NULL,
  PRIMARY KEY (`RoomID`),
  KEY `rooms_FK` (`DataOwnerID`),
  CONSTRAINT `rooms_FK` FOREIGN KEY (`DataOwnerID`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `room_attributes` (
  `RoomAttributesID` int NOT NULL AUTO_INCREMENT,
  `RoomID` int NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `roomType` varchar(100) DEFAULT NULL,
  `price` float NOT NULL,
  `isAvailable` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`RoomAttributesID`),
  KEY `room_attributes_FK` (`RoomID`),
  CONSTRAINT `room_attributes_FK` FOREIGN KEY (`RoomID`) REFERENCES `rooms` (`RoomID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `room_attributes` (RoomID, description, price, roomType, isAvailable) VALUES
    (1, 'Single room with city view', 100, 'Luxary', 1),
    (2, 'Double room with garden view', 200, 'Deluxe', 1),
    (3, 'Suite with sea view', 250, 'Luxury', 1),
    (4, 'Family room with pool access', 300, 'Family', 1),
    (5, 'Penthouse with panoramic view', 500, 'Luxury', 1),
    (6, 'Chalet with mountain view', 1000, 'Family'),
    (7, 'Executive room with spa access', 550, 'Deluxe');
