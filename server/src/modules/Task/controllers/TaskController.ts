import { Request, Response } from 'express';
import CreateTaskService from '../services/CreateTaskService';
import UpdateTaskService from '../services/UpdateTaskService';
import FindTaskToExecuteUserService from '../services/FindTaskToExecuteUserService';
import FindAllTaskToEnterpriseService from '../services/FindAllTasktoEnterpriseService';
import FindTask from '../services/FindTaskService';
import FindTaskTodayToExecuteUserService from '../services/FindTaskTodayToExecuteUserService';
import ExecutingTaskService from '../services/ExecutingTaskService';
import FindAnalysisTaskService from '../services/FindAnalysisTaskService';

class TaskController {

    public async create(request: Request, response: Response): Promise<Response> {

        const user = request.user;

        const {  
            type,
            title,
            enterprise,
            executing_user,
            status_task,
            start_task,
            end_task,
            repeat,
            days_of_the_week,
            finished,
            coordinates
        } = request.body;

        const createTask = new CreateTaskService();

        const task = await createTask.execute({
            type,
            title,
            created_user: user.id, 
            enterprise,
            executing_user,
            status_task,
            start_task,
            end_task,
            repeat,
            days_of_the_week,
            finished,
            coordinates
        });

        return response.status(201).json(task);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const user = request.user;

        const { 
            id,
            title,
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
            title,
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

        const { id } = request.params;

        const findTaskToExecuteUser = new FindTaskToExecuteUserService();

        const tasks = await findTaskToExecuteUser.execute({ executing_user: id });

        return response.status(200).json(tasks);
    }

    public async findAllTaskToEnterprise(request: Request, response: Response): Promise<Response> {

        const { enterprise } = request.body;

        const findAllTaskToEnterprise = new FindAllTaskToEnterpriseService();

        const tasks = await findAllTaskToEnterprise.execute({ enterprise });

        return response.status(200).json({ tasks });
    }

    public async findTask(request: Request, response: Response): Promise<Response> {
        
        const { id } = request.params;

        const findTask = new FindTask();

        const tasks = await findTask.execute({ id });

        return response.status(200).json(tasks);

    }

    public async findTaskToDay(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;

        const findTaskToDayToExecutingUser = new FindTaskTodayToExecuteUserService();

        const tasks = await findTaskToDayToExecutingUser.execute({ id });

        return response.status(200).json(tasks);
    }

    public async ExecutingTask(request: Request, response: Response): Promise<Response> {

        const { id, coordinates, markers } = request.body;

        const executingTask = new ExecutingTaskService();

        await executingTask.execute({ id, coordinates, markers });

        return response.status(200);
    }

    public async FindAnalysis(request: Request, response: Response): Promise<Response> {

        const { id, type, start, end } = request.params;

        console.log(id, type, start, end);

        const findAnalysisTask = new FindAnalysisTaskService();

        const tasks = await findAnalysisTask.execute({ id, type, startDate: start, endDate: end });

        return response.status(200).json(tasks);
    }
}

export default TaskController;