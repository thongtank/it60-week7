-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2017 at 03:32 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `it60`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_students`
--

CREATE TABLE `tb_students` (
  `std_id` varchar(10) NOT NULL,
  `std_fname` varchar(100) NOT NULL,
  `std_lname` varchar(100) NOT NULL,
  `std_gender` enum('f','m') NOT NULL,
  `std_age` int(3) NOT NULL,
  `date_added` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_students`
--

INSERT INTO `tb_students` (`std_id`, `std_fname`, `std_lname`, `std_gender`, `std_age`, `date_added`) VALUES
('5930759530', 'Panchai', 'Prasompech', 'm', 28, '2017-10-02 08:32:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_students`
--
ALTER TABLE `tb_students`
  ADD PRIMARY KEY (`std_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
