import { Router } from "express";

const enterpriseRouter = Router();

enterpriseRouter.get('/', (request, response) => {

    response.status(200).json({ ok: true });
});

export default enterpriseRouter;