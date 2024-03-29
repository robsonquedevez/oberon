import { Request, Response, NextFunction } from "express";
import {verify} from 'jsonwebtoken';
import AppErrors from "../../utils/errors/AppErrors";
import authConfig from '../../config/auth';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {

    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppErrors(
            'Token não encontrado', 
            401
        );
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret as string);

        const { sub } = decoded as ITokenPayload;

        request.user = {
            id: sub
        }

        return next();
    } catch (error) {
        throw new AppErrors(
            'Token inválido',
            401
        );
    }
}