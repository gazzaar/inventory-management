import { Router } from 'express';
import addNewProduct from '../controllers/addProduct.js';
import getProductController from '../controllers/getProducts.js';
const productRouter = Router();
productRouter.get('/', getProductController.getProducts);
productRouter.post('/create', addNewProduct);
export default productRouter;
