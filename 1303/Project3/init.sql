-- Create Tables
-- Look at the columns, data types, primary keys, and foreign keys, then compare them back to the inserts above.

-- =========================================
-- NEON MARKET - ZONE FOCUSED DATABASE
-- Create tables in an order that avoids
-- foreign key problems
-- =========================================
-- =========================================
-- Drop tables first if they already exist
-- This helps when testing and rerunning code
-- Drop child tables before parent tables
-- =========================================

DROP TABLE IF EXISTS alerts;

DROP TABLE IF EXISTS transactions;

DROP TABLE IF EXISTS products;

DROP TABLE IF EXISTS vendors;

DROP TABLE IF EXISTS zone_events;

DROP TABLE IF EXISTS zone_visits;

DROP TABLE IF EXISTS zone_access_rules;

DROP TABLE IF EXISTS user_profiles;

DROP TABLE IF EXISTS zones;

-- =========================================
-- TABLE 1: zones
-- Stores the main areas of the Neon Market
-- =========================================

CREATE TABLE zones (

                       zone_id SERIAL PRIMARY KEY,         -- unique id for each zone

                       zone_name VARCHAR(100) NOT NULL,      -- name of the zone

                       zone_type VARCHAR(50) NOT NULL,      -- public, restricted, underground, experimental

                       risk_level VARCHAR(20) NOT NULL,      -- low, medium, high

                       description TEXT              -- optional longer explanation

);

-- =========================================
-- TABLE 2: user_profiles
-- Stores users with role and reputation
-- =========================================

CREATE TABLE user_profiles (

                               user_id SERIAL PRIMARY KEY,        -- unique id for each user

                               username VARCHAR(50) NOT NULL UNIQUE,   -- username must be unique

                               reputation_score INT DEFAULT 0,      -- simple reputation number

                               role VARCHAR(30) NOT NULL,         -- buyer, vendor, observer, admin

                               account_status VARCHAR(20) DEFAULT 'active'-- active, suspended, inactive

);

-- =========================================
-- TABLE 3: zone_access_rules
-- Defines what is needed to enter a zone
-- =========================================

CREATE TABLE zone_access_rules (

                                   rule_id SERIAL PRIMARY KEY,        -- unique id for each rule

                                   zone_id INT NOT NULL REFERENCES zones(zone_id), -- links rule to a zone

                                   required_reputation_score INT DEFAULT 0,  -- minimum reputation needed

                                   required_role VARCHAR(30),         -- required role, if any

                                   is_vr_required BOOLEAN DEFAULT TRUE    -- whether VR access is required

);

-- =========================================
-- TABLE 4: zone_visits
-- Tracks when a user enters and leaves a zone
-- =========================================

CREATE TABLE zone_visits (

                             visit_id SERIAL PRIMARY KEY,        -- unique id for each visit

                             user_id INT NOT NULL REFERENCES user_profiles(user_id), -- which user visited

                             zone_id INT NOT NULL REFERENCES zones(zone_id),     -- which zone was visited

                             entry_time TIMESTAMP NOT NULL,       -- when user entered

                             exit_time TIMESTAMP            -- when user left, can be NULL

);

-- =========================================
-- TABLE 5: zone_events
-- Stores events that happen inside a zone
-- =========================================

CREATE TABLE zone_events (

                             event_id SERIAL PRIMARY KEY,        -- unique id for each event

                             zone_id INT NOT NULL REFERENCES zones(zone_id), -- zone where event happened

                             event_type VARCHAR(50) NOT NULL,      -- trade, scan, alert, upload

                             event_time TIMESTAMP NOT NULL,       -- time of event

                             severity_level VARCHAR(20)         -- low, medium, high, critical

);

-- =========================================
-- TABLE 6: vendors
-- Stores sellers connected to a specific zone
-- =========================================

CREATE TABLE vendors (

                         vendor_id SERIAL PRIMARY KEY,       -- unique id for each vendor

                         vendor_name VARCHAR(100) NOT NULL,     -- vendor name

                         zone_id INT NOT NULL REFERENCES zones(zone_id), -- vendor belongs to a zone

                         reputation_score NUMERIC(3,1) DEFAULT 0.0, -- vendor score like 4.5

                         status VARCHAR(20) DEFAULT 'active'    -- active, inactive, suspended

);

-- =========================================
-- TABLE 7: products
-- Stores items sold by vendors
-- =========================================

