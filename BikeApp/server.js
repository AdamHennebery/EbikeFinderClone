const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Open SQLite database
const db = new sqlite3.Database('./bikes.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error opening database', err);
    }
});



// Route to get all bikes
app.get('/bikes', (req, res) => {
    db.all('SELECT * FROM bikes', [], (err, rows) => {
        if (err) {
            console.error('Error fetching bikes', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(rows);
    });
});

// Route to add a new bike
app.post('/bikes', (req, res) => {
    const { name, image, terrains, motor, frame, specs, buyURL } = req.body;
    const terrainsStr = Array.isArray(terrains) ? terrains.join(',') : terrains;
    
    const query = `INSERT INTO bikes (name, image, terrains, motor, frame, specs, buyURL)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.run(query, [name, image, terrainsStr, motor, frame, specs, buyURL], function (err) {
        if (err) {
            console.error('Error inserting bike', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Route to update a bike
app.put('/bikes/:id', (req, res) => {
    const { name, image, terrains, motor, frame, specs, buyURL } = req.body;
    const { id } = req.params;
    const terrainsStr = Array.isArray(terrains) ? terrains.join(',') : terrains;

    const query = `UPDATE bikes SET name = ?, image = ?, terrains = ?, motor = ?, frame = ?, specs = ?, buyURL = ?
                   WHERE id = ?`;
    db.run(query, [name, image, terrainsStr, motor, frame, specs, buyURL, id], function (err) {
        if (err) {
            console.error('Error updating bike', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Bike not found' });
        } else {
            res.status(200).json({ id });
        }
    });
});

// Route to delete a bike
app.delete('/bikes/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM bikes WHERE id = ?`;
    db.run(query, [id], function (err) {
        if (err) {
            console.error('Error deleting bike', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Bike not found' });
        } else {
            res.status(200).json({ id });
        }
    });
});

const storage = multer.diskStorage({
    destination: './images/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('image');

// Check file type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Upload route
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ error: err });
        } else {
            if (req.file == undefined) {
                res.status(400).json({ error: 'No file selected!' });
            } else {
                res.status(200).json({
                    message: 'File uploaded!',
                    filePath: `/images/${req.file.filename}`
                });
            }
        }
    });
});

// Serve images
app.use('/images', express.static('images'));




// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
