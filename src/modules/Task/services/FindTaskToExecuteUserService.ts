import { getRepository } from "typeorm";
import AppErrors from "../../../utils/errors/AppErrors";
import Task from "../entities/Task";

interface IFindTaskToExecuteUserService {
    executing_user: string;
}

class FindTaskToExecuteUserService {

    public async execute({ executing_user }: IFindTaskToExecuteUserService): Promise<Task[]>{

        const taskRepository = getRepository(Task);

        const tasks = await taskRepository.find({
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
        return tasks;
    }
}

export default FindTaskToExecuteUserService;