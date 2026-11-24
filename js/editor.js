const editarBtn = document.getElementById('editar-btn');
const previaBtn = document.getElementById('previa-btn');

const areaForm = document.querySelector('.area-formulario');
const areaPrevia = document.querySelector('.area-previa');
const curriculo = document.querySelector('.curriculo');
const bolinhasTema = document.querySelectorAll('.seletor-tema input');

function mostrarArea(areaAtiva, areaInativa, botaoAtivo, botaoInativo) {
    areaInativa.classList.add('aba-inativa');
    areaAtiva.classList.remove('aba-inativa');

    botaoAtivo.classList.add('ativo');
    botaoInativo.classList.remove('ativo');
}

function ligarCampo(idCampo, idPrevia) {
    const campo = document.getElementById(idCampo);
    const previa = document.getElementById(idPrevia);

    campo.addEventListener('input', () => {
        previa.textContent = campo.value || campo.placeholder;
    });
}

bolinhasTema.forEach((bolinha) => {
    bolinha.addEventListener('change', () => {
        curriculo.dataset.tema = bolinha.dataset.tema;
    });
});

editarBtn.addEventListener('click', () => {
    mostrarArea(areaForm, areaPrevia, editarBtn, previaBtn);
});

previaBtn.addEventListener('click', () => {
    mostrarArea(areaPrevia, areaForm, previaBtn, editarBtn);
});

ligarCampo('nome', 'previa-nome');
ligarCampo('cargo-desejado', 'previa-cargo');
ligarCampo('email', 'previa-email');
ligarCampo('telefone', 'previa-telefone');
ligarCampo('cidade', 'previa-cidade');
ligarCampo('portfolio', 'previa-portfolio');
ligarCampo('resumo', 'previa-resumo');


