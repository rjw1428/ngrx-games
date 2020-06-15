import * as express from 'express'
import * as cors from 'cors'
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { Application } from "express";
import { getConfig } from './get-config';
import { setConfig } from './set-config';


//npm install --save-dev ts-node nodemon cors
const port = process.env.PORT || 9000
const app: Application = express();
const distDir = path.join(__dirname, "../dist/ngrx-tic-tac-toe");
app.use(bodyParser.json());
app.use(cors())
app.use(express.static(distDir));

app.route('/api/config').get(getConfig);
app.route('/api/config').post(setConfig);

app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
    console.log("Serving App from "+ distDir);
});