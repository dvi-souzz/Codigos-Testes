const cores = {
    azul:     { bg: "rgba(10, 20, 243, 0.5)", tx: "#224499" },
    rosa:     { bg: "#ff69b4", tx: "#ffffff" },
    branco:   { bg: "#DDD9D9", tx: "#4D4A4A" },
    preto:    { bg: "#000000", tx: "#ffffff" },
    roxo:     { bg: "#800080", tx: "#ffffff" },
    marrom:   { bg: "#8B4513", tx: "#ffffff" },
    verde:    { bg: "#008000", tx: "#ffffff" },
    amarelo:  { bg: "#ffff00", tx: "#000000" },
    vermelho: { bg: "#ff0000", tx: "#ffffff" },
    laranja:  { bg: "#ffa500", tx: "#ffffff" }
};

const form = document.getElementById("colorForm");
const input = document.getElementById("myInput");
const resultado = document.getElementById("resultado");
const mensagem = document.getElementById("mensagem");
const botaoVoltar = document.getElementById("voltar");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // impede o formulário de recarregar a página

    const cor = input.value.trim().toLowerCase();
    const config = cores[cor];

    if (!config) {
        alert("Cor não reconhecida!");
        return;
    }

    document.body.style.backgroundColor = config.bg;
    document.body.style.color = config.tx;
    document.body.style.fontWeight = "600";
    document.body.style.textAlign = "center";
    document.body.style.paddingTop = "20%";

    mensagem.textContent = "Você escolheu " + cor;
    form.hidden = true;
    resultado.hidden = false;
});

botaoVoltar.addEventListener("click", function () {
    document.body.removeAttribute("style");
    input.value = "";
    form.hidden = false;
    resultado.hidden = true;
    input.focus();
}); 