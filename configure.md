# Database Configuration Guide

This guide details the steps to set up the MySQL database for the TechComponentes application.

## Prerequisites

- MySQL Server (v8.0 or higher recommended)
- MySQL Workbench or CLI client

## 1. Create Database and User

First, log in to your MySQL server as root and execute the following commands to create the database and a dedicated user.

```sql
-- Create the database
CREATE DATABASE IF NOT EXISTS tech_componentes;

-- Select the database
USE tech_componentes;

-- Create a specific user for the application (Avoid using root in production)
-- Replace 'secure_password' with a strong password
CREATE USER IF NOT EXISTS 'tech_admin'@'localhost' IDENTIFIED BY 'secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON tech_componentes.* TO 'tech_admin'@'localhost';
FLUSH PRIVILEGES;
```

## 2. Create Users Table

Run the following SQL to create the `users` table. Note that we store the password **hash**, not the plain text password.

```sql
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 3. Initial Data (Optional)

You can insert an initial administrator or test user.
**IMPORTANT:** The password field must be a valid Bcrypt hash. The hash below corresponds to the password: `password123`.

```sql
INSERT INTO users (username, email, password_hash, full_name)
VALUES
('admin', 'admin@techcomponentes.com', '$2a$10$xW/E/..placeholderhash..', 'System Administrator');
-- Note: In a real scenario, use the Registration page to create users so the password is hashed correctly by the backend.
```

## Security Implementation

### Database Security
1.  **Least Privilege:** The `tech_admin` user should only have permissions on the `tech_componentes` database.
2.  **Prepared Statements:** The application backend uses prepared statements (via `mysql2` library) for all database queries to prevent SQL Injection attacks.
3.  **Password Storage:** Passwords are never stored in plain text. We use `bcrypt` with a salt rounds of 10 to hash passwords before storing them in the `password_hash` column.

### Application Connection
The frontend connects to the backend API, which then connects to this database. Do not expose the database port directly to the internet.
