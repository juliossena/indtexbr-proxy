import { authMiddleware, isAdmin } from '../middlewares/authenticated';
import { Router } from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import productRouter from './product.routes';

const router = Router();

router.use('/auth', authRouter);

router.use(authMiddleware);
router.use('/product', productRouter);

router.use(isAdmin);
router.use('/user', userRouter);

export default router;
