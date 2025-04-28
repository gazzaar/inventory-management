import { addNewCategory, getAllCategories } from '../models/queries.js';
async function addCategory(req, res) {
  const { category_name, description, category_image } = req.body;
  await addNewCategory(category_name, description, category_image);
  await getAllCategories();
  res.redirect('/categories');
}
export default addCategory;
