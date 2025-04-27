#! /usr/bin/env node
import dotenv from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;
dotenv.config();

const DbUser = process.env.DB_NAME;
const DbPass = process.env.DB_PASS;

const SQL = `

CREATE TABLE IF NOT EXISTS categories (
    category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    category_image TEXT
);

CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2),  
    quantity INTEGER CHECK (quantity >= 0),  
    product_image TEXT,  
    category_id INTEGER NOT NULL,  
    CONSTRAINT fk_category
        FOREIGN KEY (category_id) 
        REFERENCES categories(category_id)
        ON DELETE RESTRICT  -- Prevents deleting categories with products
);

CREATE OR REPLACE FUNCTION get_or_create_category(p_category_name VARCHAR) 
RETURNS INTEGER AS $$
DECLARE
    v_category_id INTEGER;
BEGIN
    -- Try to find existing category
    SELECT category_id INTO v_category_id
    FROM categories
    WHERE LOWER(category_name) = LOWER(p_category_name);
    
    -- If category doesn't exist, create it
    IF v_category_id IS NULL THEN
        INSERT INTO categories (category_name)
        VALUES (p_category_name)
        RETURNING category_id INTO v_category_id;
    END IF;
    
    RETURN v_category_id;
END;
$$ LANGUAGE plpgsql;
-------- 
-- Insert into categories table
INSERT INTO categories (category_name, description,category_image) 
VALUES 
    ('Electronics', 'Gadgets and devices','https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Ryb25pY3xlbnwwfHwwfHx8MA%3D%3D'),
    ('Clothing', 'Wearable items','https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D'),
    ('Accessories', 'Fashion and functional accessories','https://images.unsplash.com/3/www.madebyvadim.com.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QWNjZXNzb3JpZXN8ZW58MHx8MHx8fDA%3D'),
    ('Personal Care', 'Health and beauty products','https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbmFsJTIwY2FyZXxlbnwwfHwwfHx8MA%3D%3D');

INSERT INTO products (product_name, price, quantity, product_image, category_id)
VALUES 
    ('Laptop', 999.99, 10, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D', 1),
    ('T-Shirt', 19.99, 50, 'https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D', 2),
    ('Red Sneakers', 59.99, 30, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D', 2),
    ('Wireless Headphones', 89.99, 20, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D', 1),
    ('Luxury Watch', 199.99, 15, 'https://plus.unsplash.com/premium_photo-1719289799376-d3de0ca4ddbc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D', 3),
    ('Running Shoes', 79.99, 25, 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3RzfGVufDB8fDB8fHww', 2),
    ('Skincare Cream', 29.99, 40, 'https://plus.unsplash.com/premium_photo-1683887064106-531532ecdf20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D', 4);
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
