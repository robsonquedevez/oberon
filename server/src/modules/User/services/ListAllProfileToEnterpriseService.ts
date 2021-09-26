import { getRepository } from 'typeorm';
import AppErrors from '../../../utils/errors/AppErrors';
import User from '../entities/User';

interface IUser {
    id: string;
    name: string;
    email: string;
    administrator: boolean;
    enterprise: string;
}

class ListAllProfileToEnterpriseService {

    public async execute(enterprise: string ): Promise<IUser[]> {
        const userRepository = getRepository(User);

        const users = await userRepository.find({
            select: ['id', 'name', 'email', 'enterprise', 'administrator'],
            where: {
                enterprise
            }
        });

        if(!users) {
            throw new AppErrors('Nenhum usuário encontrado', 400);
        }

        return users;
    }
}

export default ListAllProfileToEnterpriseService;