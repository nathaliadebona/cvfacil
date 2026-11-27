const modeloCard = document.getElementById('modelo-card');
const itemNovo = document.querySelector('.item-novo');

function criarCard(curriculo) {
    const card = modeloCard.content.cloneNode(true);

    card.querySelector('.curriculo-card').dataset.id = curriculo.id;
    card.querySelector('h2').textContent = curriculo.nome;
    card.querySelector('.curriculo-info p').textContent = curriculo.atualizado_em;
    card.querySelector('.curriculo-info span').textContent = curriculo.modelo + ' ' + curriculo.tema;
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