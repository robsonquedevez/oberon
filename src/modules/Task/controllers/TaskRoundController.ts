import { Request, Response } from 'express';
import CreateRoundTaskService from '../services/CreateRoundTaskService';

class TaskRoundController {

    public async create(request: Request, response: Response): Promise<Response> {

        const user = request.user;

        const {  
            type,
            created_user, 
            enterprise,
            executing_user,
            status_task,
            start_task,
            end_task,
            repeat,
            days_of_the_week,
            finished } = request.body;

        const createRoundTask = new CreateRoundTaskService();

        const task = await createRoundTask.execute({
            type,
            created_user, 
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

export default TaskRoundController;