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

interface IResponse {
    user: {
        id: string,
        name: string;
        email: string;
        administrator: boolean;
        enterprise: string;
    }
    token: string;
}

class AuthenticateUserService {

    public async execute({ email, password }: IAuthenticate): Promise<IResponse> {

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
                id: user.id
            },
            authConfig.jwt.secret as string,
            {
                subject: user.id,
                expiresIn: authConfig.jwt.expiresIn
            }
        );

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                administrator: user.administrator,
                enterprise: user.enterprise
            },
            token
        };
    }
}

export default AuthenticateUserService;