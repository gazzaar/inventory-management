import { getAllProducts } from '../models/queries.js';

async function getProducts(req, res) {
  const products = await getAllProducts();
  res.render('products', { products: products });
}

export default { getProducts };
