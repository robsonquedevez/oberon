import { Router } from "express";
import UserController from '../controllers/UserController';
import ensureAuthenticated from '../../../routes/middleware/ensureAuthenticated';

const userController = new UserController();
const userRouter = Router();

userRouter.post('/', userController.create);
userRouter.get('/:enterprise', ensureAuthenticated, userController.listAll);
userRouter.get('/', ensureAuthenticated, userController.findById);
userRouter.put('/', ensureAuthenticated, userController.update);
userRouter.patch('/', ensureAuthenticated, userController.changePassword)
userRouter.delete('/', ensureAuthenticated, userController.delete)

export default userRouter;