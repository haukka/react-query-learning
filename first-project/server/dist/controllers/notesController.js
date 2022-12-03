"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.dv', (err) => {
    if (err) {
        throw err;
    }
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, 
            created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP)`);
    });
});
const findAll = (req, res) => {
    db.all('SELECT * FROM notes', (err, rows) => {
        if (err) {
            console.log(err);
            const responseError = { succes: false, message: 'An error occured, please try again later' };
            return res.status(500).json(responseError);
        }
        const responseSuccess = { success: true, data: rows };
        console.log(responseSuccess);
        return res.json(responseSuccess);
    });
};
const create = (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        const responseError = { success: false, message: 'title and content are required' };
        return res.status(400).json(responseError);
    }
    db.run('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content], (err) => {
        if (err) {
            console.error(err);
            const responseError = { succes: false, message: 'An error occured, please try again later' };
            return res.status(500).json(responseError);
        }
        const responseSuccess = { success: true, data: { id: (0, uuid_1.v4)(), title, content } };
        return res.json(responseSuccess);
    });
};
const findOne = (req, res) => {
    db.all('SELECT * FROM notes where id = ?', req.params.id, (err, row) => {
        if (err) {
            console.log(err);
            const responseError = { succes: false, message: 'An error occured, please try again later' };
            return res.status(500).json(responseError);
        }
        else if (!row) {
            const responseError = { success: false, message: 'This note does not exist' };
            return res.status(404).json(responseError);
        }
        const responseSuccess = { success: true, data: row };
        return res.json(responseSuccess);
    });
};
const deleteNotes = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM notes WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error(err);
            const responseError = { succes: false, message: 'An error occured, please try again later' };
            return res.status(500).json(responseError);
        }
        if (!row) {
            const responseError = { success: false, message: 'Note does not exist' };
            return res.status(404).json(responseError);
        }
        db.run('DELETE FROM notes WHERE id = ?', [id], (error) => {
            if (error) {
                console.error(error);
                const responseError = { succes: false, message: 'An error occured, please try again later' };
                return res.status(500).json(responseError);
            }
            const responseSuccess = { success: true, message: 'Note deleted successfully' };
            return res.json(responseSuccess);
        });
    });
};
exports.default = {
    findAll,
    findOne,
    deleteNotes,
    create
};
