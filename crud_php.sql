-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 09-12-2018 a las 08:53:31
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `crud_php`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombres` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `apellido` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `direccion` varchar(120) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(150) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombres`, `apellido`, `direccion`, `telefono`, `email`) VALUES
(1, 'Shanny Tuff', 'Ziemann', '57497 Lessie Mills', '087-491-4214', 'faker81471@gmail.com'),
(2, 'Will', 'Ritchie', '3420 Trace Corners', '232-637-0724', 'faker31046@gmail.com'),
(3, 'Alanna', 'Zulauf', '674 Narciso Estates', '269-814-1968', 'faker37229@gmail.com'),
(4, 'Myrna', 'Wisozk', '17248 Bashirian Pass', '952-985-6982', 'faker91303@gmail.com'),
(5, 'Jameson', 'Feest', '47938 Allen Underpass', '892-981-9414', 'faker23828@gmail.com'),
(6, 'Mohammad', 'Moens', '6686 Amelie Key', '028-489-4211', 'faker78358@gmail.com'),
(7, 'Nyah', 'Mertz', '46157 Parisian Views', '711-660-7073', 'faker70233@gmail.com'),
(8, 'Alvina', 'Ziemann', '3163 Boehm Loop', '625-697-6779', 'faker92719@gmail.com'),
(9, 'Dorothy Alice', 'Ritchie', '74834 Larson Branch', '087-364-7492', 'faker79029@gmail.com'),
(10, 'Zelma', 'Stoltenberg', '4684 Maverick Isle', '155-854-1695', 'faker53557@gmail.com'),
(11, 'Claudia', 'Hesselin', '2309 Timothy Square', '188-633-8909', 'faker69408@gmail.com'),
(12, 'Antonia', 'Anderson', '7228 Mariane Corner', '020-507-3709', 'faker48330@gmail.com'),
(13, 'Virgil', 'Schumm', '9083 Destany Common', '356-217-2993', 'faker52544@gmail.com'),
(14, 'Arnaldo', 'Dach', '252 Doyle Trail', '639-918-0638', 'faker42317@gmail.com'),
(15, 'Gregorias', 'Blocking', '6811 Green Underpass', '265-295-0400', 'faker44348@gmail.com'),
(16, 'Josh Andrew', 'O\'Hara', '896 Pollich Trafficway', '326-059-2768', 'faker99931@gmail.com'),
(17, 'Corene Lehner', 'Friesen', '90004 O\'Connell Heights', '719-263-9836', 'faker17417@gmail.com'),
(18, 'Letitia', 'Tillman', '8494 Torey Lodge', '580-791-7466', 'faker29387@gmail.com'),
(19, 'Estella Dandre', 'Wolf', '18355 Weber Light', '347-503-1809', 'faker26595@gmail.com'),
(20, 'Amya Leffler', 'Jacobson', '054 Leland Drives', '666-337-5554', 'faker65440@gmail.com'),
(21, 'Koby Herman', 'Upton', '516 Larson Spurs', '886-271-4955', 'faker88366@gmail.com'),
(22, 'Jadyn Kozey', 'Wunsch', '62866 Pollich Lane', '776-301-0063', 'faker81255@gmail.com'),
(23, 'Lucy', 'Effertz', '75024 Rogahn Locks', '155-358-6776', 'faker58010@gmail.com'),
(24, 'Kayleigh Harber', 'Roob', '7608 Dare Highway', '629-023-7674', 'faker24583@gmail.com'),
(29, 'Dariana Bosco', 'Herzog', '38715 Miller Pass', '730-692-3822', 'faker38118@gmail.com'),
(30, 'Emmanuel Kunde', 'Aufderhar', '3692 Jaskolski Brooks', '085-857-6002', 'faker89322@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
