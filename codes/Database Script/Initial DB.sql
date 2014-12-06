CREATE TABLE IF NOT EXISTS `stand`.`user_info` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `display_name` varchar(10) DEFAULT NULL,
  `password` varchar(30) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `image_id` varchar(20) NOT NULL,
  `user_preference` varchar(500) NOT NULL,
  `user_type` char(1) NOT NULL,
  `cell_number` varchar(20) DEFAULT NULL,
  `web_chart` varchar(50) DEFAULT NULL,
  `qq_number` varchar(50) DEFAULT NULL,
  `province_city_area` varchar(100) NOT NULL,
  `createdate` datetime NOT NULL,
  `updatedate` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;




CREATE TABLE IF NOT EXISTS  `stand`.`stand_info` (
  `stand_id` INT NOT NULL ,
  `creator_type` int NOT NULL,
  `stand_type` int NOT NULL,
  `stand_name` VARCHAR(50) NULL,
  `type_detail_description` VARCHAR(50) NULL,
  `description` VARCHAR(2000) NULL,
  `create_user_id` INT NOT NULL,
  `create_date` DATETIME NOT NULL,
  `modify_date` DATETIME NOT NULL,
  `isactive` CHAR(1) NOT NULL DEFAULT '1',
  `mark` DECIMAL(2,1) NULL,
  `position_x` DECIMAL(30,10) NOT NULL,
  `position_y` DECIMAL(30,10) NOT NULL,
  `realtime_location_active` CHAR(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`stand_id`),
  UNIQUE INDEX `stand_id_UNIQUE` (`stand_id` ASC))
ENGINE = MyISAM;



CREATE TABLE IF NOT EXISTS  `stand_customer_mark` (
  `customer_message_id` int(11) NOT NULL AUTO_INCREMENT,
  `stand_id` int(11) NOT NULL,
  `mark` int(11) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  `create_user_id` int(11) NOT NULL,
  `create_user_name` varchar(10) NOT NULL,  
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`customer_message_id`),
  UNIQUE KEY `customer_message_id_UNIQUE` (`customer_message_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS  `stand`.`stand_realtime_location` (
  `stand_id` INT NOT NULL,
  `realtime_location_x` DECIMAL(30,10) NOT NULL,
  `realtime_location_y` DECIMAL(30,10) NOT NULL,
  `create_date` DATETIME NOT NULL,
  PRIMARY KEY (`stand_id`))
ENGINE = MyISAM;


CREATE TABLE IF NOT EXISTS  `stand`.`stand_owner_message` (
  `stand_owner_message_id` INT NOT NULL AUTO_INCREMENT,
  `stand_id` INT NOT NULL,
  `message` VARCHAR(500) NULL,
  `create_date` DATE NOT NULL,
  PRIMARY KEY (`stand_owner_message_id`),
  UNIQUE INDEX `stand_owner_message_id_UNIQUE` (`stand_owner_message_id` ASC));


  CREATE TABLE IF NOT EXISTS  `stand`.`stand_type` (
  `stand_type_id` INT NOT NULL AUTO_INCREMENT,
  `type_name` VARCHAR(45) NOT NULL,
  `type_parent_id` INT NOT NULL,
  PRIMARY KEY (`stand_type_id`),
  UNIQUE INDEX `stand_type_id_UNIQUE` (`stand_type_id` ASC));


CREATE TABLE IF NOT EXISTS  `stand`.`user_link_stand` (
  `stand_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `create_date` DATETIME NOT NULL,
  PRIMARY KEY (`stand_id`, `user_id`))
ENGINE = MyISAM;


CREATE TABLE IF NOT EXISTS  `stand`.`instant_message` (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `message` VARCHAR(500) NOT NULL,
  `create_date` DATE NOT NULL,
  `action` VARCHAR(500) NULL,
  `action_type` VARCHAR(500) NULL,
  `action_parameter` VARCHAR(500) NULL,
  PRIMARY KEY (`message_id`))
ENGINE = MyISAM;


CREATE TABLE IF NOT EXISTS  `stand`.`stand_images` (
  `user_id` INT NOT NULL,
  `image_id` VARCHAR(20) NOT NULL,
  `create_date` DATETIME NOT NULL,
  `comments` VARCHAR(200) NULL,
  PRIMARY KEY (`user_id`, `image_id`))
ENGINE = MyISAM;