CREATE TABLE products (

                          product_id SERIAL PRIMARY KEY,       -- unique id for each product

                          vendor_id INT NOT NULL REFERENCES vendors(vendor_id), -- vendor selling product

                          product_name VARCHAR(100) NOT NULL,    -- product name

                          price NUMERIC(10,2),            -- price with 2 decimal places

                          is_active BOOLEAN DEFAULT TRUE       -- whether product is active

);

-- =========================================
-- TABLE 8: transactions
-- Stores purchases made in zones
-- =========================================

CREATE TABLE transactions (

                              transaction_id SERIAL PRIMARY KEY,     -- unique id for each transaction

                              user_id INT NOT NULL REFERENCES user_profiles(user_id), -- buyer

                              product_id INT NOT NULL REFERENCES products(product_id),-- product bought

                              zone_id INT NOT NULL REFERENCES zones(zone_id),     -- zone where purchase happened

                              amount NUMERIC(10,2) NOT NULL,       -- amount paid

                              transaction_time TIMESTAMP NOT NULL    -- when purchase happened

);

-- =========================================
-- TABLE 9: alerts
-- Stores suspicious activity tied to zones/users
-- =========================================

CREATE TABLE alerts (

                        alert_id SERIAL PRIMARY KEY,        -- unique id for each alert

                        zone_id INT NOT NULL REFERENCES zones(zone_id), -- zone where alert happened

                        user_id INT REFERENCES user_profiles(user_id), -- user involved, can be NULL

                        alert_type VARCHAR(50) NOT NULL,      -- intrusion, fraud, anomaly

                        alert_time TIMESTAMP NOT NULL       -- when alert happened

);


-- =========================================
-- NEON MARKET - ZONE FOCUSED DATABASE
-- SEED DATA
-- This file inserts sample data into all tables
-- Parent tables must be inserted first
-- =========================================
-- =========================================
-- TABLE 1: zones
-- 10 zones in the Neon Market
-- =========================================

INSERT INTO zones (zone_name, zone_type, risk_level, description) VALUES

                                                                      ('Neon Plaza', 'public', 'low', 'Main entry zone with open traffic and common exchanges'),

                                                                      ('Shadow Exchange', 'restricted', 'high', 'Private vendor zone with limited access'),

                                                                      ('Deep Vault', 'underground', 'high', 'Hidden area used for storage and secret transactions'),

                                                                      ('Signal Bay', 'public', 'medium', 'Communication tools and signal traffic zone'),

                                                                      ('Echo Corridor', 'experimental', 'medium', 'Prototype testing and unstable systems'),

                                                                      ('Pulse Dock', 'public', 'low', 'Device repair and quick access services'),

                                                                      ('Cipher Alley', 'restricted', 'high', 'Encrypted transactions and private vendor activity'),

                                                                      ('Glass Terminal', 'experimental', 'medium', 'Observation and scanning zone'),

                                                                      ('Drift Sector', 'public', 'low', 'Casual browsing and lower-risk exchanges'),

                                                                      ('Black Archive', 'underground', 'high', 'Historical data storage and restricted files');

-- =========================================
-- TABLE 2: user_profiles
-- 25 users
-- Some of these users will have no zone visits
-- =========================================

INSERT INTO user_profiles (username, reputation_score, role, account_status) VALUES

                                                                                 ('ghost42', 45, 'buyer', 'active'),

                                                                                 ('neonWolf', 98, 'vendor', 'active'),

                                                                                 ('byteQueen', 91, 'observer', 'active'),

                                                                                 ('gridLock', 85, 'buyer', 'active'),

                                                                                 ('pulseKid', 22, 'buyer', 'active'),

                                                                                 ('cipherLane', 67, 'buyer', 'active'),

                                                                                 ('echoShift', 12, 'observer', 'inactive'),

                                                                                 ('vaultRunner', 73, 'vendor', 'active'),

                                                                                 ('signalBloom', 34, 'buyer', 'active'),

                                                                                 ('darkPixel', 88, 'observer', 'active'),

                                                                                 ('traceUnit', 41, 'buyer', 'active'),

                                                                                 ('glowNode', 29, 'buyer', 'active'),

                                                                                 ('relayFox', 64, 'vendor', 'active'),

                                                                                 ('driftByte', 18, 'observer', 'inactive'),

                                                                                 ('staticNerve', 59, 'buyer', 'active'),

                                                                                 ('mirrorPulse', 77, 'vendor', 'active'),

                                                                                 ('zeroTrace', 93, 'observer', 'active'),

                                                                                 ('arcShadow', 38, 'buyer', 'active'),

                                                                                 ('vectorLane', 55, 'buyer', 'suspended'),

                                                                                 ('orbitNull', 14, 'observer', 'inactive'),

                                                                                 ('glassSpark', 70, 'vendor', 'active'),

                                                                                 ('echoLine', 47, 'buyer', 'active'),

                                                                                 ('phaseLock', 82, 'buyer', 'active'),

                                                                                 ('ghostSignal', 26, 'observer', 'active'),

                                                                                 ('neonDrift', 61, 'vendor', 'active');

