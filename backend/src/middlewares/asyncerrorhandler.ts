import { Request, Response, NextFunction } from 'express';
import { asyncerrorhandlerpayload } from '../types';

const asyncerrorhandler = (func: asyncerrorhandlerpayload) => {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch(err => next(err));
    }
}
export default asyncerrorhandler