import { Router } from 'express';

const taskRouter = Router();

taskRouter.get('/', (request, response) => {

    response.status(200).json({ ok: true });
});

export default taskRouter;