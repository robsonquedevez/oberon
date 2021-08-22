import { getRepository } from 'typeorm';
import AppErrors from '../../../utils/errors/AppErrors';
import Enterprise from '../entities/Enterprise';

class ListEnterpriseService {

    public async execute(cnpj: string): Promise<Enterprise> {
        const enterpriseRepository = getRepository(Enterprise);

        const checkedEnterpriseExists = await enterpriseRepository.findOne({
            where: {
                cnpj
            }
        });

        if(!checkedEnterpriseExists) {
            throw new AppErrors('CNPJ não encontrado', 400);
        }

        return checkedEnterpriseExists;
    }
}

export default ListEnterpriseService;