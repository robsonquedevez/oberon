import { getRepository, getMongoManager } from 'typeorm';
import { format } from 'date-fns';
import AppErrors from '../../../utils/errors/AppErrors';
import Task from '../entities/Task';
import Coordinate from '../schemas/Coordinate';

interface IExecutingMarkers {
    id: string;
    latitude: number;
    longitude: number;
    concluded: boolean;
    datetime: number;
}

interface IExecuteCoordinates {
    latitude: number;
    longitude: number;
    timestamp: number;
}

interface IRequest {
    id: string;
    coordinates: IExecuteCoordinates[];
    markers: IExecutingMarkers[];
}

class ExecutingTaskService {

    public async execute({ 
        id,
        coordinates,
        markers
    }: IRequest): Promise<void> {

        const taskRepository = getRepository(Task);

        const task = await taskRepository.findOne({
            where: {
                id
            }
        });

        if(!task) {
            throw new AppErrors(
                'A tarefa executada não foi encontrada. Tente novamente',
                401
            );
        }

        if(!task.repeat) {
            task.finished = true;
        }

        await taskRepository.save(task);

        const currentDate = format(new Date(), 'yyyy-MM-dd');

        const coordinatesRepository = getMongoManager('mongo');

        const coordinatesTask = await coordinatesRepository.findOne(Coordinate, { task: id });

        if(!coordinatesTask) {
            throw new AppErrors(
                'A tarefa executada não foi encontrada. Tente novamente',
                401
            );
        }        

        await coordinatesRepository.findOneAndUpdate(
            Coordinate, 
            { task: { $eq: id } },
            { $push: { executing: { data:  currentDate, coordinates, markers } } }, 
            { upsert: true, returnOriginal: true }
        );        
    }
}

export default ExecutingTaskService;