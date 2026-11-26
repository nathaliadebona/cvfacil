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

const configExperiencia = {
    modelo: modeloExperiencia,
    modeloPrevia: modeloPreviaExp,
    lista: listaExperiencias,
    areaPrevia: curriculoExperiencia,
    prefixo: 'exp',
    seletorPrevia: '.previa-experiencia',
    total: 0,
    campos: [
        { campo: '.campo-cargo', previa: '.previa-cargo' },
        { campo: '.campo-periodo', previa: '.previa-periodo' },
        { campo: '.campo-descricao', previa: '.previa-descricao' }
    ]
};

const configFormacao = {
    modelo: modeloFormacao,
    modeloPrevia: modeloPreviaFormacao,
    lista: listaFormacao,
    areaPrevia: curriculoFormacao,
    prefixo: 'formacao',
    seletorPrevia: '.previa-formacao',
    total: 0,
    campos: [
        { campo: '.campo-curso', previa: '.previa-curso' },
        { campo: '.campo-ano', previa: '.previa-ano' },
        { campo: '.campo-instituicao', previa: '.previa-instituicao'}
    ]
};

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

function adicionarGrupo(config) {
    config.total++;
    config.areaPrevia.classList.remove('escondido');

    const grupo = config.modelo.content.cloneNode(true);
    const grupoPrevia = config.modeloPrevia.content.cloneNode(true);

    config.campos.forEach((item) => {
        const campo = grupo.querySelector(item.campo);
        const label = campo.previousElementSibling;
        const previa = grupoPrevia.querySelector(item.previa);

        campo.id = config.prefixo + '-' + campo.className + '-' + config.total;
        label.htmlFor = campo.id;
        ligar(campo, previa);
    });

    const grupoFormulario = grupo.firstElementChild;
    const previaGrupo = grupoPrevia.firstElementChild;
    const removerBtn = grupo.querySelector('.remover-btn');

    removerBtn.addEventListener('click', () => {
        grupoFormulario.remove();
        previaGrupo.remove();

        if (config.areaPrevia.querySelector(config.seletorPrevia) === null) {
            config.areaPrevia.classList.add('escondido');
        }
    });

    config.lista.appendChild(grupo);
    config.areaPrevia.appendChild(grupoPrevia);

    grupoFormulario.querySelector(config.campos[0].campo).focus();
}

function adicionarItem(texto, listaForm, listaPrevia) {
    const itemFormulario = document.createElement('li');
    itemFormulario.textContent = texto;

    const itemPrevia = document.createElement('li');
    itemPrevia.textContent = texto;

    const removerBtn = document.createElement('button');
    removerBtn.type = 'button';
    removerBtn.className = 'remover-item';
    removerBtn.textContent = '×';
    removerBtn.setAttribute('aria-label', 'Remover ' + texto);

    removerBtn.addEventListener('click', () => {
        itemFormulario.remove();
        itemPrevia.remove();

        if (listaPrevia.children.length === 0) {
            listaPrevia.parentElement.classList.add('escondido');
        }
    });

    itemFormulario.appendChild(removerBtn);
    listaForm.appendChild(itemFormulario);
    listaPrevia.appendChild(itemPrevia);

    listaPrevia.parentElement.classList.remove('escondido');
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

    adicionarItem(texto, habilidadesLista, curriculoHabLista);

    novaHabilidade.value = '';
    novaHabilidade.focus();
});

experienciaBtn.addEventListener('click', () => {
    adicionarGrupo(configExperiencia);
});

formacaoBtn.addEventListener('click', () => {
    adicionarGrupo(configFormacao);
});

idiomaBtn.addEventListener('click', () => {
    const idioma = novoIdioma.value.trim();
    const nivel = nivelIdioma.value;

    if (idioma === '') {
        return;
    }

    const texto = `${idioma} (${nivel})`;

    adicionarItem(texto, listaIdiomas, curriculoIdiomas);

    novoIdioma.value = '';
    novoIdioma.focus();
});

baixarBtn.addEventListener('click', () => {
    document.title = nomeCurriculo.value || 'Currículo';
    window.print();
});

const parametros = new URLSearchParams(window.location.search);
const modelo = parametros.get('modelo');
const tema = parametros.get('tema');

const modelosValidos = ['classico', 'faixa', 'lateral'];
const temasValidos = ['petroleo', 'mostarda', 'grafite', 'musgo'];

if (modelosValidos.includes(modelo)) {
    curriculo.dataset.modelo = modelo;
}

if (temasValidos.includes(tema)) {
    curriculo.dataset.tema = tema;
    document.getElementById(tema).checked = true;
}

['HTML', 'CSS', 'JavaScript', 'Git'].forEach((habilidade) => {
    adicionarItem(habilidade, habilidadesLista, curriculoHabLista);
});

adicionarItem('Inglês (intermediário)', listaIdiomas, curriculoIdiomas);
ligarCampo('nome', 'previa-nome');
ligarCampo('cargo-desejado', 'previa-cargo');
ligarCampo('email', 'previa-email');
ligarCampo('telefone', 'previa-telefone');
ligarCampo('cidade', 'previa-cidade');
ligarCampo('portfolio', 'previa-portfolio');
ligarCampo('resumo', 'previa-resumo');

