import { Router } from "express";
import UserController from '../controllers/UserController';

const userController = new UserController();

const userRouter = Router();

userRouter.post('/', userController.create);

userRouter.get('/', (request, response) => {

    response.status(200).json({ ok: true });
});

export default userRouter;