-- =========================================
-- TABLE 3: zone_access_rules
-- One rule for each zone
-- =========================================

INSERT INTO zone_access_rules (zone_id, required_reputation_score, required_role, is_vr_required) VALUES

                                                                                                      (1, 0, 'buyer', TRUE),

                                                                                                      (2, 50, 'vendor', TRUE),

                                                                                                      (3, 90, 'observer', TRUE),

                                                                                                      (4, 20, 'buyer', TRUE),

                                                                                                      (5, 10, 'observer', TRUE),

                                                                                                      (6, 0, 'buyer', TRUE),

                                                                                                      (7, 60, 'vendor', TRUE),

                                                                                                      (8, 25, 'observer', TRUE),

                                                                                                      (9, 0, 'buyer', TRUE),

                                                                                                      (10, 85, 'observer', TRUE);

-- =========================================
-- TABLE 4: zone_visits
-- 50 visits total
-- Some users do not appear here at all
-- =========================================

INSERT INTO zone_visits (user_id, zone_id, entry_time, exit_time) VALUES

                                                                      (1, 1, '2026-04-10 09:00:00', '2026-04-10 09:20:00'),

                                                                      (2, 2, '2026-04-10 09:05:00', '2026-04-10 09:40:00'),

                                                                      (3, 3, '2026-04-10 09:10:00', '2026-04-10 09:50:00'),

                                                                      (4, 1, '2026-04-10 09:15:00', '2026-04-10 09:35:00'),

                                                                      (5, 4, '2026-04-10 09:20:00', '2026-04-10 09:45:00'),

                                                                      (6, 2, '2026-04-10 09:25:00', '2026-04-10 09:55:00'),

                                                                      (8, 7, '2026-04-10 09:30:00', '2026-04-10 10:00:00'),

                                                                      (9, 9, '2026-04-10 09:35:00', '2026-04-10 10:05:00'),

                                                                      (10, 8, '2026-04-10 09:40:00', '2026-04-10 10:10:00'),

                                                                      (11, 1, '2026-04-10 09:45:00', '2026-04-10 10:15:00'),

                                                                      (12, 6, '2026-04-10 10:00:00', '2026-04-10 10:25:00'),

                                                                      (13, 7, '2026-04-10 10:05:00', '2026-04-10 10:35:00'),

                                                                      (15, 4, '2026-04-10 10:10:00', '2026-04-10 10:40:00'),

                                                                      (16, 2, '2026-04-10 10:15:00', '2026-04-10 10:45:00'),

                                                                      (17, 10, '2026-04-10 10:20:00', '2026-04-10 10:55:00'),

                                                                      (18, 9, '2026-04-10 10:25:00', '2026-04-10 10:50:00'),

                                                                      (19, 1, '2026-04-10 10:30:00', '2026-04-10 10:55:00'),

                                                                      (21, 5, '2026-04-10 10:35:00', '2026-04-10 11:05:00'),

                                                                      (22, 6, '2026-04-10 10:40:00', '2026-04-10 11:15:00'),

                                                                      (23, 3, '2026-04-10 10:45:00', '2026-04-10 11:20:00'),

                                                                      (24, 8, '2026-04-10 10:50:00', '2026-04-10 11:25:00'),

                                                                      (25, 2, '2026-04-10 10:55:00', '2026-04-10 11:30:00'),

                                                                      (1, 4, '2026-04-11 09:00:00', '2026-04-11 09:20:00'),

                                                                      (2, 1, '2026-04-11 09:05:00', '2026-04-11 09:25:00'),

                                                                      (3, 2, '2026-04-11 09:10:00', '2026-04-11 09:35:00'),

                                                                      (4, 3, '2026-04-11 09:15:00', '2026-04-11 09:45:00'),

                                                                      (5, 9, '2026-04-11 09:20:00', '2026-04-11 09:50:00'),

                                                                      (6, 4, '2026-04-11 09:25:00', '2026-04-11 09:55:00'),

                                                                      (8, 7, '2026-04-11 09:30:00', '2026-04-11 10:00:00'),

                                                                      (9, 6, '2026-04-11 09:35:00', '2026-04-11 10:05:00'),

                                                                      (10, 8, '2026-04-11 09:40:00', '2026-04-11 10:10:00'),

                                                                      (11, 1, '2026-04-11 09:45:00', '2026-04-11 10:15:00'),

                                                                      (12, 5, '2026-04-11 09:50:00', '2026-04-11 10:20:00'),

                                                                      (13, 2, '2026-04-11 09:55:00', '2026-04-11 10:30:00'),

                                                                      (15, 4, '2026-04-11 10:00:00', '2026-04-11 10:25:00'),

                                                                      (16, 7, '2026-04-11 10:05:00', '2026-04-11 10:35:00'),

                                                                      (17, 10, '2026-04-11 10:10:00', '2026-04-11 10:40:00'),

                                                                      (18, 9, '2026-04-11 10:15:00', '2026-04-11 10:45:00'),

                                                                      (19, 3, '2026-04-11 10:20:00', '2026-04-11 10:50:00'),

                                                                      (21, 8, '2026-04-11 10:25:00', '2026-04-11 10:55:00'),

                                                                      (22, 1, '2026-04-11 10:30:00', '2026-04-11 11:00:00'),

                                                                      (23, 5, '2026-04-11 10:35:00', '2026-04-11 11:05:00'),

                                                                      (24, 2, '2026-04-11 10:40:00', '2026-04-11 11:10:00'),

                                                                      (25, 6, '2026-04-11 10:45:00', '2026-04-11 11:15:00'),

                                                                      (1, 9, '2026-04-12 09:00:00', '2026-04-12 09:20:00'),

                                                                      (2, 7, '2026-04-12 09:05:00', '2026-04-12 09:35:00'),

                                                                      (3, 10, '2026-04-12 09:10:00', '2026-04-12 09:45:00'),

                                                                      (4, 4, '2026-04-12 09:15:00', '2026-04-12 09:40:00'),

                                                                      (5, 1, '2026-04-12 09:20:00', '2026-04-12 09:50:00'),

                                                                      (6, 8, '2026-04-12 09:25:00', '2026-04-12 09:55:00');

