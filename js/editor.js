const editarBtn = document.getElementById('editar-btn');
const previaBtn = document.getElementById('previa-btn');
const novaHabilidade = document.getElementById('nova-habilidade');
const novaHabBtn = document.getElementById('nova-hab-btn');
const experienciaBtn = document.getElementById('experiencia-btn');
const modeloExperiencia = document.getElementById('modelo-experiencia');
const modeloPreviaExp = document.getElementById('modelo-previa-experiencia');
const formacaoBtn = document.getElementById('formacao-btn');
const modeloFormacao = document.getElementById('modelo-formacao');
const modeloPreviaFormacao = document.getElementById('modelo-previa-formacao');
const novoIdioma = document.getElementById('novo-idioma');
const nivelIdioma = document.getElementById('nivel-idioma');
const idiomaBtn = document.getElementById('idioma-btn');
const baixarBtn = document.getElementById('baixar-btn');
const nomeCurriculo = document.getElementById('nome-curriculo');

const areaForm = document.querySelector('.area-formulario');
const areaPrevia = document.querySelector('.area-previa');
const curriculo = document.querySelector('.curriculo');
const habilidadesLista = document.querySelector('.habilidades ul');
const curriculoHabLista = document.querySelector('.curriculo-habilidades ul');
const listaExperiencias = document.querySelector('.lista-experiencias');
const curriculoExperiencia = document.querySelector('.curriculo-experiencia');
const listaFormacao = document.querySelector('.lista-formacoes');
const curriculoFormacao = document.querySelector('.curriculo-formacao');
const listaIdiomas = document.querySelector('.idiomas ul');
const curriculoIdiomas = document.querySelector('.curriculo-idiomas ul');

const bolinhasTema = document.querySelectorAll('.seletor-tema input');

let totalExperiencias = 0;
let totalFormacoes = 0;

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

    curriculoExperiencia.classList.remove('escondido');

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

    const grupoPrevia = modeloPreviaExp.content.cloneNode(true);

    const previaCargo = grupoPrevia.querySelector('.previa-cargo');
    const previaPeriodo = grupoPrevia.querySelector('.previa-periodo');
    const previaDescricao = grupoPrevia.querySelector('.previa-descricao');

    ligar(campoCargo, previaCargo);
    ligar(campoPeriodo, previaPeriodo);
    ligar(campoDescricao, previaDescricao);

    const grupoExperiencia = grupo.querySelector('.grupo-experiencia');
    const previaExperiencia = grupoPrevia.querySelector('.previa-experiencia');
    const removerBtn = grupo.querySelector('.remover-btn');

    removerBtn.addEventListener('click', () => {
        grupoExperiencia.remove();
        previaExperiencia.remove();

        if (curriculoExperiencia.querySelector('.previa-experiencia') === null) {
            curriculoExperiencia.classList.add('escondido');
        }
    });

    listaExperiencias.appendChild(grupo);
    curriculoExperiencia.appendChild(grupoPrevia);
    campoCargo.focus();
});

formacaoBtn.addEventListener('click', () => {
    totalFormacoes++;

    curriculoFormacao.classList.remove('escondido');

    const grupo = modeloFormacao.content.cloneNode(true);

    const campoCurso = grupo.querySelector('.campo-curso');
    const labelCurso = campoCurso.previousElementSibling;

    campoCurso.id = 'form-curso-' + totalFormacoes;
    labelCurso.htmlFor = campoCurso.id;

    const campoAno = grupo.querySelector('.campo-ano');
    const labelAno = campoAno.previousElementSibling;
    
    campoAno.id = 'form-ano-' + totalFormacoes;
    labelAno.htmlFor = campoAno.id;

    const campoInstituicao = grupo.querySelector('.campo-instituicao');
    const labelInstituicao = campoInstituicao.previousElementSibling;

    campoInstituicao.id = 'form-instituicao-' + totalFormacoes;
    labelInstituicao.htmlFor = campoInstituicao.id;

    const grupoPrevia = modeloPreviaFormacao.content.cloneNode(true);

    const previaCurso = grupoPrevia.querySelector('.previa-curso');
    const previaAno = grupoPrevia.querySelector('.previa-ano');
    const previaInstituicao = grupoPrevia.querySelector('.previa-instituicao');

    ligar(campoCurso, previaCurso);
    ligar(campoAno, previaAno);
    ligar(campoInstituicao, previaInstituicao);

    const grupoFormacao = grupo.querySelector('.grupo-formacao');
    const previaFormacao = grupoPrevia.querySelector('.previa-formacao');
    const removerBtn = grupo.querySelector('.remover-btn');

    removerBtn.addEventListener('click', () => {
        grupoFormacao.remove();
        previaFormacao.remove();

        if (curriculoFormacao.querySelector('.previa-formacao') === null) {
            curriculoFormacao.classList.add('escondido');
        }
    });

    listaFormacao.appendChild(grupo);
    curriculoFormacao.appendChild(grupoPrevia);
    campoCurso.focus();
});

idiomaBtn.addEventListener('click', () => {
    const idioma = novoIdioma.value.trim();
    const nivel = nivelIdioma.value;

    if (idioma === '') {
        return;
    }

    const texto = `${idioma} (${nivel})`;

    const itemFormulario = document.createElement('li');
    itemFormulario.textContent = texto;
    listaIdiomas.appendChild(itemFormulario);

    const itemCurriculo = document.createElement('li');
    itemCurriculo.textContent = texto;
    curriculoIdiomas.appendChild(itemCurriculo);

    novoIdioma.value = '';
    novoIdioma.focus();
});

baixarBtn.addEventListener('click', () => {
    document.title = nomeCurriculo.value || 'Currículo';
    window.print();
});

ligarCampo('nome', 'previa-nome');
ligarCampo('cargo-desejado', 'previa-cargo');
ligarCampo('email', 'previa-email');
ligarCampo('telefone', 'previa-telefone');
ligarCampo('cidade', 'previa-cidade');
ligarCampo('portfolio', 'previa-portfolio');
ligarCampo('resumo', 'previa-resumo');


