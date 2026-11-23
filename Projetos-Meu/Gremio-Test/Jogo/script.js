
// ===================================
// CONFIGURAÇÕES
// ===================================

const MAX_PHASE = 10;

let phaseGoal = 0;

const MAX_MISSES = 5;
const MAX_BAD_COLLECTED = 3;

const TRANSITION_TIME = 3000;

const SCHOOL_WEBSITE = "https://SEU-SITE-DO-GREMIO.com.br";

const goodObjects = [
    "📚", "✏️", "📒", "🍎",
    "⚽", "⭐", "🎒", "🖊️"
];

const badObjects = [
    "💣", "☠️", "🧪", "🦠"
];

// ===================================
// TEMAS DE CADA FASE
// ===================================

const phaseThemes = [
    // Fases 1-2: manhã
    { wallTop: "#dce8ee", wallBottom: "#b8cbd8", sky1: "#9bcce9", sky2: "#d4efff", floor1: "#c5b39d", floor2: "#a99076" },
    // Fases 3-4: meio-dia
    { wallTop: "#e8f1d9", wallBottom: "#c9dcae", sky1: "#6ec1f2", sky2: "#bfe8ff", floor1: "#c9b58a", floor2: "#ad9565" },
    // Fases 5-6: tarde
    { wallTop: "#f2e3c8", wallBottom: "#e0c597", sky1: "#f5c16c", sky2: "#ffe3a8", floor1: "#c7a77d", floor2: "#a58559" },
    // Fases 7-8: pôr do sol
    { wallTop: "#f0cdc0", wallBottom: "#c79a9a", sky1: "#e8707a", sky2: "#ffb27a", floor1: "#a88274", floor2: "#85625a" },
    // Fases 9-10: noite
    { wallTop: "#4a5a82", wallBottom: "#2f3b5e", sky1: "#101e45", sky2: "#2a3f7a", floor1: "#5a5068", floor2: "#3d3548" }
];

function applyPhaseTheme() {

    const index = Math.min(
        Math.floor((phase - 1) / 2),
        phaseThemes.length - 1
    );

    const t = phaseThemes[index];

    gameArea.style.setProperty("--wall-top", t.wallTop);
    gameArea.style.setProperty("--wall-bottom", t.wallBottom);
    gameArea.style.setProperty("--sky-1", t.sky1);
    gameArea.style.setProperty("--sky-2", t.sky2);
    gameArea.style.setProperty("--floor-1", t.floor1);
    gameArea.style.setProperty("--floor-2", t.floor2);
}


// ===================================
// ELEMENTOS HTML
// ===================================

const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const victoryScreen = document.querySelector("#victory-screen");
const gameoverScreen = document.querySelector("#gameover-screen");

const startButton = document.querySelector("#start-button");
const schoolButton = document.querySelector("#school-button");
const restartButton = document.querySelector("#restart-button");
const tryAgainButton = document.querySelector("#try-again-button");

const gameArea = document.querySelector("#game-area");
const player = document.querySelector("#player");
const objectsContainer = document.querySelector("#objects-container");

const scoreDisplay = document.querySelector("#score");
const phaseDisplay = document.querySelector("#phase");
const goalDisplay = document.querySelector("#goal");

const phaseNotification = document.querySelector("#phase-notification");
const nextPhaseText = document.querySelector("#next-phase-text");

const missesDisplay = document.querySelector("#misses");
const badDisplay = document.querySelector("#bad-collected");


// ===================================
// VARIÁVEIS
// ===================================

let score = 0;
let phase = 1;

let misses = 0;
let badCollected = 0;

let objects = [];

let playerX = 0;

let spawnTimer = 0;
let lastTime = 0;

let animationId = null;
let phaseTimeout = null;

let gameRunning = false;
let transitioning = false;


// ===================================
// CONTROLE DE TELAS
// ===================================

function changeScreen(screen) {

    document.querySelectorAll(".screen").forEach(element => {
        element.classList.remove("active");
    });

    screen.classList.add("active");
}


// ===================================
// INICIAR JOGO
// ===================================

