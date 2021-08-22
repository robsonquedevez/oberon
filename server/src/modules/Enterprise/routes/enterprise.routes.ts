import { Router } from "express";
import ensureAuthenticated from "../../../routes/middleware/ensureAuthenticated";
import EnterpriseController from "../controllers/EnterpriseController";

const enterpriseController = new EnterpriseController();

const enterpriseRouter = Router();

enterpriseRouter.post('/', enterpriseController.create);
enterpriseRouter.put('/', ensureAuthenticated, enterpriseController.update);
enterpriseRouter.get('/', ensureAuthenticated, enterpriseController.findById);

export default enterpriseRouter;