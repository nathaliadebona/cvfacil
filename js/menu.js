const menuBtn = document.querySelector('.botao-menu');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('aberto');
    
    if (menu.classList.contains('aberto')) {
        menuBtn.setAttribute('aria-expanded', 'true');
    } else {
        menuBtn.setAttribute('aria-expanded', 'false');
    }
});