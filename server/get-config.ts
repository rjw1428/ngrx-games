import {Request, Response} from 'express';
import { CONFIG } from './config';

export function getConfig(req: Request, res: Response) {
    console.log("Retrieving game config...");
    res.status(200).json({payload:Object.values(CONFIG)});
}