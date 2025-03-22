document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll("img");

    images.forEach(img => {
        if (img.complete) {
            resizeImage(img);
        } else {
            img.onload = () => resizeImage(img);
        }
    });

    function resizeImage(img) {
        const maxWidth = 1800; // Maksimal lebar gambar

        // Cek apakah gambar perlu di-resize
        if (img.naturalWidth <= maxWidth) {
            console.log(`Gambar tidak diubah: ${img.naturalWidth} x ${img.naturalHeight}`);
            return;
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const scaleSize = maxWidth / img.naturalWidth;
        const newWidth = Math.round(img.naturalWidth * scaleSize); // Dibulatkan
        const newHeight = Math.round(img.naturalHeight * scaleSize); // Dibulatkan

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        console.log(`Gambar Asli: ${img.naturalWidth} x ${img.naturalHeight}`);

        // Gunakan toBlob() dengan kualitas lebih rendah (0.2)
        canvas.toBlob((blob) => {
            console.log(`Gambar Setelah Resize: ${newWidth} x ${newHeight}`);
            console.log(`Ukuran File Baru: ${(blob.size / 1024).toFixed(2)} KB`);

            const newSrc = URL.createObjectURL(blob);
            img.src = newSrc;
        }, "image/webp", 0.3); // Turunkan kualitas ke 20%
    }
});





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