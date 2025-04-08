import pool from './pool.js';
const getAllProducts = async function () {
  const { rows } = await pool.query('SELECT * FROM products');
  return rows;
};

const getAllCategories = async function () {
  const { rows } = await pool.query('SELECT * FROM categories');
  return rows;
};
export { getAllCategories, getAllProducts };
