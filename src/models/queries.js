import pool from './pool.js';
const getAllProducts = async function () {
  const { rows } = await pool.query(`
    SELECT p.*, c.category_name
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
  `);
  return rows;
};

const getAllCategories = async function () {
  const { rows } = await pool.query('SELECT * FROM categories');
  return rows;
};
export { getAllCategories, getAllProducts };
