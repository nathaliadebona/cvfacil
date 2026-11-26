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

function validarCurriculo(corpo) {
    const { nome, modelo, tema, dados } = corpo;

    if (typeof nome !== 'string' || nome.trim() === '') {
        return 'Nome inválido';
    }

    if (!modelosValidos.includes(modelo) || !temasValidos.includes(tema)) {
        return 'Modelo ou tema inválido';
    }

    if (!dados || typeof dados !== 'object') {
        return 'Dados inválidos';
    }

    return null;
}

app.post('/api/curriculos', (req, res) => {
    const erro = validarCurriculo(req.body);

    if (erro) {
        return res.status(400).json({ erro });
    }

    const { nome, modelo, tema, dados } = req.body;

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

app.delete('/api/curriculos/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ erro: 'Id inválido' });
    }

    const resultado = db.prepare('DELETE FROM curriculos WHERE id = ?').run(id);

    if (resultado.changes === 0) {
        return res.status(404).json({ erro: 'Currículo não encontrado' });
    }

    res.json({ ok: true });
});

app.put('/api/curriculos/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ erro: 'Id inválido' });
    }

    const erro = validarCurriculo(req.body);

    if (erro) {
        return res.status(400).json({ erro });
    }

    const { nome, modelo, tema, dados } = req.body;

    const resultado = db.prepare(`
        UPDATE curriculos
        SET nome = ?, modelo = ?, tema = ?, dados = ?, atualizado_em = ?
        WHERE id = ?
    `).run(nome.trim(), modelo, tema, JSON.stringify(dados), new Date().toISOString(), id);

    if (resultado.changes === 0) {
        return res.status(404).json({ erro: 'Currículo não encontrado' });
    }

    res.json({ ok: true });
});

app.post('/api/curriculos/:id/duplicar', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ erro: 'Id inválido' });
    }

    const original = db.prepare('SELECT * FROM curriculos WHERE id = ?').get(id);

    if (!original) {
        return res.status(404).json({ erro: 'Currículo não encontrado' });
    }

    const resultado = db.prepare(`
        INSERT INTO curriculos (nome, modelo, tema, dados, atualizado_em)
        VALUES (?, ?, ?, ?, ?)
    `).run(
        `${original.nome} (cópia)`,
        original.modelo,
        original.tema,
        original.dados,
        new Date().toISOString()
    );

    res.status(201).json({ id: resultado.lastInsertRowid });
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});