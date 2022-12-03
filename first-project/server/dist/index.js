"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notesRoutes = require('./routes/notes');
const app = (0, express_1.default)();
const port = 3001;
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
    .use(cors());
app.use('/', notesRoutes);
app.listen(port, () => {
    console.log('Server app is listening on port ' + port);
});
