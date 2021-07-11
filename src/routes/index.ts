import { Router } from 'express';

import userRouter from '../modules/User/routes/user.routes';
import enterpriseRouter from '../modules/Enterprise/routes/enterprise.routes';
import taskRouter from '../modules/Task/routes/task.routes';
import sessionRouter from '../modules/User/routes/session.routes';

const routes = Router();

routes.use('/session', sessionRouter);
routes.use('/user', userRouter);
routes.use('/enterprise', enterpriseRouter);
routes.use('/task', taskRouter);

export default routes;