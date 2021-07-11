import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import User from '../entities/User';
import AppErrors from '../../../utils/errors/AppErrors';
import hash from '../../../utils/hash/HashProvider';
import authConfig from '../../../config/auth';

interface IAuthenticate {
    email: string;
    password: string;
}

class AuthenticateUserService {

    public async execute({ email, password }: IAuthenticate): Promise<string> {

        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: {
                email
            }
        });

        if(!user) {
            throw new AppErrors('Usuário ou senha inválido');
        }

        const passwordMatched = await hash.compareHash({
            payload: password,
            hashed: user.password
        });

        if(!passwordMatched) {
            throw new AppErrors('Usuário ou senha inválido');
        }

        const token = sign(
            { 
                user: user.name, 
                email: user.email, 
                admin: user.administrator,
                enterprise: user.enterprise
            },
            authConfig.jwt.secret as string,
            {
                subject: user.id,
                expiresIn: authConfig.jwt.expiresIn
            }
        );

        return token;
    }
}

export default AuthenticateUserService;