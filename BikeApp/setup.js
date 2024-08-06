const sqlite3 = require('sqlite3').verbose();

// Open a database connection
const db = new sqlite3.Database('bikes.db');

// Create the bikes table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS bikes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            image TEXT,
            terrains TEXT,
            motor TEXT,
            frame TEXT,
            specs TEXT,
            buyURL TEXT
        )
    `);

    console.log("Table created or already exists.");
});

// Close the database connection
db.close();