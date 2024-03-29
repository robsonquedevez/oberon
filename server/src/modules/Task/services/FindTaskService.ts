import { getRepository } from "typeorm";
import AppErrors from "../../../utils/errors/AppErrors";
import Task from "../entities/Task";
import FindCoordinatesService from './FindCoordinatesService';

interface IFindTask {
    id: string;
}

interface ICoordinate {
    id: string;
    lng: string;
    lat: string;
}

interface IResponse {
    task: Task,
    coordinates: ICoordinate[]
}

class FindTask {

    public async execute({ id }: IFindTask): Promise<IResponse>{

        const taskRepository = getRepository(Task);

        const task = await taskRepository.findOne({
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
                id
            }
        });

        const findCoordinates = new FindCoordinatesService();

        const coordinates = await findCoordinates.execute(id);

        if(coordinates.coordinates.length === 0) {
            throw new AppErrors(
                'Nenhum ponto no mapa encontrado',
                401
            );            
        }

        if(!task) {
            throw new AppErrors(
                'Nenhuma tarefa encontrada para esse usuário',
                401
            );            
        }

        return {
            task,
            coordinates: coordinates.coordinates
        };
    }
}

export default FindTask;