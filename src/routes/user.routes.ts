import { Router } from 'express';
import {
  viewAllUser,
  insertUser,
  viewUser,
  editUser,
  deleteUser,
} from '../controllers/userController';

const userRouter = Router();

userRouter.get('/', viewAllUser);
userRouter.delete('/:idUser', deleteUser);
userRouter.post('/', insertUser);
userRouter.get('/:idUser', viewUser);
userRouter.put('/:idUser', editUser);

export default userRouter;
