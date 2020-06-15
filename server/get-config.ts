import { readFileSync } from 'fs'
import * as path from 'path'
import { Request, Response } from 'express';

const fileName = "./config.json"

export function getConfig(req: Request, res: Response) {
    console.log("Retrieving game config...");
    const config = readFileSync(path.join(__dirname, fileName), 'utf8')
    res.status(200).json({payload:JSON.parse(config)});
}