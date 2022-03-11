-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2022 at 07:07 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `itshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `address_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address_detail` varchar(20) NOT NULL,
  `address_district` varchar(20) NOT NULL,
  `address_province` varchar(20) NOT NULL,
  `address_zipcode` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`address_id`, `user_id`, `address_detail`, `address_district`, `address_province`, `address_zipcode`) VALUES
(1, 10, '236 ม.10 ต.ศรีค้ำ', 'แม่จัน', 'เชียงราย', 57110);

-- --------------------------------------------------------

--
-- Table structure for table `bank`
--

CREATE TABLE `bank` (
  `bank_id` int(11) NOT NULL,
  `bank_name` varchar(20) NOT NULL,
  `bank_number` varchar(12) NOT NULL,
  `bank_accname` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bank`
--

INSERT INTO `bank` (`bank_id`, `bank_name`, `bank_number`, `bank_accname`, `user_id`) VALUES
(1, 'Krungthai', '5350413279', 'นวพล สมปินตา', 1);

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `banner_id` int(3) NOT NULL,
  `banner_link` varchar(255) NOT NULL,
  `banner_picture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`banner_id`, `banner_link`, `banner_picture`) VALUES
(1, 'https://www.google.co.th', 'banner-1633444885997.jpeg'),
(2, '', 'banner-1633444912194.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `product_id` varchar(8) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `history_code` varchar(50) NOT NULL,
  `history_date` datetime NOT NULL DEFAULT current_timestamp(),
  `product_id` varchar(8) NOT NULL,
  `history_picture` varchar(255) NOT NULL,
  `history_status` enum('W','N','Y') NOT NULL,
  `history_ems` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`history_id`, `history_code`, `history_date`, `product_id`, `history_picture`, `history_status`, `history_ems`, `user_id`) VALUES
(16, 'dHQT3a9Q2EOY', '2021-12-27 20:08:02', 'A007', 'slipID-dHQT3a9Q2EOY.jpeg', 'W', '', 10),
(17, 'dHQT3a9Q2EOY', '2021-12-27 20:08:02', 'A007', 'slipID-dHQT3a9Q2EOY.jpeg', 'W', '', 10),
(18, 'dHQT3a9Q2EOY', '2021-12-27 20:08:02', 'A007', 'slipID-dHQT3a9Q2EOY.jpeg', 'W', '', 10),
(19, 'dHQT3a9Q2EOY', '2021-12-27 20:08:02', 'A007', 'slipID-dHQT3a9Q2EOY.jpeg', 'W', '', 10),
(20, 'dHQT3a9Q2EOY', '2021-12-27 20:08:02', 'A008', 'slipID-dHQT3a9Q2EOY.jpeg', 'W', '', 10),
(21, 'BJ9t9Tc2fltZ', '2021-12-27 20:13:52', 'A007', 'slipID-BJ9t9Tc2fltZ.png', 'Y', 'asdfsdaf', 10),
(22, 'mDcZ3NZNXd5o', '2021-12-27 20:15:12', 'A006', 'slipID-mDcZ3NZNXd5o.jpeg', 'N', '', 10),
(23, 'dPCjI9IbQMfa', '2021-12-28 12:33:47', 'A008', 'slipID-dPCjI9IbQMfa.png', 'W', '', 10),
(24, 'dPCjI9IbQMfa', '2021-12-28 12:33:47', 'A008', 'slipID-dPCjI9IbQMfa.png', 'W', '', 10),
(25, 'rywnLLacz73B', '2022-03-04 12:50:13', 'A007', 'slipID-rywnLLacz73B.png', 'Y', 'EF582621151TH', 10),
(26, 'rywnLLacz73B', '2022-03-04 12:50:13', 'A007', 'slipID-rywnLLacz73B.png', 'Y', 'EF582621151TH', 10);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` varchar(8) NOT NULL,
  `type_id` int(8) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_detail` varchar(1000) NOT NULL,
  `product_quantity` int(7) NOT NULL,
  `product_price` int(10) NOT NULL,
  `product_date` datetime NOT NULL DEFAULT current_timestamp(),
  `product_picture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `type_id`, `product_name`, `product_detail`, `product_quantity`, `product_price`, `product_date`, `product_picture`) VALUES
