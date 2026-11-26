const express = require('express');

const app = express();
const PORTA = 3000;

app.get('/api/ping', (req, res) => {
    res.json({ ok: true });
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});