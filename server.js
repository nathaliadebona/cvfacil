const express = require('express');
const path = require('path');
const db = require('./banco');

const app = express();
const PORTA = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/ping', (req, res) => {
    res.json({ ok: true });
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});