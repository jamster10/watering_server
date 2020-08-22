START TRANSACTION;

CREATE TABLE connected_devices (
  id SMALLINT AUTO_INCREMENT PRIMARY KEY,
  clientId VARCHAR(15) NOT NULL UNIQUE,
  username VARCHAR(15) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  subscriptions VARCHAR(255) NOT NULL,
  publications VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  last_connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO connected_devices (clientId, username, password, subscriptions, publications)
VALUES
    ('mqtt_subscriber', 'subscriber', '$2y$12$l8Zxd8jUhkYq2AjiiU2bCOeYfjvFl6bEvFMVBXVx7uEalFK/fInfO', '["apples", "cars"]', '["something", "cars"]'),
    ('mqtt_publisher', 'publisher', '$2y$12$ZXZmMM..R2ksFLoI0Gw6ROZFB1.v22hO7Br7o8oBt9rLYu2peGt.W', '["cars"]', '["dogs", "cars"]'),
    ('mqtt_test_ap1c', 'main_tester2a', '', '', '');

COMMIT;
-- password above is string 'args', then 'password encrypted using bcrypt 12 rounds
-- psql -U dunder_mifflin -d knex-practice -f ./sql-scripts/seed.shopping-list.sql
