import { Request, Response } from 'express';
import { writeFileSync, readFileSync } from 'fs';
import * as path from 'path';

const fileName = "config.json"

export function setConfig(req: Request, res: Response) {
    console.log("Setting game config...");
    console.log(req.body)
    writeFileSync(path.join(__dirname, fileName), JSON.stringify(req.body))
    res.status(200).json({ payload: req.body });
}