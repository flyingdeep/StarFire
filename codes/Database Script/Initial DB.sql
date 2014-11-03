CREATE TABLE `stand`.`user_info` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `display_name` VARCHAR(10) NULL,
  `user_name` VARCHAR(10) NOT NULL,
  `Image_Id` VARCHAR(20) NOT NULL,
  `user_preference` VARCHAR(500) NOT NULL,
  `user_type` CHAR(1) NOT NULL,
  `cell_number` VARCHAR(20) NULL,
  `web_chart` VARCHAR(50) NULL,
  `qq_number` VARCHAR(50) NULL,
  `province_city_area` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC))
ENGINE = MyISAM;



CREATE TABLE `stand`.`stand_info` (
  `stand_id` INT NOT NULL AUTO_INCREMENT,
  `stand_type` CHAR(1) NOT NULL,
  `stand_name` VARCHAR(50) NULL,
  `type_detail_description` VARCHAR(50) NULL,
  `description` VARCHAR(2000) NULL,
  `create_user_id` INT NOT NULL,
  `create_date` DATETIME NOT NULL,
  `modify_date` DATETIME NOT NULL,
  `isactive` CHAR(1) NOT NULL DEFAULT '1',
  `mark` DECIMAL(2,1) NULL,
  `province_city_area` VARCHAR(100) NULL,
  `realtime_location_active` CHAR(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`stand_id`),
  UNIQUE INDEX `stand_id_UNIQUE` (`stand_id` ASC))
ENGINE = MyISAM;



CREATE TABLE `stand_customer_mark` (
  `customer_message_id` int(11) NOT NULL AUTO_INCREMENT,
  `stand_id` int(11) NOT NULL,
  `mark` int(11) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  `create_user_id` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`customer_message_id`),
  UNIQUE KEY `customer_message_id_UNIQUE` (`customer_message_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


CREATE TABLE `stand`.`stand_realtime_location` (
  `stand_id` INT NOT NULL,
  `realtime_location_x` DECIMAL(30,10) NOT NULL,
  `realtime_location_y` DECIMAL(30,10) NOT NULL,
  `create_date` DATETIME NOT NULL,
  PRIMARY KEY (`stand_id`))
ENGINE = MyISAM;


CREATE TABLE `stand`.`stand_owner_message` (
  `stand_owner_message_id` INT NOT NULL AUTO_INCREMENT,
  `stand_id` INT NOT NULL,
  `message` VARCHAR(500) NULL,
  `create_date` DATE NOT NULL,
  PRIMARY KEY (`stand_owner_message_id`),
  UNIQUE INDEX `stand_owner_message_id_UNIQUE` (`stand_owner_message_id` ASC));


  CREATE TABLE `stand`.`stand_type` (
  `stand_type_id` INT NOT NULL AUTO_INCREMENT,
  `type_name` VARCHAR(45) NOT NULL,
  `type_parent_id` INT NOT NULL,
  PRIMARY KEY (`stand_type_id`),
  UNIQUE INDEX `stand_type_id_UNIQUE` (`stand_type_id` ASC));


CREATE TABLE `stand`.`stand_location` (
  `stand_location_id` INT NOT NULL AUTO_INCREMENT,
  `stand_id` INT NOT NULL,
  `location_x` DECIMAL(30,10) NOT NULL,
  `location_y` DECIMAL(30,10) NOT NULL,
  `create_date` DATETIME NOT NULL,
  `week_workingday` VARCHAR(20) NULL,
  `working_time` VARCHAR(200) NULL,
  PRIMARY KEY (`stand_location_id`),
  UNIQUE INDEX `stand_location_id_UNIQUE` (`stand_location_id` ASC))
ENGINE = MyISAM;
