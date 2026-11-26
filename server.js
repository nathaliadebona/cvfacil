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

app.get('/api/curriculos', (req, res) => {
    const lista = db.prepare(`
        SELECT id, nome, modelo, tema, atualizado_em
        FROM curriculos
        ORDER BY atualizado_em DESC
    `).all();

    res.json(lista);
});

app.get('/api/curriculos/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ erro: 'Id inválido' });
    }

    const curriculo = db.prepare('SELECT * FROM curriculos WHERE id = ?').get(id);

    if (!curriculo) {
        return res.status(404).json({ erro: 'Currículo não encontrado' });
    }

    curriculo.dados = JSON.parse(curriculo.dados);
    res.json(curriculo);
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});