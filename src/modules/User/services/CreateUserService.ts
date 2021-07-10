import { getRepository } from 'typeorm';
import AppErrors from '../../../utils/errors/AppErrors';
import User from '../entities/User';
import Enterprise from '../../Enterprise/entities/Enterprise';

class CreateUserService {

    public async execute(user: User): Promise<User> {

        const userRepository = getRepository(User);

        const checkedUserExists = await userRepository.findOne({
            where: {
                email: user.email
            }
        });

        if(checkedUserExists) {
            throw new AppErrors(
                'Já existe um usuário cadastrado com esse e-mail',
                400
            );
        }

        const enterpriseRepository = getRepository(Enterprise);

        const checkedEnterpriseExists = await enterpriseRepository.findOne({
            where: {
                cnpj: user.enterprise
            }
        });

        if(!checkedEnterpriseExists) {
            throw new AppErrors(
                'Empresa informada não está cadastra',
                400
            );
        }

        const newUser = userRepository.create(user);

        return await userRepository.save(newUser);
    }
}

export default CreateUserService;