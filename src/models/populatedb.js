#! /usr/bin/env node
import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const DbUser = process.env.DB_NAME;
const DbPass = process.env.DB_PASS;

const SQL = `

CREATE TABLE IF NOT EXISTS categories (
    category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_name VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2),  -- Changed to NUMERIC for decimal prices
    quantity INTEGER CHECK (quantity >= 0),  -- Added CHECK constraint
    product_image TEXT,  -- Changed to TEXT for image URLs
    category_id INTEGER NOT NULL,  -- Foreign key column
    CONSTRAINT fk_category
        FOREIGN KEY (category_id) 
        REFERENCES categories(category_id)
        ON DELETE RESTRICT  -- Prevents deleting categories with products
);


--
INSERT INTO categories (category_name, description) 
VALUES 
    ('Electronics', 'Gadgets and devices'),
    ('Clothing', 'Wearable items');

INSERT INTO products (product_name, price, quantity, product_image, category_id)
VALUES 
    ('Laptop', 999.99, 10, 'https://via.placeholder.com/100', 1),
    ('T-Shirt', 19.99, 50, 'https://via.placeholder.com/100', 2);

`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: `postgresql://${DbUser}:${DbPass}@localhost:5432/inventory`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
