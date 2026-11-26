const entrarBtn = document.getElementById('entrar-btn');
const criarBtn = document.getElementById('criar-btn');
const formEntrar = document.getElementById('form-entrar');
const formCriar = document.getElementById('form-criar');

function mostrarAba(formAparece, formSome, botaoAtivo, botaoInativo) {
    formSome.classList.add('escondido');
    formAparece.classList.remove('escondido');

    botaoAtivo.classList.add('ativo');
    botaoInativo.classList.remove('ativo');
}

criarBtn.addEventListener('click', () => {
    mostrarAba(formCriar, formEntrar, criarBtn, entrarBtn);
});

entrarBtn.addEventListener('click', () => {
    mostrarAba(formEntrar, formCriar, entrarBtn, criarBtn);
});