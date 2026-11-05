document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todas as imagens dentro de .card-head
    const images = document.querySelectorAll(".card-head img");

    images.forEach((image) => {
        // Adiciona o cursor de clique via JS
        image.style.cursor = "pointer";

        image.addEventListener("click", () => {
            const currentCard = image.closest(".card");
            
            // Busca qualquer div interna que comece com 'card-body'
            const currentBody = currentCard.querySelector("[class*='card-body']");

            // Fecha todos os outros cards abertos
            document.querySelectorAll("[class*='card-body']").forEach((body) => {
                if (body !== currentBody) {
                    body.classList.add("hidden");
                }
            });

            // Abre ou fecha o card clicado
            currentBody.classList.toggle("hidden");
        });
    });
});

const musica = document.getElementById("musica");

    musica.volume = 0.25;

    window.addEventListener("load", () => {
        musica.play().catch(() => {
            console.log("Autoplay bloqueado pelo navegador.");
        });
    });