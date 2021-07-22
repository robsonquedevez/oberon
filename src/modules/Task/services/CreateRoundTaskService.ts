import { getRepository } from 'typeorm';
import { isBefore, isAfter } from 'date-fns';
import Task from '../entities/Task';
import verifyToTaskAlreadyExists from './VerifyToTaskAlreadyExists';
import AppErros from '../../../utils/errors/AppErrors';

interface ITask {
    type: number;
    created_user: string;
    enterprise: string;
    executing_user: string;
    status_task: number;
    start_task: Date;
    end_task: Date;
    repeat: boolean;
    days_of_the_week: string;
    finished: boolean;
}

class CreateRoundTaskService {

    public async execute({
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
    }: ITask): Promise<Task> {
        
        const taskRepository = getRepository(Task);

        const checkedStartDateTask = isBefore(new Date(start_task), new Date());

        if(checkedStartDateTask) {
            throw new AppErros(
                'Data de início da tarefa é menor que a data atual',
                400
            );
        }

        const checkedStartDateGreaterThanEnd = isAfter(new Date(start_task), new Date(end_task));

        if(checkedStartDateGreaterThanEnd) {
            throw new AppErros(
                'Data de inícial maior que data final',
                400
            );
        }

        await verifyToTaskAlreadyExists.execute({
            executing_user,
            start_task, 
            end_task,
            repeat, 
            days_of_the_week
        });        

        const task = taskRepository.create({
            type,
            created_user,
            enterprise,
            executing_user,
            status_task,
            start_date: start_task,
            end_date: end_task,
            repeat,
            days_of_the_week,
            finished
        });        
        
        return await taskRepository.save(task);
    }
}   

export default CreateRoundTaskService;