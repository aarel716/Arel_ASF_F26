**Table: Users**

Columns:
- user_id (PK)- To identify each user 
- username - Stores login name 
- password - hash password
- role - Customer, Vendor, or Admin
- created_at - Time/day created at

**Table: Products**

Columns:
- product_id (PK) - ID for each product
- vendor_id (FK users.user_id) - Vendor who owns the product
- product_name - Product name
- price - Price
- description - What is the product

**Table: Transactions**

- transaction_id (PK) - ID for each purchase
- user_id (FK users.user_id) - Customer who bought the product
- product_id (FK products.product_id) - Product that was purchased
- purchase_date - Time/day of purchase
- total_price - Amount paid

**Table: Reviews**

- review_id (PK) - ID for each review
- user_id (FK users.user_id) - User who wrote the review
- product_id (FK products.product_id) - Product being reviewed
- rating - Number rating (1–5)
- review_text - Written review

**Relationships:**
- products.vendor_id - users.user_id 
- transactions.user_id - users.user_id 
- transactions.product_id - products.product_id 
- reviews.user_id - users.user_id
- reviews.product_id - products.product_id 
