import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser';
import {Application} from "express";
import { getConfig } from './get-config';
import { setConfig } from './set-config';


//npm install --save-dev ts-node nodemon cors
const port = 9000
const app: Application = express();
app.use(bodyParser.json());
app.use(cors())

app.route('/api/config').get(getConfig);
app.route('/api/config').post(setConfig);

app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});
