import { Request, Response } from 'express';
import CreateTaskService from '../services/CreateTaskService';

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
            finished } = request.body;

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
}

export default TaskController;