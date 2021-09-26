import { Request, Response } from 'express';
import User from '../entities/User';
import AppErrors from '../../../utils/errors/AppErrors';

import CreateUserService from '../services/CreateUserService';
import ListProfileService from '../services/ListProfileService';
import UpdateUserService from '../services/UpdateUserService';
import ResetPasswordService from '../services/ResetPasswordService';
import ListAllProfileToEnterpriseService from '../services/ListAllProfileToEnterpriseService';

class UserController {

    public async create( request: Request, response: Response ): Promise<Response> {
        const {
            name,
            email,
            password,
            password_confirmation,
            enterprise,
            administrator
        } = request.body;

        if(String(password).length < 6) {
            throw new AppErrors('Senha deve ter no mínimo 6 caracteres', 400);
        }

        if(password !== password_confirmation) {
            throw new AppErrors('Senhas informadas não conferem!', 400);
        }

        const createUser = new CreateUserService();

        await createUser.execute({
            name,
            email,
            password,
            enterprise,
            administrator
        } as User);

        return response.status(201).send();
    }

    public async findById(request: Request, response: Response): Promise <Response> {

        const { id } = request.user;

        const listProfile = new ListProfileService();

        const user = await listProfile.execute(id);

        delete user.password;

        return response.status(201).json({ user });
    }

    public async update(request: Request, response: Response): Promise <Response> {

        const { id } = request.user;

        const { name, administrator, enterprise } = request.body;
        
        const updateUser = new UpdateUserService();

        const user = await updateUser.execute({
            id,
            name,
            administrator,
            enterprise
        });

        delete user.password;

        return response.status(200).json({user});
    }

    public async changePassword(request: Request, response: Response): Promise <Response> {

        const { id } = request.user;

        const { currentPassword, newPassword, confirmationPassword } = request.body;

        const resetPassword = new ResetPasswordService();

        await resetPassword.execute({
            id,
            currentPassword,
            newPassword,
            confirmationPassword
        });

        return response.status(200).send();
    }

    public async ListAll(request: Request, response: Response): Promise <Response> {

        const { enterprise } = request.params;        

        const listAllProfileToEnterprise = new ListAllProfileToEnterpriseService();

        const users = await listAllProfileToEnterprise.execute(enterprise);

        return response.status(200).send(users);
    }
}

export default UserController;
