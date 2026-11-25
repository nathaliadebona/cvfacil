const editarBtn = document.getElementById('editar-btn');
const previaBtn = document.getElementById('previa-btn');
const novaHabilidade = document.getElementById('nova-habilidade');
const novaHabBtn = document.getElementById('nova-hab-btn');
const experienciaBtn = document.getElementById('experiencia-btn');
const modeloExperiencia = document.getElementById('modelo-experiencia');

const areaForm = document.querySelector('.area-formulario');
const areaPrevia = document.querySelector('.area-previa');
const curriculo = document.querySelector('.curriculo');
const habilidadesLista = document.querySelector('.habilidades ul');
const curriculoHabLista = document.querySelector('.curriculo-habilidades ul');
const listaExperiencias = document.querySelector('.lista-experiencias');

const bolinhasTema = document.querySelectorAll('.seletor-tema input');

let totalExperiencias = 0;

function mostrarArea(areaAtiva, areaInativa, botaoAtivo, botaoInativo) {
    areaInativa.classList.add('aba-inativa');
    areaAtiva.classList.remove('aba-inativa');

    botaoAtivo.classList.add('ativo');
    botaoInativo.classList.remove('ativo');
}

function ligar(campo, previa) {
    campo.addEventListener('input', () => {
        previa.textContent = campo.value || campo.placeholder;
    });
}

function ligarCampo(idCampo, idPrevia) {
    const campo = document.getElementById(idCampo);
    const previa = document.getElementById(idPrevia);

    ligar(campo, previa);
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

novaHabBtn.addEventListener('click', () => {
    const texto = novaHabilidade.value.trim();

    if (texto === '') {
        return;
    }

    const itemFormulario = document.createElement('li');
    itemFormulario.textContent = texto;
    habilidadesLista.appendChild(itemFormulario);

    const itemCurriculo = document.createElement('li');
    itemCurriculo.textContent = texto;
    curriculoHabLista.appendChild(itemCurriculo);

    novaHabilidade.value = '';
    novaHabilidade.focus();
});

experienciaBtn.addEventListener('click', () => {
    totalExperiencias++;

    const grupo = modeloExperiencia.content.cloneNode(true);

    const campoCargo = grupo.querySelector('.campo-cargo');
    const labelCargo = campoCargo.previousElementSibling;

    campoCargo.id = 'exp-cargo-' + totalExperiencias;
    labelCargo.htmlFor = campoCargo.id;

    const campoPeriodo = grupo.querySelector('.campo-periodo');
    const labelPeriodo = campoPeriodo.previousElementSibling;

    campoPeriodo.id = 'exp-periodo-' + totalExperiencias;
    labelPeriodo.htmlFor = campoPeriodo.id;

    const campoDescricao = grupo.querySelector('.campo-descricao');
    const labelDescricao = campoDescricao.previousElementSibling;

    campoDescricao.id = 'exp-descricao-' + totalExperiencias;
    labelDescricao.htmlFor = campoDescricao.id;

    listaExperiencias.appendChild(grupo);
    campoCargo.focus();
});

ligarCampo('nome', 'previa-nome');
ligarCampo('cargo-desejado', 'previa-cargo');
ligarCampo('email', 'previa-email');
ligarCampo('telefone', 'previa-telefone');
ligarCampo('cidade', 'previa-cidade');
ligarCampo('portfolio', 'previa-portfolio');
ligarCampo('resumo', 'previa-resumo');


