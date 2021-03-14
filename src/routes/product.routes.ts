import { Router } from 'express';
import {
  viewAllProducts,
  insertProduct,
  viewProduct,
  editProduct,
  deleteProduct,
} from '../controllers/productController';

const productRouter = Router();

productRouter.get('/', viewAllProducts);
productRouter.delete('/:idProduct', deleteProduct);
productRouter.post('/', insertProduct);
productRouter.get('/:idProduct', viewProduct);
productRouter.put('/:idProduct', editProduct);

export default productRouter;
