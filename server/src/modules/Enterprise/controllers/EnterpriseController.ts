import { Request, Response } from 'express'
import CreateEnterpriseService from '../services/CreateEnterpriseService';
import UpdateEnterpriseService from '../services/UpdateEnterpriseService';
import ListEnterpriseService from '../services/ListEnterpriseService';

interface IRequest {   
    cnpj: string;
    corporateName: string;       
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;    
}


class EnterpriseController {

    public async create(request: Request, response: Response): Promise<Response> {

        const {
            cnpj,
            corporateName,
            name,
            email,
            password,
            passwordConfirmation
        } = request.body;

        const createEnterprise = new CreateEnterpriseService();

        await createEnterprise.execute({ 
            cnpj,
            corporateName,
            email,
            name,
            password,
            passwordConfirmation
        } as IRequest);

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