-- =========================================
-- TABLE 5: zone_events
-- 50 events
-- =========================================

INSERT INTO zone_events (zone_id, event_type, event_time, severity_level) VALUES

                                                                              (1, 'trade', '2026-04-10 09:02:00', 'low'),

                                                                              (2, 'scan', '2026-04-10 09:06:00', 'medium'),

                                                                              (3, 'alert', '2026-04-10 09:11:00', 'high'),

                                                                              (4, 'upload', '2026-04-10 09:16:00', 'low'),

                                                                              (5, 'trade', '2026-04-10 09:21:00', 'medium'),

                                                                              (6, 'scan', '2026-04-10 09:26:00', 'low'),

                                                                              (7, 'intrusion', '2026-04-10 09:31:00', 'critical'),

                                                                              (8, 'upload', '2026-04-10 09:36:00', 'medium'),

                                                                              (9, 'trade', '2026-04-10 09:41:00', 'low'),

                                                                              (10, 'alert', '2026-04-10 09:46:00', 'high'),

                                                                              (1, 'scan', '2026-04-10 10:01:00', 'low'),

                                                                              (2, 'trade', '2026-04-10 10:06:00', 'medium'),

                                                                              (3, 'intrusion', '2026-04-10 10:11:00', 'critical'),

                                                                              (4, 'upload', '2026-04-10 10:16:00', 'low'),

                                                                              (5, 'alert', '2026-04-10 10:21:00', 'medium'),

                                                                              (6, 'trade', '2026-04-10 10:26:00', 'low'),

                                                                              (7, 'scan', '2026-04-10 10:31:00', 'high'),

                                                                              (8, 'trade', '2026-04-10 10:36:00', 'medium'),

                                                                              (9, 'upload', '2026-04-10 10:41:00', 'low'),

                                                                              (10, 'intrusion', '2026-04-10 10:46:00', 'critical'),

                                                                              (1, 'trade', '2026-04-11 09:01:00', 'low'),

                                                                              (2, 'scan', '2026-04-11 09:06:00', 'medium'),

                                                                              (3, 'alert', '2026-04-11 09:11:00', 'high'),

                                                                              (4, 'upload', '2026-04-11 09:16:00', 'low'),

                                                                              (5, 'trade', '2026-04-11 09:21:00', 'medium'),

                                                                              (6, 'scan', '2026-04-11 09:26:00', 'low'),

                                                                              (7, 'intrusion', '2026-04-11 09:31:00', 'critical'),

                                                                              (8, 'upload', '2026-04-11 09:36:00', 'medium'),

                                                                              (9, 'trade', '2026-04-11 09:41:00', 'low'),

                                                                              (10, 'alert', '2026-04-11 09:46:00', 'high'),

                                                                              (1, 'scan', '2026-04-11 10:01:00', 'low'),

                                                                              (2, 'trade', '2026-04-11 10:06:00', 'medium'),

                                                                              (3, 'intrusion', '2026-04-11 10:11:00', 'critical'),

                                                                              (4, 'upload', '2026-04-11 10:16:00', 'low'),

                                                                              (5, 'alert', '2026-04-11 10:21:00', 'medium'),

                                                                              (6, 'trade', '2026-04-11 10:26:00', 'low'),

                                                                              (7, 'scan', '2026-04-11 10:31:00', 'high'),

                                                                              (8, 'trade', '2026-04-11 10:36:00', 'medium'),

                                                                              (9, 'upload', '2026-04-11 10:41:00', 'low'),

                                                                              (10, 'intrusion', '2026-04-11 10:46:00', 'critical'),

                                                                              (1, 'trade', '2026-04-12 09:02:00', 'low'),

                                                                              (2, 'scan', '2026-04-12 09:07:00', 'medium'),

                                                                              (3, 'alert', '2026-04-12 09:12:00', 'high'),

                                                                              (4, 'upload', '2026-04-12 09:17:00', 'low'),

                                                                              (5, 'trade', '2026-04-12 09:22:00', 'medium'),

                                                                              (6, 'scan', '2026-04-12 09:27:00', 'low'),

                                                                              (7, 'intrusion', '2026-04-12 09:32:00', 'critical'),

                                                                              (8, 'upload', '2026-04-12 09:37:00', 'medium'),

                                                                              (9, 'trade', '2026-04-12 09:42:00', 'low'),

                                                                              (10, 'alert', '2026-04-12 09:47:00', 'high');

