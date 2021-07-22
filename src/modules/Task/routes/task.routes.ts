import { Router } from 'express';
import ensureAuthenticated from '../../../routes/middleware/ensureAuthenticated';
import TaskRoundController from '../controllers/TaskRoundController';

const taskRoundController = new TaskRoundController();

const taskRouter = Router();

taskRouter.post('/round', ensureAuthenticated, taskRoundController.create);

export default taskRouter;