START TRANSACTION;

DROP TABLE IF EXISTS connected_devices, profile, temp_pass_code, users;

CREATE TABLE users (
  id SMALLINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(30) NOT NULL,
  phone VARCHAR(10),
  google_id VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE temp_pass_code (
  id SMALLINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE,
  secret VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE profile (
  id SMALLINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL UNIQUE
);


INSERT INTO users (username, password, email)
VALUES
    ('kristof_mqtt', '$2y$12$Xm8.86PlSPBs1b01M4OBwOLGaCHsgwAGsijx0wE1SQ6zG4G8qxENO', 'kristofpierre8@gmail.com');

INSERT INTO profile (name)
VALUES
    ('admin');

COMMIT;

-- Home:
--   Items
-- 





-- Items:
--   home
--   purcahse date
--   warranty length timeline
--   itemURL
--   price
--   lifespan
--   replaceables
--     part
--       lifespan
--       url
--       pricecheck 
--         how soon in advance
--       notes
--   notes
-- Home
-- Modules
-- id
-- username
-- address


-- Module
-- id
-- Home
-- deviceid maybe is id
