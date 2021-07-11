import { Router } from "express";
import UserController from '../controllers/UserController';
import ensureAuthenticated from '../../../routes/middleware/ensureAuthenticated';

const userController = new UserController();
const userRouter = Router();

userRouter.post('/', userController.create);
userRouter.get('/', ensureAuthenticated, userController.findById);

export default userRouter;