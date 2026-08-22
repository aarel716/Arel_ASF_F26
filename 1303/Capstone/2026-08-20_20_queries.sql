/*
Query 1
Looking for login attempts with a high risk score.
High risk logins may need to be checked.
 */

SELECT
    sl.log_id,
    sl.event_time,
    sl.username,
    et.event_type_name,
    sl.ip_address,
    sl.risk_score
FROM security_logs sl
         JOIN event_types et
              ON sl.event_type_id = et.event_type_id
WHERE et.event_type_name = 'login'
  AND sl.risk_score >= 80;

/* Query 2
   Looking for events that were blocked by the system.
   This could show activity the system stopped.
 */
SELECT
    sl.log_id,
    sl.event_time,
    sl.username,
    at.action_name AS action_taken,
    sl.ip_address
FROM security_logs sl
         JOIN actions_taken at
              ON sl.action_taken_id = at.action_taken_id
WHERE at.action_name = 'block';


/*
Query 3
  Looking for critical security events.
  These events may need to be checked first.
 */

SELECT
    sl.log_id,
    sl.event_time,
    sl.username,
    sv.severity_name AS severity,
    sl.ip_address,
    sl.risk_score
FROM security_logs sl
         JOIN severities sv
              ON sl.severity_id = sv.severity_id
WHERE sv.severity_name = 'critical'
ORDER BY sl.risk_score DESC;


/*
Query 4
Looking for activity from users on the watchlist.
Watchlist activity may need more attention.
 */

SELECT
    sl.log_id,
    sl.event_time,
    sl.username,
    sl.ip_address,
    sl.risk_score,
    sl.watchlist_flag
FROM security_logs sl
WHERE sl.watchlist_flag = TRUE
ORDER BY sl.risk_score DESC;


-- Query 5
-- Looking for failed login attempts from a wrong password.
-- Repeated wrong passwords could be suspicious.

SELECT
    sl.log_id,
    sl.event_time,
    sl.username,
    sl.ip_address,
    fr.failure_reason_name AS failure_reason
FROM security_logs sl
         JOIN event_types et
              ON sl.event_type_id = et.event_type_id
         JOIN statuses st
              ON sl.status_id = st.status_id
         JOIN failure_reasons fr
              ON sl.failure_reason_id = fr.failure_reason_id
WHERE et.event_type_name = 'login'
  AND st.status_name = 'failed'
  AND fr.failure_reason_name = 'invalid_password';

-- Query 6
-- Counting how many events there are for each event type.
-- This can show what kind of activity happens the most.

SELECT
    et.event_type_name AS event_type,
    COUNT(*) AS event_count
FROM security_logs sl
         JOIN event_types et
              ON sl.event_type_id = et.event_type_id
GROUP BY et.event_type_name
ORDER BY event_count DESC;

-- Query 7
-- Counting failed events from each IP address.
-- This could show IP addresses with repeated problems.

SELECT
    sl.ip_address,
    COUNT(*) AS failed_events
FROM security_logs sl
         JOIN statuses st
              ON sl.status_id = st.status_id
WHERE st.status_name = 'failed'
GROUP BY sl.ip_address
ORDER BY failed_events DESC;

-- Query 8
-- Counting high or critical events for each user.
-- This could show users with more serious activity.

SELECT
    sl.username,
    COUNT(*) AS serious_events
FROM security_logs sl
         JOIN severities sv
              ON sl.severity_id = sv.severity_id
WHERE sv.severity_name IN ('high', 'critical')
GROUP BY sl.username
ORDER BY serious_events DESC;

-- Query 9
-- Counting failed events by device type.
-- This could show which devices have more failed activity.

SELECT
    dt.device_type_name AS device_type,
    COUNT(*) AS failed_events
FROM security_logs sl
         JOIN device_types dt
              ON sl.device_type_id = dt.device_type_id
         JOIN statuses st
              ON sl.status_id = st.status_id
WHERE st.status_name = 'failed'
GROUP BY dt.device_type_name
ORDER BY failed_events DESC;

-- Query 10
-- Looking for watchlist events that are high or critical.
-- These could be more important to check.
SELECT
    sl.username,
    sl.ip_address,
    sv.severity_name AS severity,
    sl.risk_score
FROM security_logs sl
         JOIN severities sv
              ON sl.severity_id = sv.severity_id
