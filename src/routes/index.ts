import { Router } from 'express';

import userRouter from '../modules/User/routes/user.routes';
import enterpriseRouter from '../modules/Enterprise/routes/enterprise.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/enterprise', enterpriseRouter);

export default routes;