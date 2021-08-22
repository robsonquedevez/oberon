import { getRepository } from 'typeorm';
import AppErrors from '../../../utils/errors/AppErrors';
import User from '../entities/User';

interface IChangeUser {
    id: string;
    name: string;
    administrator: boolean;
    enterprise: string;
}

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

class UpdateUserService {

    public async execute({ id, name, administrator, enterprise }: IChangeUser): Promise<IUser> {

        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: {
                id,
                enterprise
            }
        });

        if(!user) {
            throw new AppErrors(
                'Nenhum usuário encontrado com essas informações',
                400
            );
        }
        
        user.name = name;
        user.administrator = administrator;

        return await userRepository.save(user);
    }
}

export default UpdateUserService;