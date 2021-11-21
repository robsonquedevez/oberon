import { format } from 'date-fns';
import Task from '../entities/Task';
import FindCoordinatesService from './FindCoordinatesService';

interface IRequest {
    tasks: Task[]
}

class VerifyRunningTaskToday {

    public static async execute({ tasks }: IRequest): Promise<Task[]> {

        const findCoordinates = new FindCoordinatesService();              

        const taskVerificate = await Promise.all(tasks.map( async (task) => {

            if(task.finished){
                return task;
            }

            const coordinates = await findCoordinates.execute(task.id);

            coordinates.executing.map(coord => {   
                if( !!coord && coord.data === format(new Date(), 'yyyy-MM-dd')){
                    task.finished = true;
                }
            });

            return task;
        })); 
        
        return taskVerificate;
    }

}

export default VerifyRunningTaskToday;