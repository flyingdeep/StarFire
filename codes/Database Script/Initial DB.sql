CREATE TABLE `instant_message` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message` varchar(500) NOT NULL,
  `create_date` date NOT NULL,
  `action` varchar(500) DEFAULT NULL,
  `action_type` varchar(500) DEFAULT NULL,
  `action_parameter` varchar(500) DEFAULT NULL,
  `isdeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`message_id`),
  KEY `ORDERBYCREATEDATE` (`create_date`),
  KEY `USERIDINDEX` (`isdeleted`,`user_id`),
  KEY `ISDELETEDINDEX` (`isdeleted`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `stand_customer_mark` (
  `customer_message_id` int(11) NOT NULL AUTO_INCREMENT,
  `stand_id` int(11) NOT NULL,
  `mark` int(11) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  `create_user_id` int(11) NOT NULL,
  `create_user_name` varchar(30) NOT NULL,
  `create_date` datetime NOT NULL,
  `isdeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`customer_message_id`),
  KEY `ORDERBYCREATEDATE` (`create_date`),
  KEY `STANDINDEX` (`stand_id`,`isdeleted`),
  KEY `CREATEUSERINDEX` (`isdeleted`,`create_user_name`),
  KEY `ISDELETEDINDEX` (`isdeleted`),
  KEY `MARKINDEX` (`mark`,`stand_id`,`isdeleted`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

CREATE TABLE `stand_images` (
  `stand_id` int(11) NOT NULL,
  `image_id` varchar(20) NOT NULL,
  `create_date` datetime NOT NULL,
  `comments` varchar(200) DEFAULT NULL,
  `isdeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`image_id`),
  KEY `ORDERBYCREATEDATE` (`create_date`),
  KEY `IMAGEIDINDEX` (`isdeleted`,`image_id`),
  KEY `STANDIDINDEX` (`isdeleted`,`stand_id`),
  KEY `ISDELETEDINDEX` (`isdeleted`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `stand_info` (
  `stand_id` int(11) NOT NULL,
  `creator_type` char(1) NOT NULL,
  `stand_type` int(11) NOT NULL,
  `stand_name` varchar(50) DEFAULT NULL,
  `type_detail_description` varchar(50) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `create_user_id` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `modify_date` datetime NOT NULL,
  `isactive` bit(1) NOT NULL DEFAULT b'1',
  `mark` decimal(2,1) DEFAULT NULL,
  `position_x` decimal(30,10) NOT NULL,
  `position_y` decimal(30,10) NOT NULL,
  `realtime_location_active` bit(1) NOT NULL DEFAULT b'0',
  `isdeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`stand_id`),
  KEY `ISDELETEDINDEX` (`isdeleted`),
  KEY `STANDIDINDEX` (`isdeleted`,`stand_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `stand_owner_message` (
  `stand_owner_message_id` int(11) NOT NULL AUTO_INCREMENT,
  `stand_id` int(11) NOT NULL,
  `message` varchar(500) DEFAULT NULL,
  `create_date` date NOT NULL,
  `isdeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`stand_owner_message_id`),
  KEY `ISDELETEDINDEX` (`isdeleted`),
  KEY `ORDERBYCREATEDATE` (`create_date`),
  KEY `STANDIDINDEX` (`stand_id`,`isdeleted`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

CREATE TABLE `stand_type` (
  `stand_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(45) NOT NULL,
  `type_parent_id` int(11) NOT NULL,
  `isdeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`stand_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

CREATE TABLE `user_info` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `display_name` varchar(10) DEFAULT NULL,
  `user_name` varchar(30) NOT NULL,
  `image_id` varchar(20) NOT NULL,
  `user_preference` varchar(500) NOT NULL,
  `user_type` char(1) NOT NULL,
  `email` varchar(50) NOT NULL,
  `cell_number` varchar(20) DEFAULT NULL,
  `web_chat` varchar(50) DEFAULT NULL,
  `qq_number` varchar(50) DEFAULT NULL,
  `province_city_area` varchar(100) NOT NULL,
  `createdate` datetime NOT NULL,
  `updatedate` datetime NOT NULL,
  `password` varchar(30) NOT NULL,
  `isdeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  KEY `USERPASSINDEX` (`user_name`,`password`,`isdeleted`),
  KEY `USERNAMEINDEX` (`isdeleted`,`user_name`),
  KEY `ISDELETEDINDEX` (`isdeleted`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

CREATE TABLE `user_link_stand` (
  `user_link_id` int(11) NOT NULL AUTO_INCREMENT,
  `stand_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `isdeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`user_link_id`),
  UNIQUE KEY `StandUserUnique` (`stand_id`,`user_id`),
  KEY `ISDELETEDINDEX` (`isdeleted`),
  KEY `USERIDINDEX` (`user_id`,`isdeleted`),
  KEY `STANDINDEX` (`isdeleted`,`stand_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
