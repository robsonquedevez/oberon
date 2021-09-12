import { Request, Response } from 'express'
import CreateEnterpriseService from '../services/CreateEnterpriseService';
import UpdateEnterpriseService from '../services/UpdateEnterpriseService';
import Enterprise from '../entities/Enterprise';
import ListEnterpriseService from '../services/ListEnterpriseService';

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

    public async update(request: Request, response: Response): Promise<Response> {

        const { id } = request.user;

        const {
            cnpj,
            name,
            address,
            number,
            district,
            city,
            state,
            zip_code
        } = request.body;

        const updateEnterprise = new UpdateEnterpriseService();

        const enterprise = await updateEnterprise.execute({
            id,
            cnpj,
            name,
            address,
            number,
            district,
            city,
            state,
            zip_code
        });

        return response.status(201).json({ enterprise });
    }

    public async findById(request: Request, response: Response): Promise<Response> {

        const { cnpj } = request.params;

        const listEnterprise = new ListEnterpriseService();

        const enterprise = await listEnterprise.execute(cnpj as string);

        return response.status(200).json({ enterprise });
    }
}

export default EnterpriseController;