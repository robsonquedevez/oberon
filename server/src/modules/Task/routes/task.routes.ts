import { Router } from 'express';
import ensureAuthenticated from '../../../routes/middleware/ensureAuthenticated';
import TaskController from '../controllers/TaskController';

const taskController = new TaskController();

const taskRouter = Router();

taskRouter.post('/executing', ensureAuthenticated, taskController.ExecutingTask);
taskRouter.post('/', ensureAuthenticated, taskController.create);
taskRouter.put('/', ensureAuthenticated, taskController.update);
taskRouter.get('/:id', ensureAuthenticated, taskController.findTask);
taskRouter.get('/user/today/:id', ensureAuthenticated, taskController.findTaskToDay);
taskRouter.get('/user/:id', ensureAuthenticated, taskController.findTaskToExecuteUser);
taskRouter.get('/enterprise', ensureAuthenticated, taskController.findAllTaskToEnterprise);

export default taskRouter;