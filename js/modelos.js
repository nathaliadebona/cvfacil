const filtrosBtn = document.querySelectorAll('.filtros button');
const modeloCards = document.querySelectorAll('.modelo-card');

filtrosBtn.forEach((botao) => {
    botao.addEventListener('click', () => {
        filtrosBtn.forEach((botoes) => {
            botoes.classList.remove('ativo');
        });

        botao.classList.add('ativo');

        const filtro = botao.dataset.filtro;

        modeloCards.forEach((cartao) => {
            const item = cartao.parentElement;

            if (filtro === 'todos' || cartao.dataset.tipo === filtro) {
                item.classList.remove('escondido');
            } else {
                    item.classList.add('escondido');
            }
        });
    });
});