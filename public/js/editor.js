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
const salvarBtn = document.getElementById('salvar-btn');

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

let idAtual = null; 

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

function preencherCampo(idCampo, valor) {
    const campo = document.getElementById(idCampo);

    campo.value = valor || '';
    campo.dispatchEvent(new Event('input'));
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

    return grupoFormulario;
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

function adicionarHabilidade() {
    const texto = novaHabilidade.value.trim();

    if (texto === '') {
        return;
    }

    adicionarItem(texto, habilidadesLista, curriculoHabLista);

    novaHabilidade.value = '';
    novaHabilidade.focus();
}

function adicionarIdioma() {
    const idioma = novoIdioma.value.trim();
    const nivel = nivelIdioma.value;

    if (idioma === '') {
        return;
    }

    const texto = `${idioma} (${nivel})`;

    adicionarItem(texto, listaIdiomas, curriculoIdiomas);

    novoIdioma.value = '';
    novoIdioma.focus();
}

function coletarDados() {
    return {
        nome: document.getElementById('nome').value,
        cargo: document.getElementById('cargo-desejado').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        cidade: document.getElementById('cidade').value,
        portfolio: document.getElementById('portfolio').value,
        resumo: document.getElementById('resumo').value,
        habilidades: Array.from(curriculoHabLista.querySelectorAll('li')).map((item) => item.textContent),
        idiomas: Array.from(listaIdiomas.querySelectorAll('li')).map((item) => item.textContent),
        experiencias: Array.from(listaExperiencias.querySelectorAll('.grupo-experiencia')).map((grupo) => {
            return {
                cargo: grupo.querySelector('.campo-cargo').value,
                periodo: grupo.querySelector('.campo-periodo').value,
                descricao: grupo.querySelector('.campo-descricao').value
            };
        }),
        formacoes: Array.from(listaFormacao.querySelectorAll('.grupo-formacao')).map((grupo) => {
            return {
                curso: grupo.querySelector('.campo-curso').value,
                ano: grupo.querySelector('.campo-ano').value,
                instituicao: grupo.querySelector('.campo-instituicao').value
            }
        })
    }
}

async function carregarCurriculo(id) {
    const resposta = await fetch('/api/curriculos/' + id, { method: 'GET' });

    if (!resposta.ok) {
        return;
    }

    const salvo = await resposta.json();

    idAtual = salvo.id;

    nomeCurriculo.value = salvo.nome;
    curriculo.dataset.modelo = salvo.modelo;
    curriculo.dataset.tema = salvo.tema;
    document.getElementById(salvo.tema).checked = true;

    preencherCampo('nome', salvo.dados.nome);
    preencherCampo('cargo-desejado', salvo.dados.cargo);
    preencherCampo('email', salvo.dados.email);
    preencherCampo('telefone', salvo.dados.telefone);
    preencherCampo('cidade', salvo.dados.cidade);
    preencherCampo('portfolio', salvo.dados.portfolio);
    preencherCampo('resumo', salvo.dados.resumo);

    salvo.dados.habilidades.forEach(habilidade => adicionarItem(habilidade, habilidadesLista, curriculoHabLista));
    salvo.dados.idiomas.forEach(idioma => adicionarItem(idioma, listaIdiomas, curriculoIdiomas));

    salvo.dados.experiencias.forEach(experiencia => {
        const grupo = adicionarGrupo(configExperiencia);
        const campoCargo = grupo.querySelector('.campo-cargo');
        const campoPeriodo = grupo.querySelector('.campo-periodo');
        const campoDescricao = grupo.querySelector('.campo-descricao');

        campoCargo.value = experiencia.cargo;
        campoCargo.dispatchEvent(new Event('input'));

        campoPeriodo.value = experiencia.periodo;
        campoPeriodo.dispatchEvent(new Event('input'));
    
        campoDescricao.value = experiencia.descricao;
        campoDescricao.dispatchEvent(new Event('input'));
    });

    salvo.dados.formacoes.forEach(formacao => {
        const grupo = adicionarGrupo(configFormacao);
        const campoCurso = grupo.querySelector('.campo-curso');
        const campoAno = grupo.querySelector('.campo-ano');
        const campoInstituicao = grupo.querySelector('.campo-instituicao');

        campoCurso.value = formacao.curso;
        campoCurso.dispatchEvent(new Event('input'));

        campoAno.value = formacao.ano;
        campoAno.dispatchEvent(new Event('input'));

        campoInstituicao.value = formacao.instituicao;
        campoInstituicao.dispatchEvent(new Event('input'));
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

experienciaBtn.addEventListener('click', () => {
    adicionarGrupo(configExperiencia);
});

formacaoBtn.addEventListener('click', () => {
    adicionarGrupo(configFormacao);
});

baixarBtn.addEventListener('click', () => {
    document.title = nomeCurriculo.value || 'Currículo';
    window.print();
});

salvarBtn.addEventListener('click', async () => {
    const corpo = {
        nome: nomeCurriculo.value || 'Currículo sem título',
        modelo: curriculo.dataset.modelo,
        tema: curriculo.dataset.tema,
        dados: coletarDados()
    };

    let metodo = 'POST';
    let endereco = '/api/curriculos';

    if (idAtual !== null) {
        metodo = 'PUT';
        endereco = '/api/curriculos/' + idAtual;
    }

    const resposta = await fetch(endereco, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo)
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
        if (idAtual === null) {
            idAtual = resultado.id;
            history.replaceState(null, '', '?id=' + idAtual);
        }

        salvarBtn.textContent = 'Salvo!';
    } else {
        salvarBtn.textContent = 'Erro ao salvar';
    }

    setTimeout(() => {
        salvarBtn.textContent = 'Salvar';
    }, 2000);
});

novaHabBtn.addEventListener('click', adicionarHabilidade);

novaHabilidade.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        evento.preventDefault();
        adicionarHabilidade();
    }
});

idiomaBtn.addEventListener('click', adicionarIdioma);

novoIdioma.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        evento.preventDefault();
        adicionarIdioma();
    }
});

const parametros = new URLSearchParams(window.location.search);
const modelo = parametros.get('modelo');
const tema = parametros.get('tema');
const idUrl = parametros.get('id');

const modelosValidos = ['classico', 'faixa', 'lateral'];
const temasValidos = ['petroleo', 'mostarda', 'grafite', 'musgo'];

if (modelosValidos.includes(modelo)) {
    curriculo.dataset.modelo = modelo;
}

if (temasValidos.includes(tema)) {
    curriculo.dataset.tema = tema;
    document.getElementById(tema).checked = true;
}

if (idUrl !== null && Number.isInteger(Number(idUrl))) {
    carregarCurriculo(idUrl);
} else {
    ['HTML', 'CSS', 'JavaScript', 'Git'].forEach((habilidade) => {
        adicionarItem(habilidade, habilidadesLista, curriculoHabLista);
    });

    adicionarItem('Inglês (intermediário)', listaIdiomas, curriculoIdiomas);
}

ligarCampo('nome', 'previa-nome');
ligarCampo('cargo-desejado', 'previa-cargo');
ligarCampo('email', 'previa-email');
ligarCampo('telefone', 'previa-telefone');
ligarCampo('cidade', 'previa-cidade');
ligarCampo('portfolio', 'previa-portfolio');
ligarCampo('resumo', 'previa-resumo');

