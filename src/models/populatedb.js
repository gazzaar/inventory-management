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
    price NUMERIC(10, 2),  
    quantity INTEGER CHECK (quantity >= 0),  
    product_image BYTEA,  
    category_id INTEGER NOT NULL,  
    CONSTRAINT fk_category
        FOREIGN KEY (category_id) 
        REFERENCES categories(category_id)
        ON DELETE RESTRICT  -- Prevents deleting categories with products
);

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
