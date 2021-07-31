import { Request, Response } from 'express';
import CreateTaskService from '../services/CreateTaskService';
import UpdateTaskService from '../services/UpdateTaskService';
import FindTaskToExecuteUserService from '../services/FindTaskToExecuteUserService';

class TaskController {

    public async create(request: Request, response: Response): Promise<Response> {

        const user = request.user;

        const {  
            type,
            enterprise,
            executing_user,
            status_task,
            start_task,
            end_task,
            repeat,
            days_of_the_week,
            finished
        } = request.body;

        const createTask = new CreateTaskService();

        const task = await createTask.execute({
            type,
            created_user: user.id, 
            enterprise,
            executing_user,
            status_task,
            start_task,
            end_task,
            repeat,
            days_of_the_week,
            finished 
        });

        return response.status(201).json(task);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const user = request.user;

        const { 
            id,
            executing_user,
            status_task,
            start_task,
            end_task,
            repeat,
            days_of_the_week,
            finished
        } = request.body;

        const updateTask = new UpdateTaskService();

        const task = await updateTask.execute({
            id,
            update_user: user.id, 
            executing_user,
            status_task,
            start_task,
            end_task,
            repeat,
            days_of_the_week,
            finished 
        });

        return response.status(201).json(task);
    }

    public async findTaskToExecuteUser(request: Request, response: Response): Promise<Response> {       

        const { executing_user } = request.body;

        const findTaskToExecuteUser = new FindTaskToExecuteUserService();

        const tasks = await findTaskToExecuteUser.execute({ executing_user });

        return response.status(200).json({ tasks });
    }
}

export default TaskController;