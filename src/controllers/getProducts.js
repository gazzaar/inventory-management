import { getAllProducts } from '../models/queries.js';

async function getProducts(req, res) {
  const products = await getAllProducts();
  res.send(products);
  res.end();
}

export default { getProducts };
