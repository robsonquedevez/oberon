import { getRepository } from 'typeorm';
import Enterprise from '../entities/Enterprise';
import User from '../../User/entities/User';
import AppErrors from '../../../utils/errors/AppErrors';

interface IEnterprise {
    id: string,
    cnpj: string;
    name: string;
    address: string;
    number: number;
    district: string;
    city: string;
    state: string;
    zip_code: number;
}

class UpdateEnterpriseService {

    public async execute({
        id,
        cnpj,
        name, 
        address, 
        number, 
        district, 
        city,
        state,
        zip_code
    }: IEnterprise): Promise<Enterprise> {

        const enterpriseRepository = getRepository(Enterprise);

        const enterprise = await enterpriseRepository.findOne({
            where: {
                cnpj
            }
        });

        if(!enterprise) {
            throw new AppErrors(
                'Nenhuma empresa encontrada com essas informações',
                400
            );
        }

        const userRepository = getRepository(User);

        const updateUser = await userRepository.findOne({
            where: {
                id
            }
        });

        if(!updateUser) {
            throw new AppErrors(
                'Nenhum usuário encontrada com essas informações',
                400
            );
        }

        if(updateUser.enterprise !== enterprise.cnpj) {
            throw new AppErrors(
                'Usuário não tem privilégio para alterar dados da empresa',
                400
            );
        }

        enterprise.name = name;
        enterprise.address = address;
        enterprise.number = number;
        enterprise.district = district;
        enterprise.city = city;
        enterprise.state = state;
        enterprise.zip_code = zip_code;

        await enterpriseRepository.save(enterprise);

        return enterprise;
    }
}

export default UpdateEnterpriseService;
