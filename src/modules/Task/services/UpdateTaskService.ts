import { getRepository } from 'typeorm';
import { isAfter } from 'date-fns';
import Task from '../entities/Task';
import User from '../../User/entities/User';
import verifyToTaskAlreadyExists from './VerifyToTaskAlreadyExists';
import AppErrors from '../../../utils/errors/AppErrors';

interface ITask {
    id: string;
    update_user: string;
    executing_user: string;
    status_task: number;
    start_task: Date;
    end_task: Date;
    repeat: boolean;
    days_of_the_week: string;
    finished: boolean;
}

class UpdateTaskService {

    public async execute({
        id,
        update_user,
        executing_user,
        status_task,
        start_task,
        end_task,
        repeat,
        days_of_the_week,
        finished
    }: ITask): Promise<Task> {
        
        const taskRepository = getRepository(Task);

        const task = await taskRepository.findOne({
            where: {
                id
            }
        });

        if(!task) {
            throw new AppErrors(
                'Nenhuma tarefa encontrada com esses informações',
                400
            );
        }

        const checkedStartDateGreaterThanEnd = isAfter(new Date(start_task), new Date(end_task));

        if(checkedStartDateGreaterThanEnd) {
            throw new AppErrors(
                'Data de inícial maior que data final',
                400
            );
        }

        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: {
                id: update_user
            }
        });

        if(!user) {
            throw new AppErrors(
                'Dados do usuário não encontrados para permitir atualização. tente novmanente',
                400
            );
        }

        if(task.created_user !== update_user && task.enterprise !== user.enterprise) {
            throw new AppErrors(
                'Usuário não pode realizar atualização dessa tarefa. Procure o administrator da empresa',
                400
            );
        }

        await verifyToTaskAlreadyExists.execute({
            executing_user,
            start_task, 
            end_task,
            repeat, 
            days_of_the_week,
            update: true,
            task_id: task.id
        });

        task.executing_user = executing_user;
        task.status_task = status_task;
        task.start_task = start_task;
        task.end_task = end_task;
        task.repeat = repeat;
        task.days_of_the_week = days_of_the_week;
        task.finished = finished;

        return await taskRepository.save(task);
    }
}   

export default UpdateTaskService;