import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction, json } from 'express';
import cors from 'cors';
import routes from './routes';
import AppErrors from './utils/errors/AppErrors';
import log from './utils/log/LogsManager';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use((
    err: Error, 
    request: Request, 
    response: Response, 
    next: NextFunction) => {

    if(err instanceof AppErrors) {
        return response
        .status(err.statusCode)
        .json({
            status: 'error',
            message: err.message
        });
    }

    log.execute(err.message);

    return response
    .status(500)
    .json({
        status: 'error',
        message: 'Internal server error',        
    });
});

app.listen(4004);