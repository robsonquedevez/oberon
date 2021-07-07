import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (request, response) => {

    response.status(200).json({ ok: true });
});

export default userRouter;