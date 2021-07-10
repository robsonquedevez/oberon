import { Router } from "express";
import EnterpriseController from "../controllers/EnterpriseController";

const enterpriseController = new EnterpriseController();

const enterpriseRouter = Router();

enterpriseRouter.post('/', enterpriseController.create);

enterpriseRouter.get('/', (request, response) => {

    response.status(200).json({ ok: true });
});

export default enterpriseRouter;