import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('data.dv', (err: any) => {
    if (err) {
        throw err;
    }

    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, 
            created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP)`);
    });
});

const findAll = (req: Request, res: Response) => {
    db.all('SELECT * FROM notes', (err: any, rows: any) => {
        if (err) {
            console.log(err);
            const responseError = { succes: false, message: 'An error occured, please try again later' };
            return res.status(500).json(responseError);
        }
        const responseSuccess = { success: true, data: rows };
        console.log(responseSuccess);
        return res.json(responseSuccess);
    });
}

const create = (req: Request, res: Response) => {
    const { title, content } = req.body;

    if (!title || !content) {
        const responseError = { success: false, message: 'title and content are required'};
        return res.status(400).json(responseError);
    }

    db.run('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content], (err: any) => {
        if (err) {
            console.error(err);
            const responseError = { succes: false, message: 'An error occured, please try again later' };
            return res.status(500).json(responseError);
        }
        const responseSuccess = { success: true, data: {id: uuidv4(), title, content} };
        return res.json(responseSuccess);
    });
}

const findOne = (req: Request, res: Response) => {
    db.all('SELECT * FROM notes where id = ?', req.params.id, (err: any, row: any) => {
        if (err) {
            console.log(err);
            const responseError = { succes: false, message: 'An error occured, please try again later' };
            return res.status(500).json(responseError);
        } else if (!row) {
            const responseError = { success: false, message: 'This note does not exist' };
            return res.status(404).json(responseError);
        }

        const responseSuccess = { success: true, data: row };
        return res.json(responseSuccess);
    });
}

const deleteNotes = (req: Request, res: Response) => {
    const { id } = req.params;

    db.get('SELECT * FROM notes WHERE id = ?', [id], (err: any, row: any) => {
        if (err) {
            console.error(err);
            const responseError = { succes: false, message: 'An error occured, please try again later' };
            return res.status(500).json(responseError);
        }

        if (!row) {
            const responseError = { success: false, message: 'Note does not exist' };
            return res.status(404).json(responseError);
        }

        db.run('DELETE FROM notes WHERE id = ?', [id], (error: any) => {
            if (error) {
                console.error(error);
                const responseError = { succes: false, message: 'An error occured, please try again later' };
                return res.status(500).json(responseError);
            }

            const responseSuccess = { success: true, message: 'Note deleted successfully' };
            return res.json(responseSuccess);
        });
    });
}

export default {
    findAll,
    findOne,
    deleteNotes,
    create
};

