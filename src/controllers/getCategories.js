import { getAllCategories } from '../models/queries.js';

async function getCategories(req, res) {
  const categories = await getAllCategories();
  res.send(categories);
  res.end();
}

export default { getCategories };
