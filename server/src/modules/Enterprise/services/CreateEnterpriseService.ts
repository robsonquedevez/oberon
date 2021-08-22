import { getRepository } from 'typeorm';
import Enterprise from "../entities/Enterprise";
import AppErrors from "../../../utils/errors/AppErrors";

class CreateEnterpriseService {

    public async execute({
        cnpj,
        name,
        email,
        address,
        number,
        district,
        city,
        state,
        zip_code
    }: Enterprise): Promise<Enterprise> {

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

        const newEnterprise = enterpriseRepository.create({
            cnpj,
            name,
            email,
            address,
            number,
            district,
            city,
            state,
            zip_code
        });

        return await enterpriseRepository.save(newEnterprise);
    }
}

export default CreateEnterpriseService;