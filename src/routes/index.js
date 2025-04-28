import { Router } from 'express';
const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.redirect('/products');
});

export default indexRouter;
