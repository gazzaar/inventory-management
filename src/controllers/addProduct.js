import { addProduct } from '../models/queries.js';

import { getAllProducts } from '../models/queries.js';
async function addNewProduct(req, res) {
  const { product_name, price, quantity, product_image, category } = req.body;
  await addProduct(product_name, price, quantity, product_image, category);
  getAllProducts();
  res.redirect('/products');
}

export default addNewProduct;
