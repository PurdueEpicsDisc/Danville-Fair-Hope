-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Nov 13, 2014 at 05:52 PM
-- Server version: 5.5.38
-- PHP Version: 5.5.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `fairhope`
--

-- --------------------------------------------------------

--
-- Table structure for table `ea_users`
--

CREATE TABLE `ea_users` (
`id` bigint(20) unsigned NOT NULL,
  `first_name` varchar(256) DEFAULT NULL,
  `last_name` varchar(512) DEFAULT NULL,
  `dob` date NOT NULL COMMENT 'Date of Birth',
  `email` varchar(512) DEFAULT NULL,
  `mobile_number` varchar(128) DEFAULT NULL,
  `phone_number` varchar(128) DEFAULT NULL,
  `address` varchar(256) DEFAULT NULL,
  `city` varchar(256) DEFAULT NULL,
  `state` varchar(128) DEFAULT NULL,
  `zip_code` varchar(64) DEFAULT NULL,
  `notes` text,
  `id_roles` bigint(20) unsigned NOT NULL,
  `num_of_children` bigint(20) NOT NULL,
  `no_show_flag` int(25) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ea_users`
--

INSERT INTO `ea_users` (`id`, `first_name`, `last_name`, `dob`, `email`, `mobile_number`, `phone_number`, `address`, `city`, `state`, `zip_code`, `notes`, `id_roles`, `num_of_children`, `no_show_flag`) VALUES
(84, 'Root', 'User', '0000-00-00', 'aharon@aharonhannan.com', '', '1234567890', '', '', '', '', '', 1, 0, 0),
(85, 'Fair Hope', 'Children''s Ministry', '0000-00-00', 'null@null.com', '', '1234567890', '', '', '', '', '', 2, 0, 0),
(86, 'Rob', 'Zoltowski', '0000-00-00', 'aharon@aharonhannan.com', NULL, NULL, NULL, NULL, NULL, NULL, 'This guy sucks', 3, 294, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ea_users`
--
ALTER TABLE `ea_users`
 ADD PRIMARY KEY (`id`), ADD KEY `id_roles` (`id_roles`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ea_users`
--
ALTER TABLE `ea_users`
MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=87;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `ea_users`
--
ALTER TABLE `ea_users`
ADD CONSTRAINT `ea_users_ibfk_1` FOREIGN KEY (`id_roles`) REFERENCES `ea_roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
