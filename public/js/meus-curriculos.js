const nomesModelo = { classico: 'Clássico', faixa: 'Faixa', lateral: 'Lateral' };
const nomesTema = { petroleo: 'Petróleo', mostarda: 'Mostarda', grafite: 'Grafite', musgo: 'Musgo' };

const modeloCard = document.getElementById('modelo-card');
const itemNovo = document.querySelector('.item-novo');

function criarCard(curriculo) {
    const card = modeloCard.content.cloneNode(true);

    card.querySelector('.curriculo-card').dataset.id = curriculo.id;
    card.querySelector('h2').textContent = curriculo.nome;
    card.querySelector('.curriculo-info p').textContent = 'editado em ' + new Date(curriculo.atualizado_em).toLocaleDateString('pt-BR');
    card.querySelector('.curriculo-info span').textContent = nomesModelo[curriculo.modelo] + ' ' + nomesTema[curriculo.tema];
    card.querySelector('.botao-principal').href = 'editor.html?id=' + curriculo.id;

    itemNovo.before(card);
}

async function carregarCurriculos() {
    const resposta = await fetch('/api/curriculos');
    const lista = await resposta.json();

    lista.forEach((curriculo) => {
        criarCard(curriculo);
    });
}

carregarCurriculos();