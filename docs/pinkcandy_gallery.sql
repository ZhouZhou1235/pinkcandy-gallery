-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2026-04-11 14:28:41
-- 服务器版本： 5.7.43-log
-- PHP 版本： 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `pinkcandy_gallery`
--

-- --------------------------------------------------------

--
-- 表的结构 `board`
--

CREATE TABLE `board` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `gallery`
--

CREATE TABLE `gallery` (
  `id` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `filename` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `info` varchar(1000) DEFAULT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `gallery_comment`
--

CREATE TABLE `gallery_comment` (
  `id` varchar(50) NOT NULL,
  `galleryid` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- 表的结构 `gallery_paw`
--

CREATE TABLE `gallery_paw` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `galleryid` varchar(50) NOT NULL,
  `commentid` varchar(50) DEFAULT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- 表的结构 `gallery_star`
--

CREATE TABLE `gallery_star` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `galleryid` varchar(50) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `tag`
--

CREATE TABLE `tag` (
  `id` varchar(50) NOT NULL,
  `tag` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `info` varchar(1000) DEFAULT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- 表的结构 `tag_gallery`
--

CREATE TABLE `tag_gallery` (
  `id` int(11) NOT NULL,
  `tagid` varchar(100) NOT NULL,
  `galleryid` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `jointime` datetime NOT NULL,
  `info` varchar(1000) DEFAULT NULL,
  `headimage` varchar(50) DEFAULT NULL,
  `backimage` varchar(50) DEFAULT NULL,
  `sex` varchar(50) DEFAULT NULL,
  `species` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `user_active`
--

CREATE TABLE `user_active` (
  `username` varchar(50) CHARACTER SET utf8 NOT NULL,
  `noticetime` datetime NOT NULL,
  `trendstime` datetime NOT NULL,
  `mediatime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `user_watch`
--

CREATE TABLE `user_watch` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `watcher` varchar(50) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转储表的索引
--

--
-- 表的索引 `board`
--
ALTER TABLE `board`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `gallery_comment`
--
ALTER TABLE `gallery_comment`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `gallery_paw`
--
ALTER TABLE `gallery_paw`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `gallery_star`
--
ALTER TABLE `gallery_star`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tag` (`tag`);

--
-- 表的索引 `tag_gallery`
--
ALTER TABLE `tag_gallery`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`);

--
-- 表的索引 `user_active`
--
ALTER TABLE `user_active`
  ADD PRIMARY KEY (`username`);

--
-- 表的索引 `user_watch`
--
ALTER TABLE `user_watch`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `board`
--
ALTER TABLE `board`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `gallery_paw`
--
ALTER TABLE `gallery_paw`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `gallery_star`
--
ALTER TABLE `gallery_star`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `tag_gallery`
--
ALTER TABLE `tag_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `user_watch`
--
ALTER TABLE `user_watch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
