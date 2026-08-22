CREATE TABLE user_roles (
    user_role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE account_statuses (
    account_status_id SERIAL PRIMARY KEY,
    status_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE device_types (
    device_type_id SERIAL PRIMARY KEY,
    device_type_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE operating_systems (
    operating_system_id SERIAL PRIMARY KEY,
    operating_system_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE browser_names (
    browser_name_id SERIAL PRIMARY KEY,
    browser_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE event_types (
    event_type_id SERIAL PRIMARY KEY,
    event_type_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE event_categories (
    event_category_id SERIAL PRIMARY KEY,
    event_category_name VARCHAR(50) UNIQUE NOT NULL

);

CREATE TABLE actions_taken (
    action_taken_id SERIAL PRIMARY KEY,
    action_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE statuses (
    status_id SERIAL PRIMARY KEY,
    status_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE severities (
    severity_id SERIAL PRIMARY KEY,
    severity_name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE resource_types (
    resource_type_id SERIAL PRIMARY KEY,
    resource_type_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE failure_reasons (
    failure_reason_id SERIAL PRIMARY KEY,
    failure_reason_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE security_logs (
    log_id SERIAL PRIMARY KEY,
    event_time TIMESTAMP NOT NULL,
    username VARCHAR(50) NOT NULL,
    user_role_id INTEGER REFERENCES user_roles(user_role_id),
    account_status_id INTEGER REFERENCES account_statuses(account_status_id),
    ip_address VARCHAR(45),
    port_number INTEGER,
    device_type_id INTEGER REFERENCES device_types(device_type_id),
    operating_system_id INTEGER REFERENCES operating_systems(operating_system_id),
    browser_name_id INTEGER REFERENCES browser_names(browser_name_id),
    location_city VARCHAR(50),
    location_region VARCHAR(50),
    location_country VARCHAR(50),
    event_type_id INTEGER REFERENCES event_types(event_type_id),
    event_category_id INTEGER REFERENCES event_categories(event_category_id),
    action_taken_id INTEGER REFERENCES actions_taken(action_taken_id),
    status_id INTEGER REFERENCES statuses(status_id),
    severity_id INTEGER REFERENCES severities(severity_id),
    resource_type_id INTEGER REFERENCES resource_types(resource_type_id),
    resource_name VARCHAR(100),
    session_id VARCHAR(50),
    failure_reason_id INTEGER REFERENCES failure_reasons(failure_reason_id),
    risk_score INTEGER CHECK (risk_score BETWEEN 0 AND 100),
    watchlist_flag BOOLEAN,
    notes TEXT
);

