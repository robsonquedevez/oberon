import { Request, Response } from 'express'
import CreateEnterpriseService from '../services/CreateEnterpriseService';
import Enterprise from '../entities/Enterprise';

class EnterpriseController {

    public async create(request: Request, response: Response): Promise<Response> {

        const {
            cnpj,
            name,
            email,
            address,
            number,
            district,
            city,
            state,
            zip_code
        } = request.body;

        const createEnterprise = new CreateEnterpriseService();

        await createEnterprise.execute({ 
            cnpj,
            name,
            email,
            address,
            number,
            district,
            city,
            state,
            zip_code
        } as Enterprise);

        return response.status(201).send();
    }
}

export default EnterpriseController;