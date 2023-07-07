const express = require('express');
const path = require('path');
const PORT = process.env.PORT ?? 3001;
const app = express();
const notes = require('./db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { log } = require('console');


app.use(express.json());
app.use(express.static('public'));


app.get('/notes', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.post('/api/notes', (req, res) => {
    req.body.id = uuidv4();
    notes.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json();
})

app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(PORT, () => {
        console.log(`Application is running @ http://localhost:${PORT}`);
});