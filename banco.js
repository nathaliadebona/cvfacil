const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'cvfacil.db'));

db.exec(`
    CREATE TABLE IF NOT EXISTS curriculos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        modelo TEXT NOT NULL,
        tema TEXT NOT NULL,
        dados TEXT NOT NULL,
        atualizado_em TEXT NOT NULL
    )
`);

module.exports = db;