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

export default db;