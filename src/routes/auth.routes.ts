import { Router } from 'express';
import { auth, getUserData, refreshToken } from '../controllers/authController';
import { authMiddleware, authMiddlewareRefreshToken } from '../middlewares/authenticated';

const authRouter = Router();

authRouter.post('/', auth);

authRouter.use(authMiddlewareRefreshToken);
authRouter.get('/refreshToken', refreshToken);

authRouter.use(authMiddleware);
authRouter.get('/', getUserData);

export default authRouter;