-- =========================================
-- TABLE 6: vendors
-- 15 vendors
-- Each vendor belongs to one zone
-- =========================================

INSERT INTO vendors (vendor_name, zone_id, reputation_score, status) VALUES

                                                                         ('Ghost Circuit', 1, 4.8, 'active'),

                                                                         ('Neon Forge', 2, 4.6, 'active'),

                                                                         ('Vault Signal', 3, 3.9, 'suspended'),

                                                                         ('Echo Tools', 4, 4.2, 'active'),

                                                                         ('Corridor Labs', 5, 4.0, 'active'),

                                                                         ('Pulse Mechanics', 6, 4.5, 'active'),

                                                                         ('Cipher Systems', 7, 4.7, 'active'),

                                                                         ('Glass Logic', 8, 3.8, 'active'),

                                                                         ('Drift Supply', 9, 4.1, 'inactive'),

                                                                         ('Archive Works', 10, 4.9, 'active'),

                                                                         ('Signal Smith', 4, 3.7, 'active'),

                                                                         ('Blacklight Devices', 2, 4.4, 'active'),

                                                                         ('Null Relay', 7, 3.5, 'inactive'),

                                                                         ('Orbit Trade', 1, 4.3, 'active'),

                                                                         ('Mirror Core', 8, 4.6, 'active');

-- =========================================
-- TABLE 7: products
-- 27 products
-- Exactly 10 are FALSE for is_active
-- =========================================

