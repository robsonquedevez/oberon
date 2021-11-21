import { getMongoManager, ObjectID } from "typeorm";
import AppErrors from "../../../utils/errors/AppErrors";
import Coordinate from '../schemas/Coordinate';

class FindCoordinatesService {

    public async execute(task: string): Promise<Coordinate> {

        const coordsRepository = getMongoManager('mongo');

        const coords = await coordsRepository.findOne(Coordinate, { task });
        
        if(!coords) {
            throw new AppErrors(
                'Nehuma coordenada foi encontrada para essa tarefa',
                400
            );            
        }
        
        return coords;
    }
}

export default FindCoordinatesService;