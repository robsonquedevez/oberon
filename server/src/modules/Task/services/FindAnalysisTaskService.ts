import { getMongoManager, getRepository } from "typeorm";
import AppErrors from "../../../utils/errors/AppErrors";
import Task from "../entities/Task";
import Coordinate, { IExecuting } from "../schemas/Coordinate";
import { isEqual, isAfter, isBefore, getTime } from 'date-fns';

interface IFindTask {
    id: string;
    type: string;
    startDate: string;
    endDate: string;
}

interface ICoordinate {
    id: string;
    lng: string;
    lat: string;
}

interface IResponse {
    task: Task;
    coordinates: ICoordinate[];
    executing: IExecuting[];
}

class FindAnalysisTaskService {

    public async execute({ id, type, startDate, endDate }: IFindTask): Promise<IResponse>{

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

        const coordsRepository = getMongoManager('mongo');

        const coordinates = await coordsRepository.findOne(Coordinate, { task: id } );

        if(!coordinates) {
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

        if(type === '0' || startDate === 'none' ){
            throw new AppErrors(
                'Necessário informada data',
                401
            ); 
        }

        let findCoordinateDate = null;

        if(type === '1') {
            findCoordinateDate = coordinates.executing.filter(coord => {
                if(isEqual(
                    getTime(new Date(coord.data)), 
                    getTime(new Date(startDate))
                )) {
                    return coord;
                }
            })
        }else {
            findCoordinateDate = coordinates.executing.filter(coord => {
                if(
                    isBefore(getTime(new Date(startDate)), getTime(new Date(coord.data)))
                    &&
                    isAfter(getTime(new Date(endDate)), getTime(new Date(coord.data)))
                ){                   
                
                    return coord;
                }
            })
        }


        return {
            task,
            coordinates: coordinates.coordinates,
            executing: findCoordinateDate ? findCoordinateDate : coordinates.executing
        }        
    }
}

export default FindAnalysisTaskService;