INSERT INTO products (vendor_id, product_name, price, is_active) VALUES

                                                                     (1, 'Pulse Scanner', 120.00, TRUE),

                                                                     (2, 'Signal Jammer', 340.50, TRUE),

                                                                     (3, 'Data Spike Tool', 89.99, TRUE),

                                                                     (4, 'Echo Relay', 45.00, TRUE),

                                                                     (5, 'Prototype Lens', 75.25, TRUE),

                                                                     (6, 'Dock Patch Kit', 30.00, TRUE),

                                                                     (7, 'Cipher Mask', 410.00, TRUE),

                                                                     (8, 'Glass Scope', 150.00, TRUE),

                                                                     (9, 'Drift Beacon', 55.00, TRUE),

                                                                     (10, 'Vault Shell', 620.00, TRUE),

                                                                     (11, 'Signal Thread', 28.99, TRUE),

                                                                     (12, 'Blackline Router', 205.00, TRUE),

                                                                     (13, 'Null Key', 17.50, TRUE),

                                                                     (14, 'Orbit Tag', 63.25, TRUE),

                                                                     (15, 'Mirror Trace', 112.00, TRUE),

                                                                     (1, 'Grid Beacon', 64.99, TRUE),

                                                                     (2, 'Shadow Drive', 210.00, TRUE),

                                                                     (3, 'Vault Key MkII', 510.00, FALSE),

                                                                     (4, 'Relay Ghost', 39.99, FALSE),

                                                                     (5, 'Corridor Bloom', 88.00, FALSE),

                                                                     (6, 'Dock Phantom', 97.25, FALSE),

                                                                     (7, 'Cipher Needle', 132.00, FALSE),

                                                                     (8, 'Glass Wire', 42.50, FALSE),

                                                                     (9, 'Drift Core', 58.75, FALSE),

                                                                     (10, 'Archive Lock', 715.00, FALSE),

                                                                     (11, 'Thread Breaker', 19.99, FALSE),

                                                                     (12, 'Blackline Echo', 240.00, FALSE);

-- =========================================
-- TABLE 8: transactions
-- 43 transactions
-- Repeated users and zones are normal here
-- =========================================

INSERT INTO transactions (user_id, product_id, zone_id, amount, transaction_time) VALUES

                                                                                      (1, 1, 1, 120.00, '2026-04-10 11:00:00'),

                                                                                      (2, 2, 2, 340.50, '2026-04-10 11:05:00'),

                                                                                      (3, 3, 3, 89.99, '2026-04-10 11:10:00'),

                                                                                      (4, 4, 4, 45.00, '2026-04-10 11:15:00'),

                                                                                      (5, 5, 5, 75.25, '2026-04-10 11:20:00'),

                                                                                      (6, 6, 6, 30.00, '2026-04-10 11:25:00'),

                                                                                      (8, 7, 7, 410.00, '2026-04-10 11:30:00'),

                                                                                      (9, 8, 8, 150.00, '2026-04-10 11:35:00'),

                                                                                      (10, 9, 9, 55.00, '2026-04-10 11:40:00'),

                                                                                      (11, 10, 10, 620.00, '2026-04-10 11:45:00'),

                                                                                      (12, 11, 4, 28.99, '2026-04-10 11:50:00'),

                                                                                      (13, 12, 2, 205.00, '2026-04-10 11:55:00'),

                                                                                      (15, 13, 7, 17.50, '2026-04-10 12:00:00'),

                                                                                      (16, 14, 1, 63.25, '2026-04-10 12:05:00'),

                                                                                      (17, 15, 8, 112.00, '2026-04-10 12:10:00'),

                                                                                      (18, 16, 9, 64.99, '2026-04-10 12:15:00'),

                                                                                      (19, 17, 2, 210.00, '2026-04-10 12:20:00'),

                                                                                      (21, 1, 1, 120.00, '2026-04-10 12:25:00'),

                                                                                      (22, 2, 2, 340.50, '2026-04-10 12:30:00'),

                                                                                      (23, 3, 3, 89.99, '2026-04-10 12:35:00'),

                                                                                      (24, 4, 4, 45.00, '2026-04-10 12:40:00'),

                                                                                      (25, 5, 5, 75.25, '2026-04-10 12:45:00'),

                                                                                      (1, 6, 6, 30.00, '2026-04-11 10:00:00'),

                                                                                      (2, 7, 7, 410.00, '2026-04-11 10:05:00'),

                                                                                      (3, 8, 8, 150.00, '2026-04-11 10:10:00'),

                                                                                      (4, 9, 9, 55.00, '2026-04-11 10:15:00'),

                                                                                      (5, 10, 10, 620.00, '2026-04-11 10:20:00'),

                                                                                      (6, 11, 4, 28.99, '2026-04-11 10:25:00'),

                                                                                      (8, 12, 2, 205.00, '2026-04-11 10:30:00'),

                                                                                      (9, 13, 7, 17.50, '2026-04-11 10:35:00'),

                                                                                      (10, 14, 1, 63.25, '2026-04-11 10:40:00'),

                                                                                      (11, 15, 8, 112.00, '2026-04-11 10:45:00'),

                                                                                      (12, 16, 9, 64.99, '2026-04-11 10:50:00'),

                                                                                      (13, 17, 2, 210.00, '2026-04-11 10:55:00'),

                                                                                      (15, 1, 1, 120.00, '2026-04-11 11:00:00'),

                                                                                      (16, 2, 2, 340.50, '2026-04-11 11:05:00'),

                                                                                      (17, 3, 3, 89.99, '2026-04-11 11:10:00'),

                                                                                      (18, 4, 4, 45.00, '2026-04-11 11:15:00'),

                                                                                      (19, 5, 5, 75.25, '2026-04-11 11:20:00'),

                                                                                      (21, 6, 6, 30.00, '2026-04-11 11:25:00'),

                                                                                      (22, 7, 7, 410.00, '2026-04-11 11:30:00'),

                                                                                      (23, 8, 8, 150.00, '2026-04-11 11:35:00'),

                                                                                      (24, 9, 9, 55.00, '2026-04-11 11:40:00');

