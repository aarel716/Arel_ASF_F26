-- Seed user roles from the raw security log data.
INSERT INTO user_roles (role_name)
SELECT DISTINCT user_role
FROM security_logs_raw
WHERE user_role IS NOT NULL;

-- Seed account statuses from the raw security log data.
INSERT INTO account_statuses (status_name)
SELECT DISTINCT account_status
FROM security_logs_raw
WHERE account_status IS NOT NULL;

-- Seed device types from the raw security log data.
INSERT INTO device_types (device_type_name)
SELECT DISTINCT device_type
FROM security_logs_raw
WHERE device_type IS NOT NULL;

-- Seed operating systems from the raw security log data.
INSERT INTO operating_systems (operating_system_name)
SELECT DISTINCT operating_system
FROM security_logs_raw
WHERE operating_system IS NOT NULL;

-- Seed browser names from the raw security log data.
INSERT INTO browser_names (browser_name)
SELECT DISTINCT browser_name
FROM security_logs_raw
WHERE browser_name IS NOT NULL;

-- Seed event types from the raw security log data.
INSERT INTO event_types (event_type_name)
SELECT DISTINCT event_type
FROM security_logs_raw
WHERE event_type IS NOT NULL;

-- Seed event categories from the raw security log data.
INSERT INTO event_categories (event_category_name)
SELECT DISTINCT event_category
FROM security_logs_raw
WHERE event_category IS NOT NULL;

-- Seed actions taken from the raw security log data.
INSERT INTO actions_taken (action_name)
SELECT DISTINCT action_taken
FROM security_logs_raw
WHERE action_taken IS NOT NULL;

-- Seed statuses from the raw security log data.
INSERT INTO statuses (status_name)
SELECT DISTINCT status
FROM security_logs_raw
WHERE status IS NOT NULL;

-- Seed severity levels from the raw security log data.
INSERT INTO severities (severity_name)
SELECT DISTINCT severity
FROM security_logs_raw
WHERE severity IS NOT NULL;

-- Seed resource types from the raw security log data.
INSERT INTO resource_types (resource_type_name)
SELECT DISTINCT resource_type
FROM security_logs_raw
WHERE resource_type IS NOT NULL;

-- Seed failure reasons from the raw security log data.
INSERT INTO failure_reasons (failure_reason_name)
SELECT DISTINCT failure_reason
FROM security_logs_raw
WHERE failure_reason IS NOT NULL;

INSERT INTO security_logs (
    event_time,
    username,
    user_role_id,
    account_status_id,
    ip_address,
    port_number,
    device_type_id,
    operating_system_id,
    browser_name_id,
    location_city,
    location_region,
    location_country,
    event_type_id,
    event_category_id,
    action_taken_id,
    status_id,
    severity_id,
    resource_type_id,
    resource_name,
    session_id,
    failure_reason_id,
    risk_score,
    watchlist_flag,
    notes
)
SELECT
    r.event_time,
    r.username,
    ur.user_role_id,
    ac.account_status_id,
    r.ip_address,
    r.port_number,
    dt.device_type_id,
    os.operating_system_id,
    bn.browser_name_id,
    r.location_city,
    r.location_region,
    r.location_country,
    et.event_type_id,
    ec.event_category_id,
    at.action_taken_id,
    st.status_id,
    sv.severity_id,
    rt.resource_type_id,
    r.resource_name,
    r.session_id,
    fr.failure_reason_id,
    r.risk_score,
    r.watchlist_flag,
    r.notes
FROM security_logs_raw r
         JOIN user_roles ur
              ON r.user_role = ur.role_name
         JOIN account_statuses ac
              ON r.account_status = ac.status_name
         JOIN device_types dt
              ON r.device_type = dt.device_type_name
         JOIN operating_systems os
              ON r.operating_system = os.operating_system_name
         JOIN browser_names bn
              ON r.browser_name = bn.browser_name
         JOIN event_types et
              ON r.event_type = et.event_type_name
         JOIN event_categories ec
              ON r.event_category = ec.event_category_name
         JOIN actions_taken at
              ON r.action_taken = at.action_name
         JOIN statuses st
              ON r.status = st.status_name
         JOIN severities sv
              ON r.severity = sv.severity_name
         JOIN resource_types rt
              ON r.resource_type = rt.resource_type_name
         LEFT JOIN failure_reasons fr
                   ON r.failure_reason = fr.failure_reason_name;