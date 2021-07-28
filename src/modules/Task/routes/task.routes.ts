import { Router } from 'express';
import ensureAuthenticated from '../../../routes/middleware/ensureAuthenticated';
import TaskController from '../controllers/TaskController';

const taskController = new TaskController();

const taskRouter = Router();

taskRouter.post('/round', ensureAuthenticated, taskController.create);

export default taskRouter;