const bookTabs = document.querySelector('.book-tabs');

let currentY = 220;
let targetY = 220;

window.addEventListener('scroll', () => {

    targetY = window.scrollY + 220;

});

function animateMenu(){

    currentY += (targetY - currentY) * 0.08;

    bookTabs.style.top = currentY + 'px';

    requestAnimationFrame(animateMenu);

}

animateMenu();
