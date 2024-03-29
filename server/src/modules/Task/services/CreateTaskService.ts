import { getRepository, getMongoRepository } from 'typeorm';
import { isBefore, isAfter } from 'date-fns';
import Task from '../entities/Task';
import verifyToTaskAlreadyExists from './VerifyToTaskAlreadyExists';
import AppErrors from '../../../utils/errors/AppErrors';
import Coordinate from '../schemas/Coordinate';

interface LngLat {
    id: string;
    name: string;
    lng: string;
    lat: string;
}

interface ITask {
    type: number;
    title: string;
    created_user: string;
    enterprise: string;
    executing_user: string;
    status_task: number;
    start_task: Date;
    end_task: Date;
    repeat: boolean;
    days_of_the_week: string;
    finished: boolean;
    coordinates: LngLat[];
}

class CreateTaskService {

    public async execute({
        type,
        title,
        created_user, 
        enterprise,
        executing_user,
        status_task,
        start_task,
        end_task,
        repeat,
        days_of_the_week,
        finished,
        coordinates
    }: ITask): Promise<ITask> {
        
        const taskRepository = getRepository(Task);

        const checkedStartDateTask = isBefore(new Date(start_task), new Date());

        if(checkedStartDateTask) {
            throw new AppErrors(
                'Data de início da tarefa é menor que a data atual',
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

        await verifyToTaskAlreadyExists.execute({
            executing_user,
            start_task, 
            end_task,
            repeat, 
            days_of_the_week
        });        

        const task = taskRepository.create({
            type,
            title,
            created_user,
            enterprise,
            executing_user,
            status_task,
            start_task,
            end_task,
            repeat,
            days_of_the_week,
            finished
        });
        
        await taskRepository.save(task);

        const coordinatesRepository = getMongoRepository(Coordinate, 'mongo');

        const coordinatesTask = coordinatesRepository.create({
            task: task.id,
            coordinates,
            executing: []
        });

        await coordinatesRepository.save(coordinatesTask);

        return { ...task, coordinates }
    }
}   

export default CreateTaskService;