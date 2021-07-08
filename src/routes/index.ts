import { Router } from 'express';

import userRouter from '../modules/User/routes/user.routes';
import enterpriseRouter from '../modules/Enterprise/routes/enterprise.routes';
import taskRouter from '../modules/Task/routes/task.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/enterprise', enterpriseRouter);
routes.use('/task', taskRouter);

export default routes;