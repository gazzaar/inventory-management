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

const addProduct = async function (
  product_name,
  price,
  quantity,
  product_image,
  categoryName // User provides category name
) {
  // First, check if the category exists
  const categoryResult = await pool.query(
    'SELECT category_id FROM categories WHERE LOWER(category_name) = LOWER($1)',
    [categoryName]
  );

  let categoryId;

  if (categoryResult.rows.length > 0) {
    // Category exists, use its ID
    categoryId = categoryResult.rows[0].category_id;
  } else {
    // Category doesn't exist, create it with the product image as category image
    // and an empty description for now
    const newCategoryResult = await pool.query(
      'INSERT INTO categories (category_name, description, category_image) VALUES ($1, $2, $3) RETURNING category_id',
      [categoryName, '', product_image] // Using product_image for category_image
    );
    categoryId = newCategoryResult.rows[0].category_id;
  }

  // Now insert the product with the correct category_id
  await pool.query(
    'INSERT INTO products (product_name, price, quantity, product_image, category_id) VALUES ($1, $2, $3, $4, $5)',
    [product_name, price, quantity, product_image, categoryId]
  );
};

async function addNewCategory(name, description, image) {
  try {
    let categoryExist = await pool.query(
      'SELECT category_id FROM categories WHERE LOWER(category_name) = LOWER($1)',
      [name]
    );
    if (categoryExist.rows.length > 0) return 'Category Already Exists';
    await pool.query(
      'INSERT INTO categories (category_name,description,category_image) VALUES($1,$2,$3)',
      [name, description, image]
    );
  } catch (err) {
    console.log(err);
  }
}
export { addNewCategory, addProduct, getAllCategories, getAllProducts };
