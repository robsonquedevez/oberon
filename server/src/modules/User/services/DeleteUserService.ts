import { getRepository } from 'typeorm';
import AppErrors from '../../../utils/errors/AppErrors';
import User from '../entities/User';


class DeleteUserService {

    public async execute(id: string): Promise<void> {

        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: {
                id
            }
        });

        if(!user) {
            throw new AppErrors(
                'Nenhum usuário encontrado. Tente novamente',
                401
            );
        }

        userRepository.delete(id);
    }
}

export default DeleteUserService;