function startGame() {

    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    clearTimeout(phaseTimeout);

    score = 0;
    phase = 1;

    misses = 0;
    badCollected = 0;

    // META INICIAL ALEATÓRIA ENTRE 4 E 6
    phaseGoal = Math.floor(Math.random() * 3) + 4;

    objects = [];

    spawnTimer = 0;
    lastTime = 0;

    transitioning = false;
    gameRunning = true;

    objectsContainer.innerHTML = "";

    phaseNotification.classList.remove("show");

    changeScreen(gameScreen);

    playerX = gameArea.clientWidth / 2;

    updatePlayer();
    updateInterface();

    animationId = requestAnimationFrame(gameLoop);
}


// ===================================
// ATUALIZAR INTERFACE
// ===================================

function updateInterface() {

    scoreDisplay.textContent = score;
    phaseDisplay.textContent = phase;
    goalDisplay.textContent = phaseGoal;

    missesDisplay.textContent = `${misses}/5`;
    badDisplay.textContent = `${badCollected}/3`;

    applyPhaseTheme();

}
// ===================================
// MOVIMENTAÇÃO DO PERSONAGEM
// ===================================

function movePlayer(event) {

    if (!gameRunning) return;

    const rect = gameArea.getBoundingClientRect();

    const halfPlayer = player.offsetWidth / 2;

    playerX = event.clientX - rect.left;

    playerX = Math.max(
        halfPlayer,
        Math.min(rect.width - halfPlayer, playerX)
    );

    updatePlayer();
}

function updatePlayer() {

    player.style.left = playerX + "px";

}

gameArea.addEventListener("pointerdown", movePlayer);

gameArea.addEventListener("pointermove", event => {

    if (
        event.buttons === 1 ||
        event.pointerType === "touch"
    ) {
        movePlayer(event);
    }

});


// ===================================
// CRIAR OBJETOS
// ===================================

function spawnObject() {

    const object = document.createElement("div");

    object.classList.add("falling-object");

    // 25% DE CHANCE DE SER UM OBJETO RUIM

    const isBad = Math.random() < 0.25;

    const collection = isBad ? badObjects : goodObjects;

    const randomObject = collection[
        Math.floor(Math.random() * collection.length)
    ];

    object.innerHTML = `<span class="object-icon">${randomObject}</span>`;

    if (isBad) {
        object.classList.add("bad");
    }

    const areaWidth = gameArea.clientWidth;

    const positionX = Math.random() * (areaWidth - 40);

    object.style.left = positionX + "px";

    objectsContainer.appendChild(object);

    objects.push({
        element: object,
        x: positionX,
        y: -40,
        speed: 150 + (phase * 35),
        bad: isBad
    });

}


// ===================================
// REMOVER OBJETOS
// ===================================

function removeObject(index) {

    const object = objects[index];

    if (!object) return;

    object.element.remove();

    objects.splice(index, 1);

}


// ===================================
// COLETAR OBJETOS
// ===================================

function collectObject(index) {

    const object = objects[index];

    if (!object) return;

    const isBad = object.bad;

    removeObject(index);

    // OBJETO RUIM
    if (isBad) {

        badCollected++;

        updateInterface(); // ATUALIZA IMEDIATAMENTE

        if (badCollected >= MAX_BAD_COLLECTED) {
            gameOver();
            return;
        }

        return;
    }

    // OBJETO BOM
    score++;

    updateInterface();

    if (score >= phaseGoal) {
        nextPhase();
    }

}


// ===================================
// PERDER OBJETOS BONS
// ===================================

function missObject(index) {

    const object = objects[index];

    if (!object) return;

    // OBJETO RUIM NÃO CONTA COMO PERDIDO
    if (object.bad) {
        removeObject(index);
        return;
    }

    removeObject(index);

    misses++;

    updateInterface(); // ATUALIZA IMEDIATAMENTE

    if (misses >= MAX_MISSES) {
        gameOver();
    }

}


// ===================================
// MOVIMENTAR OBJETOS
// ===================================

