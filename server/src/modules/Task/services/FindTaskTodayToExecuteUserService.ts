import { Between, getRepository } from "typeorm";
import { format } from 'date-fns';
import AppErrors from "../../../utils/errors/AppErrors";
import Task from "../entities/Task";
import VerifyRunningTaskToday from '../services/VerifyRunningTaskToday';

interface IFindTaskToExecuteUserService {
    id: string;
}

class FindTaskTodayToExecuteUserService {

    public async execute({ id }: IFindTaskToExecuteUserService): Promise<Task[]>{

        const taskRepository = getRepository(Task);

        const currentDate = format(new Date(), 'yyyy-MM-dd');
        const startBetween = currentDate + ' 00:00:00';
        const endBetween = currentDate + ' 23:59:59';

        const tasks = await taskRepository.find({
            select:[
                "id",
                "title",
                "type",
                "enterprise",
                "finished", 
                "start_task",
                "end_task",
                "repeat", 
                "days_of_the_week", 
                "status_task",
                "executing_user",
                "created_user"
            ],
            where: {
                executing_user: id,
                start_task: Between(startBetween, endBetween)
            }
        });

        if(tasks.length === 0) {
            throw new AppErrors(
                'Nenhuma tarefa encontrada para esse usuário',
                401
            );            
        }

        const taskVerificate = await VerifyRunningTaskToday.execute({ tasks });

        return taskVerificate;
    }
}

export default FindTaskTodayToExecuteUserService;