import { getRepository } from "typeorm";
import AppErrors from "../../../utils/errors/AppErrors";
import Task from "../entities/Task";
import VerifyRunningTaskToday from '../services/VerifyRunningTaskToday';

interface IFindTaskToExecuteUserService {
    executing_user: string;
}

class FindTaskToExecuteUserService {

    public async execute({ executing_user }: IFindTaskToExecuteUserService): Promise<Task[]>{

        const taskRepository = getRepository(Task);

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
                executing_user
            }
        });

        if(!tasks) {
            throw new AppErrors(
                'Nenhuma tarefa encontrada para esse usuário',
                401
            );            
        }

        const taskVerificate = await VerifyRunningTaskToday.execute({ tasks });
        
        return taskVerificate
    }
}

export default FindTaskToExecuteUserService;