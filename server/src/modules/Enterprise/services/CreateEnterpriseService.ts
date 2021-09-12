import { getRepository } from 'typeorm';
import Enterprise from "../entities/Enterprise";
import User from '../../User/entities/User';
import AppErrors from "../../../utils/errors/AppErrors";
import hash from '../../../utils/hash/HashProvider';

interface IRequest {   
    cnpj: string;
    corporateName: string;       
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;    
}

class CreateEnterpriseService {

    public async execute({        
        cnpj,
        corporateName,
        email,
        name,
        password,
        passwordConfirmation
        
    }: IRequest): Promise<void> {

        const enterpriseRepository = getRepository(Enterprise);

        const checkedEnterpriseCnpjExists = await enterpriseRepository.findOne({
            where: {
                cnpj
            }
        });

        if(checkedEnterpriseCnpjExists) {
            throw new AppErrors('Já existe um cadastro com esse CNPJ', 400);
        }

        const checkedEnterpriseEmailExists = await enterpriseRepository.findOne({
            where: {
                email
            }
        });

        if(checkedEnterpriseEmailExists) {
            throw new AppErrors('O e-mail informado já está em uso', 400);
        }        

        const userRepository = getRepository(User);

        const checkedUserExists = await userRepository.findOne({
            where: {
                email
            }
        });

        if(checkedUserExists) {
            throw new AppErrors('O e-mail informado já está em uso', 400);
        }

        if(password !== passwordConfirmation) {
            throw new AppErrors('Senhas informadas não conferem', 400);
        }

        const newEnterprise = enterpriseRepository.create({
            cnpj,
            name: corporateName,
            email,
        });

        const enterprise = await enterpriseRepository.save(newEnterprise);

        const user = userRepository.create({
            name,
            email,
            password: await hash.generateHash({ payload: password }),
            administrator: true,
            enterprise: enterprise.cnpj
        });

        await userRepository.save(user);

    }
}

export default CreateEnterpriseService;