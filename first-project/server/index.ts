import express, { Express, Request, Response } from 'express';

const notesRoutes = require('./routes/notes');

const app: Express = express();
const port = 3001;
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

app.use(bodyParser.json())
    .use(cors());

app.use('/', notesRoutes);

app.listen(port, () => {
    console.log('Server app is listening on port ' + port);
})