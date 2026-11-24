const entrarBtn = document.getElementById('entrar-btn');
const criarBtn = document.getElementById('criar-btn');
const formEntrar = document.getElementById('form-entrar');
const formCriar = document.getElementById('form-criar');

criarBtn.addEventListener('click', () => {
    formEntrar.classList.add('escondido');
    formCriar.classList.remove('escondido');

    criarBtn.classList.add('ativo');
    entrarBtn.classList.remove('ativo');
});

entrarBtn.addEventListener('click', () => {
    formCriar.classList.add('escondido');
    formEntrar.classList.remove('escondido');

    criarBtn.classList.remove('ativo');
    entrarBtn.classList.add('ativo');
});