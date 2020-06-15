import * as express from 'express'
import {Application} from "express";
import { getConfig } from './get-config';
import { setConfig } from './set-config';
import * as cors from 'cors'

//npm install --save-dev ts-node nodemon cors
const port = 9000
const app: Application = express();

// app.use(cors())

app.route('/api/config').get(getConfig);
app.route('/api/config').post(setConfig);

app.listen(port, cors(), () => {
    console.log("Server running at http://localhost:" + port);
});