WHERE sl.watchlist_flag = TRUE
  AND sv.severity_name IN ('high', 'critical')
ORDER BY sl.risk_score DESC;


-- Query 11
-- Counting the different reasons events failed.
-- This could show which failures happen the most.

SELECT
    fr.failure_reason_name AS failure_reason,
    COUNT(*) AS failure_count
FROM security_logs sl
         JOIN failure_reasons fr
              ON sl.failure_reason_id = fr.failure_reason_id
GROUP BY fr.failure_reason_name
ORDER BY failure_count DESC;


-- Query 12
-- Looking for IP addresses used by more than one user.
-- This could show IP addresses that need to be checked.

SELECT
    sl.ip_address,
    COUNT(DISTINCT sl.username) AS user_count
FROM security_logs sl
GROUP BY sl.ip_address
HAVING COUNT(DISTINCT sl.username) > 1
ORDER BY user_count DESC;

-- Query 13
-- Counting events for each resource type.
-- This can show what resources are being used the most.

SELECT
    rt.resource_type_name AS resource_type,
    COUNT(*) AS event_count
FROM security_logs sl
         JOIN resource_types rt
              ON sl.resource_type_id = rt.resource_type_id
GROUP BY rt.resource_type_name
ORDER BY event_count DESC;


-- Query 14
-- Counting activity by user role and event category.
-- This can show what types of activity each role is doing.

SELECT
    ur.role_name AS user_role,
    ec.event_category_name AS event_category,
    COUNT(*) AS event_count
FROM security_logs sl
         JOIN user_roles ur
              ON sl.user_role_id = ur.user_role_id
         JOIN event_categories ec
              ON sl.event_category_id = ec.event_category_id
GROUP BY ur.role_name, ec.event_category_name
ORDER BY ur.role_name, event_count DESC;


-- Query 15
-- Counting events from each country.
-- This could help show where most of the activity is coming from.
SELECT
    sl.location_country,
    COUNT(*) AS event_count
FROM security_logs sl
GROUP BY sl.location_country
ORDER BY event_count DESC;


-- Query 16
-- Looking for failed events with a high risk score.
-- This could show activity with more than one warning sign.

SELECT
    sl.username,
    sl.ip_address,
    sl.risk_score,
    st.status_name AS status
FROM security_logs sl
         JOIN statuses st
              ON sl.status_id = st.status_id
WHERE st.status_name = 'failed'
  AND sl.risk_score >= 80
ORDER BY sl.risk_score DESC;

-- Query 17
-- Looking for locked or suspended accounts with successful activity.
-- This could show accounts doing things they should not be doing.

SELECT
    sl.username,
    ast.status_name AS account_status,
    st.status_name AS event_status,
    sl.ip_address
FROM security_logs sl
         JOIN account_statuses ast
              ON sl.account_status_id = ast.account_status_id
         JOIN statuses st
              ON sl.status_id = st.status_id
WHERE ast.status_name IN ('locked', 'suspended')
  AND st.status_name = 'success';

-- Query 18
-- Looking for users with more than one failed event.
-- This could show repeated problems with an account.

SELECT
    sl.username,
    COUNT(*) AS failed_events
FROM security_logs sl
         JOIN statuses st
              ON sl.status_id = st.status_id
WHERE st.status_name = 'failed'
GROUP BY sl.username
HAVING COUNT(*) > 1
ORDER BY failed_events DESC;

2
-- Query 19
-- Looking for sessions with several failed events.
-- This could show a session having repeated issues.

SELECT
    sl.session_id,
    COUNT(*) AS failed_events
FROM security_logs sl
         JOIN statuses st
              ON sl.status_id = st.status_id
WHERE st.status_name = 'failed'
GROUP BY sl.session_id
HAVING COUNT(*) > 1
ORDER BY failed_events DESC;

-- Query 20
-- Looking for failed watchlist activity with a high risk score.
-- This could show activity with several warning signs.

SELECT
    sl.username,
    sl.ip_address,
    sl.risk_score,
    sl.watchlist_flag,
    st.status_name AS status
FROM security_logs sl
         JOIN statuses st
              ON sl.status_id = st.status_id
WHERE st.status_name = 'failed'
  AND sl.watchlist_flag = TRUE
  AND sl.risk_score >= 80
ORDER BY sl.risk_score DESC;