-- =========================================
-- TABLE 9: alerts
-- 34 alerts
-- Duplicate user_id values appear on purpose
-- =========================================

INSERT INTO alerts (zone_id, user_id, alert_type, alert_time) VALUES

                                                                  (3, 2, 'intrusion', '2026-04-10 10:02:00'),

                                                                  (2, 3, 'anomaly', '2026-04-10 10:04:00'),

                                                                  (1, 1, 'fraud', '2026-04-10 10:06:00'),

                                                                  (3, 4, 'intrusion', '2026-04-10 10:08:00'),

                                                                  (5, 7, 'anomaly', '2026-04-10 10:10:00'),

                                                                  (7, 2, 'fraud', '2026-04-10 10:12:00'),

                                                                  (10, 3, 'intrusion', '2026-04-10 10:14:00'),

                                                                  (2, 1, 'anomaly', '2026-04-10 10:16:00'),

                                                                  (8, 4, 'fraud', '2026-04-10 10:18:00'),

                                                                  (3, 2, 'intrusion', '2026-04-10 10:20:00'),

                                                                  (7, 8, 'anomaly', '2026-04-10 10:22:00'),

                                                                  (1, 9, 'fraud', '2026-04-10 10:24:00'),

                                                                  (2, 10, 'intrusion', '2026-04-10 10:26:00'),

                                                                  (4, 11, 'anomaly', '2026-04-10 10:28:00'),

                                                                  (6, 12, 'fraud', '2026-04-10 10:30:00'),

                                                                  (7, 13, 'intrusion', '2026-04-10 10:32:00'),

                                                                  (9, 15, 'anomaly', '2026-04-10 10:34:00'),

                                                                  (10, 16, 'fraud', '2026-04-10 10:36:00'),

                                                                  (3, 17, 'intrusion', '2026-04-10 10:38:00'),

                                                                  (2, 18, 'anomaly', '2026-04-10 10:40:00'),

                                                                  (1, 19, 'fraud', '2026-04-10 10:42:00'),

                                                                  (5, 21, 'intrusion', '2026-04-10 10:44:00'),

                                                                  (8, 22, 'anomaly', '2026-04-10 10:46:00'),

                                                                  (10, 23, 'fraud', '2026-04-10 10:48:00'),

                                                                  (3, 24, 'intrusion', '2026-04-10 10:50:00'),

                                                                  (7, 25, 'anomaly', '2026-04-10 10:52:00'),

                                                                  (2, 2, 'fraud', '2026-04-11 09:50:00'),

                                                                  (3, 3, 'intrusion', '2026-04-11 09:52:00'),

                                                                  (1, 1, 'anomaly', '2026-04-11 09:54:00'),

                                                                  (7, 2, 'fraud', '2026-04-11 09:56:00'),

                                                                  (10, 3, 'intrusion', '2026-04-11 09:58:00'),

                                                                  (2, 4, 'anomaly', '2026-04-11 10:00:00'),

                                                                  (3, 2, 'fraud', '2026-04-11 10:02:00'),

                                                                  (8, 4, 'intrusion', '2026-04-11 10:04:00');
