import { getRepository } from 'typeorm';
import AppErrors from '../../../utils/errors/AppErrors';
import User from '../entities/User';

interface IUser {
    id: string;
    name: string;
    email: string;
    password?: string;
    administrator: boolean;
    enterprise: string;
    created_at: Date;
    updated_at: Date;
}

class ListProfileService {

    public async execute(id: string): Promise<IUser> {
        const userRepository = getRepository(User);

        const checkedUserExists = await userRepository.findOne({
            where: {
                id
            }
        });

        if(!checkedUserExists) {
            throw new AppErrors('ID do usuário não encontrado', 400);
        }

        return checkedUserExists;
    }
}

export default ListProfileService;