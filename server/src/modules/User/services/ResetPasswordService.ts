import { getRepository } from 'typeorm';
import AppErrors from '../../../utils/errors/AppErrors';
import User from '../entities/User';
import hash from '../../../utils/hash/HashProvider';

interface IChangeUser {
    id: string;
    currentPassword: string;
    newPassword: string;
    confirmationPassword: string;
}

class UpdateUserService {

    public async execute({ id, currentPassword, newPassword, confirmationPassword }: IChangeUser): Promise<void> {

        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: {
                id
            }
        });

        if(!user) {
            throw new AppErrors(
                'Nenhum usuário encontrado com essas informações',
                400
            );
        }

        const passwordMatched = await hash.compareHash({
            payload: currentPassword,
            hashed: user.password
        });      

        if(!passwordMatched) {
            throw new AppErrors('Senha atual não confere');
        } 

        if(newPassword !== confirmationPassword) {
            throw new AppErrors('Nova senha e confirmação não conferem');
        }

        const passwordHash = await hash.generateHash({ payload: newPassword });

        user.password = passwordHash;

        await userRepository.save(user);

        return;
    }
}

export default UpdateUserService;