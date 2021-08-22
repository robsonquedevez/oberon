import { Request, Response } from 'express';
import FindCoordinatesService from '../services/FindCoordinatesService';

class CoordinateController {   

    public async findCoordinateToTask(request: Request, response: Response): Promise<Response> {       

        const { task } = request.query;

        const findCoordinates = new FindCoordinatesService();

        const coords = await findCoordinates.execute(String(task));

        return response.status(200).json({ coords });
    }
}

export default CoordinateController;