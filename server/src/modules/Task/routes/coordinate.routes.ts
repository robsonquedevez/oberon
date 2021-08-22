import { Router } from 'express';
import ensureAuthenticated from '../../../routes/middleware/ensureAuthenticated';
import CoordinateController from '../controllers/CoordinateController';

const coordinateController = new CoordinateController();

const coordinateRouter = Router();

coordinateRouter.get('/', ensureAuthenticated, coordinateController.findCoordinateToTask);

export default coordinateRouter;