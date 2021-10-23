import { getMongoManager, ObjectID } from "typeorm";
import AppErrors from "../../../utils/errors/AppErrors";
import Coordinate from '../schemas/Coordinate';

interface IPosition {
    id: string;
    lng: string;
    lat: string;
}

interface ICoordinates {
    id: ObjectID;
    task: string;
    coordinates: IPosition[];
}

class FindCoordinatesService {

    public async execute(task: string): Promise<IPosition[]> {

        const coordsRepository = getMongoManager('mongo');

        const coords = await coordsRepository.findOne(Coordinate, { task }, { select: [ 'coordinates' ] });
        
        if(!coords) {
            throw new AppErrors(
                'Nehuma coordenada foi encontrada para essa tarefa',
                400
            );            
        }
        
        return coords.coordinates;
    }
}

export default FindCoordinatesService;