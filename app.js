






document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("img").forEach(img => {
        img.setAttribute("loading", "lazy");
    });
    setTimeout(() => {
        document.querySelectorAll("img").forEach(img => {
            if (img.complete) {
                resizeImage(img);
            } else {
                img.onload = () => resizeImage(img);
            }
        });
    }, 3100);

    function resizeImage(img) {
        const maxWidth = 1800; // Maksimal lebar gambar

        if (img.naturalWidth <= maxWidth) {
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


        // Gunakan toBlob() dengan kualitas lebih rendah (0.2)
        canvas.toBlob((blob) => {

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

const apiKey = "AIzaSyB7UUIDohzIfThHuZpL3Zja1Yx3j6EU62Y"; // Ganti dengan API Key yang kamu buat
const folderIds = {
    "E-sports": "1P9b-OfKoOQxfpjNtEFwd1tRISYF6gQB9",
    "Store": "1PSGB9IgJjO-vNQf0n3VpQT-bBKK7Wz5B",
    "poster": "1dTKFJHUitiTyv3FCLMidzZK1iA3osrlB",
    "Event Turnament": "1PEfcI9i5oCofhSyyb1JXM-P9YpFAkvZn",
    "feed": "1PtGVEeUGLz1sKkbOXvnAdZmjFkg_vEuE?hl=ID",
    "Logo": "1iI23gUkKXvMQVF6QIKb-VgZh3kAHVswa?hl=ID",
    "UMKM": "1Pm7xA6YwafGerIIVma_wK_H-5lPR6XTP",
    "Jersey": "1Sl9li__fX5MhFAFbHIFx0oRXxMp2zQvt",
    "Gaming": "1iH0KzzIlUXgj83YU8BJzWWiodfN1rToV?hl=ID",

};

async function fetchImagesFromDrive(category) {
    const container = document.querySelector(".col-card-proyek");
    container.innerHTML = ""; // Bersihkan sebelum update

    const folderId = folderIds[category];
    if (!folderId) return;

    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name)`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.files || data.files.length === 0) {
        console.log("Tidak ada data ditemukan.");
        // document.getElementById('no-data').style.display = hasVisible ? "none" : "flex";
        alert("pok"); // Ini seharusnya muncul jika tidak ada data
        return;
    }
    data.files.forEach(file => {
        // const imgURL = `https://drive.google.com/thumbnail?id=${file.id}&sz=w1200'+in+parents&key=${apiKey}&fields=files(id,name,thumbnailLink)`;
        const imgURL = `https://drive.google.com/thumbnail?id=${file.id}&sz=w1200`;

        // Jika kategori adalah "feed", gunakan style khusus
        if (category === "feed") {
            container.innerHTML += `
                <div class="card-proyek" style="padding: 0px; box-shadow: none;" data-filter="feed">
                    <img src="${imgURL}" style="width: 100%;" alt="">
                </div>
            `;
        } else {
            container.innerHTML += `
                <div class="card-proyek" data-filter="${category}">
                    <img src="${imgURL}" width="200" alt="">
                    <div class="title-proyek">Desain ${category}</div>
                    <a href="https://wa.me/082139233954" target="_blank">
                        <button class="btn-pesan-desain">Pesan Desain</button>
                    </a>
                </div>
            `;
        }
    });
}

// Load kategori pertama saat halaman dibuka
fetchImagesFromDrive("E-sports");

// Tambahkan event listener untuk tombol filter
document.querySelectorAll(".box-filter").forEach(button => {
    button.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter");
        fetchImagesFromDrive(filter);
    });
});
