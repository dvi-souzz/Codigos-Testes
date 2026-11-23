const carousel = document.querySelector("#carousel");
const currentDisplay = document.querySelector("#current");
const totalDisplay = document.querySelector("#total");
const progress = document.querySelector("#progress");

const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");

let cards = [];

function pad(number) {
    return String(number).padStart(2, "0");
}

// ===================================
// CATEGORIAS E TEMAS
// ===================================

const categorias = {

    inicio: {
        titulo: "Início",
        cor: "#000",
        cards: [
            { tag: "categoria", titulo: "titulo", texto: "descricao", emoji: "🤟👩‍👩‍👦‍👦"},
            { tag: "categoria", titulo: "titulo", texto: "descricao", emoji: "🤟👩‍👩‍👦‍👦"},
            { tag: "categoria", titulo: "titulo", texto: "descricao", emoji: "🤟👩‍👩‍👦‍👦"},
        ]
    },

    gremio: {
        titulo: "Propostas do Grêmio",
        cor: "#172b4d",
        cards: [
            { tag: "Estrutura", titulo: "Mais bebedouros", texto: "Instalar 2 bebedouros novos no pátio.", emoji: "🚰" },
            { tag: "Estudos",   titulo: "Sala de estudos",  texto: "Espaço silencioso aberto no intervalo.", emoji: "📚" },
            { tag: "Bem-estar", titulo: "Cantina justa",    texto: "Pesquisa de preços e opções mais saudáveis.", emoji: "🍎" }
        ]
    },

    eventos: {
        titulo: "Eventos",
        cor: "#3b1d6e",
        cards: [
            { tag: "Festa",    titulo: "Festa junina da escola", texto: "Barracas, quadrilha e comidas típicas com todas as turmas.", emoji: "🎉" },
            { tag: "Esporte",  titulo: "Gincana interclasses",   texto: "Provas e brincadeiras valendo pontos para a turma.", emoji: "🏆" },
            { tag: "Cultura",  titulo: "Sarau e talentos",       texto: "Palco aberto para música, dança e poesia.", emoji: "🎤" },
            { tag: "Diversão", titulo: "Dia do jogo",            texto: "Torneio de jogos de tabuleiro e videogame no intervalo.", emoji: "🎮" }
        ]
    }
};

const categoryNav = document.querySelector("#category");
const signTitle = document.querySelector("#sign-title");
const sign = document.querySelector(".sign");
const themeMeta = document.querySelector('meta[name="theme-color"]');

function showCategory(key) {

    const data = categorias[key];

    if (!data) return;

    // 1. tema da página
    document.body.dataset.theme = key;
    themeMeta.setAttribute("content", data.cor);

    // 2. botão ativo
    categoryNav.querySelectorAll(".item").forEach(button => {
        button.classList.toggle("active", button.dataset.categoria === key);
    });

    // 3. placa (reinicia a animação de queda)
    signTitle.textContent = data.titulo;
    sign.classList.remove("change");
    void sign.offsetWidth; // força o navegador a reiniciar a animação
    sign.classList.add("change");

    // 4. cards
    carousel.innerHTML = data.cards.map(card => `
        <article class="card">
            <div class="card-media">${card.emoji}</div>
            <span class="card-tag">${card.tag}</span>
            <h3>${card.titulo}</h3>
            <p>${card.texto}</p>
        </article>
    `).join("");

    // 5. volta ao primeiro card sem animação e recalcula contador e tracinhos
    carousel.style.scrollBehavior = "auto";
    setupCarousel();
    carousel.style.scrollBehavior = "";
}

categoryNav.addEventListener("click", event => {

    const button = event.target.closest(".item");

    if (!button) return;

    showCategory(button.dataset.categoria);
});

// Começa na categoria padrão
showCategory("gremio");

// Cria os tracinhos conforme a quantidade de cards
function setupCarousel() {

    cards = [...carousel.querySelectorAll(".card")];

    totalDisplay.textContent = pad(cards.length);

    progress.innerHTML = "";

    cards.forEach(() => {
        progress.appendChild(document.createElement("span"));
    });

    carousel.scrollLeft = 0;

    updateCounter();
}

// Descobre qual card está no centro
function getCurrentIndex() {

    if (!cards.length) return 0;

    const step = cards[0].offsetWidth + 16; // largura + gap

    const index = Math.round(carousel.scrollLeft / step);

    return Math.max(0, Math.min(cards.length - 1, index));
}

function updateCounter() {

    const index = getCurrentIndex();

    currentDisplay.textContent = pad(index + 1);

    [...progress.children].forEach((bar, i) => {
        bar.classList.toggle("active", i === index);
    });
}

carousel.addEventListener("scroll", updateCounter, { passive: true });

// SETAS (computador)
function goTo(direction) {

    const step = cards[0].offsetWidth + 16;

    carousel.scrollBy({ left: direction * step, behavior: "smooth" });
}

prevButton.addEventListener("click", () => goTo(-1));
nextButton.addEventListener("click", () => goTo(1));

// ARRASTAR COM O MOUSE (computador)
let isDragging = false;
let startX = 0;
let startScroll = 0;

carousel.addEventListener("pointerdown", event => {

    if (event.pointerType !== "mouse") return; // no toque o navegador já cuida

    isDragging = true;
    startX = event.clientX;
    startScroll = carousel.scrollLeft;

    // desliga o encaixe e a suavização durante o arrasto
    carousel.style.scrollSnapType = "none";
    carousel.style.scrollBehavior = "auto";
});

window.addEventListener("pointermove", event => {

    if (!isDragging) return;

    carousel.scrollLeft = startScroll - (event.clientX - startX);
});

window.addEventListener("pointerup", () => {

    if (!isDragging) return;

    isDragging = false;

    // volta o encaixe: o card mais próximo "gruda" no centro
    carousel.style.scrollSnapType = "";
    carousel.style.scrollBehavior = "";
});

setupCarousel();