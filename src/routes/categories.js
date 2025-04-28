import { Router } from 'express';
import addCategory from '../controllers/addCategory.js';
import getCategories from '../controllers/getCategories.js';
const categoriesRouter = Router();
categoriesRouter.get('/', getCategories);
categoriesRouter.post('/create', addCategory);
export default categoriesRouter;