function moveObjects(deltaTime) {

    const playerRect = player.getBoundingClientRect();

    for (
        let index = objects.length - 1;
        index >= 0;
        index--
    ) {

        const object = objects[index];

        object.y += object.speed * deltaTime;

        object.element.style.transform =
            `translateY(${object.y}px)`;

        const objectRect =
            object.element.getBoundingClientRect();

        // DETECTAR COLISÃO

        const collision =
            objectRect.left < playerRect.right &&
            objectRect.right > playerRect.left &&
            objectRect.top < playerRect.bottom &&
            objectRect.bottom > playerRect.top;

        if (collision) {

            collectObject(index);

            if (!gameRunning || transitioning) {
                return;
            }

            continue;
        }

        // OBJETO SAIU DA TELA

        if (object.y > gameArea.clientHeight) {

            missObject(index);

            if (!gameRunning) {
                return;
            }
        }

    }

}


// ===================================
// PRÓXIMA FASE
// ===================================

function nextPhase() {

    if (transitioning || !gameRunning) return;

    transitioning = true;

    cancelAnimationFrame(animationId);

    // LIMPAR OBJETOS DA TELA

    objects.forEach(object => {
        object.element.remove();
    });

    objects = [];

    spawnTimer = 0;

    // VERIFICAR VITÓRIA

    if (phase >= MAX_PHASE) {
        victory();
        return;
    }

    // AVANÇAR FASE

    phase++;

    // NOVA META: SEMPRE MAIOR QUE A ANTERIOR
    // AUMENTO ALEATÓRIO DE 1 OU 2 PONTOS

    phaseGoal += Math.floor(Math.random() * 2) + 1;

    score = 0;

    updateInterface();

    // NOTIFICAÇÃO

    nextPhaseText.textContent = "FASE " + phase;

    phaseNotification.classList.add("show");

    // PAUSA DE 3 SEGUNDOS

    phaseTimeout = setTimeout(() => {

        phaseNotification.classList.remove("show");

        transitioning = false;

        lastTime = 0;

        if (gameRunning) {
            animationId = requestAnimationFrame(gameLoop);
        }

    }, TRANSITION_TIME);

}


// ===================================
// LOOP PRINCIPAL
// ===================================

function gameLoop(timestamp) {

    if (!gameRunning || transitioning) return;

    if (!lastTime) {
        lastTime = timestamp;
    }

    const deltaTime = Math.min(
        (timestamp - lastTime) / 1000,
        0.05
    );

    lastTime = timestamp;

    spawnTimer += deltaTime;

    // VELOCIDADE DE GERAÇÃO DOS OBJETOS

    const spawnInterval = Math.max(
        0.3,
        1.2 - (phase * 0.08)
    );

    if (spawnTimer >= spawnInterval) {

        spawnObject();

        spawnTimer = 0;
    }

    moveObjects(deltaTime);

    if (gameRunning && !transitioning) {

        animationId = requestAnimationFrame(gameLoop);

    }

}


// ===================================
// GAME OVER
// ===================================

function gameOver() {

    if (!gameRunning) return;

    gameRunning = false;

    cancelAnimationFrame(animationId);
    clearTimeout(phaseTimeout);

    changeScreen(gameoverScreen);

}


// ===================================
// VITÓRIA
// ===================================

function victory() {

    gameRunning = false;

    cancelAnimationFrame(animationId);
    clearTimeout(phaseTimeout);

    changeScreen(victoryScreen);

}


// ===================================
// BOTÕES
// ===================================

startButton.addEventListener("click", startGame);

restartButton.addEventListener("click", startGame);

tryAgainButton.addEventListener("click", startGame);

schoolButton.addEventListener("click", () => {

    window.location.href = SCHOOL_WEBSITE;

});


// ===================================
// ESTRELAS DA TELA INICIAL
// ===================================

function createStars(amount = 70) {

    const starField = document.querySelector(".star-field");

    for (let i = 0; i < amount; i++) {

        const star = document.createElement("div");

        const size = Math.random() * 2.5 + 1; // 1px a 3.5px

        star.classList.add("star");

        star.style.width = size + "px";
        star.style.height = size + "px";

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        star.style.setProperty("--duration", (Math.random() * 3 + 2) + "s");
        star.style.setProperty("--delay", (Math.random() * 4) + "s");

        starField.appendChild(star);
    }
}

createStars();