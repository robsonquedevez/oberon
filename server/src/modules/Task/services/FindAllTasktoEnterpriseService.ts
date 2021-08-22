import { getRepository } from "typeorm";
import AppErrors from "../../../utils/errors/AppErrors";
import Task from "../entities/Task";

interface IFindAllTaskToEnterpriseService {
    enterprise: string;
}

class FindAllTaskToEnterpriseService {

    public async execute({ enterprise }: IFindAllTaskToEnterpriseService): Promise<Task[]>{

        const taskRepository = getRepository(Task);

        const tasks = await taskRepository.find({
            where: {
                enterprise
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

export default FindAllTaskToEnterpriseService;