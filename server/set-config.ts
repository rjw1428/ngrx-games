import {Request, Response} from 'express';
import { writeFile } from 'fs';
import { CONFIG } from './config';

const fileName = "config.ts"

export function setConfig(req: Request, res: Response) {
    console.log("Setting game config...");
    console.log(req)
    writeFile(fileName, req, (err) => console.log(err?err:"config updated"))
    res.status(200).json({payload:Object.values(CONFIG)});
}