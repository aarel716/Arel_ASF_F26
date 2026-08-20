-- Result 1

SELECT zones.zone_name
FROM zones
ORDER BY zone_name
LIMIT 4;


-- Result 2

SELECT user_profiles.username, role
FROM user_profiles
ORDER BY username
LIMIT 7;

-- Result 3

SELECT user_profiles.username, user_profiles.reputation_score
FROM user_profiles
ORDER BY reputation_score DESC
LIMIT 5;

-- Result 4


SELECT zones.zone_name,zone_type, zones.risk_level
FROM zones
WHERE risk_level = 'high'
ORDER BY zone_name;

-- Result 5

SELECT vendors.vendor_name, vendors.status
FROM vendors
WHERE status = 'active'
ORDER BY vendor_name
LIMIT 6;

-- Result 6

SELECT product_name, price, is_active
FROM products
WHERE is_active = FALSE
ORDER BY price DESC
LIMIT 8;

-- Result 7

SELECT zone_name, required_role, required_reputation_score
FROM zones z
         JOIN zone_access_rules za
              ON z.zone_id = za.zone_id
WHERE required_role = 'buyer'
   OR (required_role = 'observer'
    AND required_reputation_score >= 25)
ORDER BY required_role, required_reputation_score DESC, z.zone_id;

-- Result 8

SELECT username, zone_name
FROM user_profiles u
         JOIN zone_visits za
              ON u.user_id=za.user_id
         JOIN zones z
              ON z.zone_id=za.zone_id
WHERE u.role != 'buyer'
  AND risk_level= 'high'
  AND zone_name != 'Shadow Exchange'
ORDER BY zone_name, username;

-- Result 9

SELECT username, zone_name, entry_time
FROM user_profiles u
         JOIN zone_visits za
              ON u.user_id=za.user_id
         JOIN zones z
              ON z.zone_id=za.zone_id
WHERE EXTRACT(DAY FROM entry_time) = 12
ORDER BY entry_time DESC;

-- Result 10

SELECT zone_name, event_type, severity_level
FROM zone_events ze
         JOIN zones z
              ON ze.zone_id = z.zone_id
WHERE severity_level = 'high'
   OR (severity_level = 'critical' AND zone_name = 'Black Archive')
ORDER BY severity_level DESC, zone_name;

--Result 11

SELECT vendor_name, zone_name, reputation_score
FROM vendors v
         JOIN zones z
              ON v.zone_id = z.zone_id
ORDER BY reputation_score DESC
LIMIT 5;

--result 12
SELECT product_name, vendor_name, price
FROM products p
         JOIN vendors v
              ON p.vendor_id = v.vendor_id
WHERE p.is_active = TRUE
ORDER BY vendor_name, product_name
LIMIT 8;

-- result 13

SELECT username, zone_name, amount
FROM transactions t
         JOIN user_profiles u
              ON t.user_id = u.user_id
         JOIN zones z
              ON t.zone_id = z.zone_id
WHERE amount >= 300
ORDER BY zone_name, username
LIMIT 7;

-- result 14
SELECT username, product_name, zone_name, transaction_time
FROM transactions t
         JOIN user_profiles u
              ON t.user_id = u.user_id
         JOIN products p
              ON t.product_id = p.product_id
         JOIN zones z
              ON t.zone_id = z.zone_id
WHERE transaction_time >= '2026-04-10 11:00:00'
  AND transaction_time <= '2026-04-10 11:40:00'
ORDER BY transaction_time;

--result 15
SELECT username, alert_type, zone_name
FROM alerts a
         JOIN user_profiles u
              ON a.user_id = u.user_id
         JOIN zones z
              ON a.zone_id = z.zone_id
WHERE alert_type = 'anomaly'
ORDER BY username, zone_name
LIMIT 10;

-- result 16
SELECT zone_name, COUNT(*) AS total_visits
FROM zone_visits zv
         JOIN zones z
              ON zv.zone_id = z.zone_id
GROUP BY zone_name
HAVING COUNT(*) >= 5
ORDER BY total_visits DESC, zone_name;

-- result 17

SELECT zone_name, COUNT(*) AS total_events
FROM zone_events ze
         JOIN zones z
              ON ze.zone_id = z.zone_id
GROUP BY zone_name
ORDER BY zone_name;

--result 18

SELECT
    zone_name,
    ROUND(AVG(amount), 2)::DECIMAL(10,2) AS average_amount
FROM transactions t
         JOIN zones z
              ON t.zone_id = z.zone_id
GROUP BY zone_name
HAVING AVG(amount) >= 50
ORDER BY average_amount DESC;

-- rssult 19
SELECT username, COUNT(*) AS total_alerts
FROM alerts a
         JOIN user_profiles u
              ON a.user_id = u.user_id
GROUP BY username
HAVING COUNT(*) >= 3
ORDER BY total_alerts DESC, username;

--result 20

SELECT username, zone_name, COUNT(*) AS total_visits
FROM zone_visits zv
         JOIN user_profiles u
              ON zv.user_id = u.user_id
         JOIN zones z
              ON zv.zone_id = z.zone_id
GROUP BY username, zone_name
HAVING COUNT(*) = 2
ORDER BY username;

