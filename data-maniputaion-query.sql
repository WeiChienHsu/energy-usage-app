-- Device Table
--  `id` int(11) NOT NULL AUTO_INCREMENT,
--  `name` varchar(255) NOT NULL,
--  `manufacturer` varchar(255) NOT NULL,
--  `deviceOnOff` int(11) NOT NULL,
--  `currentEnergyUsage` int(11) NOT NULL,
-- `averageEnergyUsage` int(11) NOT NULL,

-- Get Information of selected Device for the Updae Purpose
SELECT devices.id, devices.name, devices.manufacturer, devices.deviceOnOff, devices.currentEnergyUsage, devices.averageEnergyUsage
FROM devices
WHERE devices.id = [select_diveces_id]

-- Update the information of selected Device
UPDATE devices
SET name = [input_name], manufacturer = [input_manufacturer], deviceOnOff = [input_deviceOnOff], currentEnergyUsage = [input_currentEnergyUsage], averageEnergyUsage = [input_averageEnergyUsage]
WHERE id = [select_player_id];

-- Delete the selected Device
DELETE Device
FROM devices Device
WHERE Device.id = [selected_device_id]

UPDATE devices SET name = "NEW", manufacturer = "NEW", deviceOnOff = 1, currentEnergyUsage = 100, averageEnergyUsage = 100 WHERE id = 1;


-- Search for a single User

SELECT id, name, password, email FROM users WHERE email = ?;

-- Create User by Post Request

INSERT INTO `users` (`name`,`password`,`email`) VALUES (?, ?, ?)

-- Change the Name of User
UPDATE users
SET name = [updated_name], id = [user_id]
WHERE id = [select_player_id];

-- Delete the User
DELETE Users
FROM users Users
WHERE Users.email = [selected_user_email]
