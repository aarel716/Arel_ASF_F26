CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(255),
    role VARCHAR(20),
    created_at TIMESTAMP
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    vendor_id INTEGER REFERENCES users(user_id),
    product_name VARCHAR(100),
    price DECIMAL(10,2),
    description TEXT
);

CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    product_id INTEGER REFERENCES products(product_id),
    purchase_date TIMESTAMP,
    total_price DECIMAL(10,2)
);

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    product_id INTEGER REFERENCES products(product_id),
    rating INTEGER,
    review_text TEXT
);

INSERT INTO users (username, password, role, created_at)
VALUES ('vendor1', 'password123', 'Vendor', CURRENT_TIMESTAMP),
       ('customer1', 'password123', 'Customer', CURRENT_TIMESTAMP);

INSERT INTO products (vendor_id, product_name, price, description)
VALUES(1, 'Desk', 49.99, 'For Office Work');

INSERT INTO transactions (user_id, product_id, purchase_date, total_price)
VALUES (2, 1, CURRENT_TIMESTAMP, 49.99);

INSERT INTO reviews (user_id, product_id, rating, review_text)
VALUES (2, 1, 5, 'Holds my laptop.');