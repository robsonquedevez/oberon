import { Router } from 'express';
import ensureAuthenticated from '../../../routes/middleware/ensureAuthenticated';
import TaskController from '../controllers/TaskController';

const taskController = new TaskController();

const taskRouter = Router();

taskRouter.post('/', ensureAuthenticated, taskController.create);
taskRouter.put('/', ensureAuthenticated, taskController.update);
taskRouter.get('/', ensureAuthenticated, taskController.findTaskToExecuteUser);

export default taskRouter;