('A001', 1, 'WD HDD 1TB Black', 'HDD 1TB FOR GAMING FAST', 498, 1990, '2021-08-11 20:29:52', 'newFile-1627920580267.jpeg'),
('A002', 2, 'RTX 3090', 'GPU FOR GAMING', 120, 89990, '2021-08-11 20:29:52', 'newFile-1627735550178.png'),
('A003', 5, 'Ducky One 2 Horizon', 'KEYBOARD (คีย์บอร์ด) DUCKY ONE 2 HORIZON (CHERRY MX BLUE) (EN/TH) (DKON1808-CTHPDZBBH)\r\n(#2003100066)', 150, 2990, '2021-08-11 20:29:52', 'newFile-1627997933278.png'),
('A004', 8, 'INTEL CORE i7-11700', 'ซีพียู มีกราฟิกโปรเซสเซอร์‡ Intel® UHD Graphics 750\r\nซ๊อกเก็ต 1200 | 8 Cores / 16 Threads\r\nสามารถ Overclock ได้ถึง 4.90 GHz\r\nSupport Ram DDR4', 48, 13090, '2021-10-07 13:11:07', 'newFile-1633587067692.png'),
('A005', 7, 'สาย HDMI สำเร็จรูป รุ่น HDMI-10.0M', ' HDMI Cable 10.0M, - สายเชื่อมต่อ HDMI แบบหัวเล็ก สามารถใช้ต่อกับเครื่องเล่น DVD หรือกล้องดิจิตอล แสดงผลผ่านหน้าจอทีวี หรือโปรเจคเตอร์', 119, 350, '2021-08-12 16:37:41', 'newFile-1628761061823.jpeg'),
('A006', 7, 'RAZER KRAKEN X (CLASSIC BLACK) ', 'HEADSET RESPONSE : 12 Hz - 28000 Hz\r\nMIC RESPONSE : 100 Hz - 10000 Hz', 22, 1290, '2021-09-14 23:30:28', 'newFile-1631637028022.jpeg'),
('A007', 7, 'เมาส์ Glorious Model D Gaming mouse', 'เมาส์เกมมิ่งดีไซน์สมมาตร\r\nการออกแบบหลังเมาส์ด้วยโครงรังผึ้ง\r\nระบายอากาศบนฝ่ามือได้ดี\r\nมาพร้อมปุ่มการใช้งาน 6 ปุ่ม', 342, 2190, '2021-10-07 13:15:24', 'newFile-1633587324160.jpeg'),
('A008', 5, 'RAZER ORNATA CHROMA V2', 'คียบอร์ดเล่นเกมส์ที่เลือกนำข้อด๊ของปุ่มกดแบบ Membrane Switch และ Mechanical Switch มาผสมผสานกัน', 218, 2490, '2021-12-28 12:20:24', 'newFile-1640668824072.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `type_id` int(8) NOT NULL,
  `type_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`type_id`, `type_name`) VALUES
(1, 'Harddisk'),
(2, 'GPU'),
(3, 'Ram'),
(4, 'Smartphone'),
(5, 'Keyboard'),
(6, 'FlashDrive'),
(7, 'Accessories'),
(8, 'CPU');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(8) NOT NULL,
  `user_fname` varchar(65) NOT NULL,
  `user_lname` varchar(65) NOT NULL,
  `user_gender` enum('M','W') NOT NULL,
  `user_date` varchar(10) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_role` enum('User','Emp','Admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_fname`, `user_lname`, `user_gender`, `user_date`, `user_email`, `user_password`, `user_role`) VALUES
(1, 'แอดมิน', 'แอดมิน', 'M', '13-05-2545', 'admin@admin.com', '$2b$12$b1/a8f6nQrKcjSh.lP3q8.dlDV6bqWZOfRoqvwgQjxAfZ3Xaw2JIC', 'Admin'),
(3, 'พนักงาน', 'พนักงาน', 'M', '09-08-2564', 'test@test.com', '$2b$12$qE/uYuMS47hnmgaOu0JwiOtAq6KNyLt/hDANtZAGAjsyAJ/KKrtZ.', 'Emp'),
(9, 'ชนกันต์', 'วันสัมพันธ์', 'M', '06/10/2544', 'chanakan.w@gmail.com', '$2b$12$AjkAQeWVHer9fvplnFQVtuehbUvMD9hd6jtm/L.NFd8YZ8IBY/hXi', 'User'),
(10, 'นวพล', 'สมปินตา', 'M', '13/05/2545', 'nawapon.s@cvc.ac.th', '$2b$12$Vv4xBCpabcR2cTpyKAVOFuO51G1pA6GZEbiABDeAV/j6JKCsZ.5am', 'User');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `user_id_FK` (`user_id`);

--
-- Indexes for table `bank`
--
ALTER TABLE `bank`
  ADD PRIMARY KEY (`bank_id`),
  ADD KEY `user_id_FKbank` (`user_id`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`banner_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `product_id_FKhistory` (`product_id`),
  ADD KEY `user_id_FKhistory` (`user_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bank`
--
ALTER TABLE `bank`
  MODIFY `bank_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `banner_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `type_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `user_id_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `bank`
--
ALTER TABLE `bank`
  ADD CONSTRAINT `user_id_FKbank` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `product_id_FKhistory` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_id_FKhistory` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
