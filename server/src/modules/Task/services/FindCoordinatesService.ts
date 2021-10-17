import { getMongoRepository, getMongoManager } from "typeorm";
import AppErrors from "../../../utils/errors/AppErrors";
import Coordinate from '../schemas/Coordinate';

interface ICoordinates {
    lng: string;
    lat: string;
}

interface ICoordsDocument {
    _id: string;
    task: string;
    coordinates: ICoordinates[];
}

class FindCoordinatesService {

    public async execute(task: string): Promise<ICoordinates[]> {

        const coordsRepository = getMongoRepository(Coordinate, 'mongo');

        const coords = await coordsRepository.createCursor(
            coordsRepository.find()
        ).toArray() as ICoordsDocument[];

        
        if(!coords[0]) {
            throw new AppErrors(
                'Nehuma coordenada foi encontrada para essa tarefa',
                400
            );            
        }
        
        const taskCoord = coords.filter(coord => coord.task === task)[0];

        if(!taskCoord) {
            throw new AppErrors(
                'Nehuma coordenada foi encontrada para essa tarefa',
                400
            );            
        }
        
        return taskCoord.coordinates;
    }
}

export default FindCoordinatesService;