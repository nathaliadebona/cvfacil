const express = require('express');
const path = require('path');
const db = require('./banco');

const app = express();
const PORTA = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/ping', (req, res) => {
    res.json({ ok: true });
});

const modelosValidos = ['classico', 'faixa', 'lateral'];
const temasValidos = ['petroleo', 'mostarda', 'grafite', 'musgo'];

app.post('/api/curriculos', (req, res) => {
    const { nome, modelo, tema, dados } = req.body;

    if (typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({ erro: 'Nome inválido' });
    }

    if (!modelosValidos.includes(modelo) || !temasValidos.includes(tema)) {
        return res.status(400).json({ erro: 'Modelo ou tema inválido' });
    }

    if (!dados || typeof dados !== 'object') {
        return res.status(400).json({ erro: 'Dados inválidos' });
    }

    const resultado = db.prepare(`
        INSERT INTO curriculos (nome, modelo, tema, dados, atualizado_em)
        VALUES (?, ?, ?, ?, ?)
    `).run(nome.trim(), modelo, tema, JSON.stringify(dados), new Date().toISOString());

    res.status(201).json({ id: resultado.lastInsertRowid });
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});