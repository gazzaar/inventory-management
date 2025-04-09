import { getAllCategories } from '../models/queries.js';

async function getCategories(req, res) {
  const categories = await getAllCategories();
  res.render('categories', { categories: categories });
}

export default { getCategories };
