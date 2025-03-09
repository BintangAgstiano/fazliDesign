const textLogo = document.querySelector('.text-logo')
const chatLogo = document.querySelector('.chat-logo')
const lineLogoDecoration = document.querySelector('.line-logo-decoration')
const colLoading = document.querySelector('.col-loading')
setTimeout(() => {
    textLogo.classList.add('active')
}, 500);
setTimeout(() => {
    chatLogo.classList.add('active')
}, 700);
setTimeout(() => {
    lineLogoDecoration.classList.add('active')
}, 900);
setTimeout(() => {
    colLoading.style.opacity = '0'
    colLoading.style.zIndex = '-3'

}, 3000);
let iconMenu = document.querySelector('.icon-menu');
let linkNav = document.querySelector('.link-nav-hp');
let isClik = false;
iconMenu.addEventListener('click', function () {
    if (isClik) {
        linkNav.style.left = '0%'
        isClik = false
    } else {
        linkNav.style.left = '-80%'
        isClik = true
    }
})