
const formulario = document.getElementById("formValidade");
const campoItem = document.getElementById("item");
const campoData = document.getElementById("data");
const campoQuantidade = document.getElementById("quantidade");
const campoValidade = document.getElementById("validadeEmbalagem");

const resultado = document.getElementById("resultado");

// Estimativas ilustrativas em dias.
// Não são prazos universais de segurança alimentar.
const conservacao = {
    "banana": 5,
    "maca": 7,
    "maçã": 7,
    "laranja": 14,
    "tomate": 7,
    "batata": 21,
    "cenoura": 14,
    "alface": 5,
    "pao": 3,
    "pão": 3
};

function normalizar(texto) {
    return texto
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function formatarData(data) {
    return data.toLocaleDateString("pt-BR");
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = campoItem.value.trim();
    const compra = campoData.value;
    const quantidade = Number(campoQuantidade.value);
    const validade = campoValidade.value;

    if (!nome || !compra || quantidade < 1) {
        resultado.textContent = "Preencha os campos corretamente.";
        return;
    }

    const dataCompra = new Date(compra + "T12:00:00");

    if (Number.isNaN(dataCompra.getTime())) {
        resultado.textContent = "Informe uma data de compra válida.";
        return;
    }

    // Se o usuário informou a validade da embalagem,
    // ela será usada em vez de uma estimativa.
    if (validade) {
        const dataValidade = new Date(validade + "T12:00:00");

        if (Number.isNaN(dataValidade.getTime()) ||
            dataValidade < dataCompra) {
            resultado.textContent =
                "Confira a data de compra e a validade informada.";
            return;
        }

        resultado.textContent =
            `Produto: ${nome}. Validade informada: ` +
            `${formatarData(dataValidade)}. Quantidade: ${quantidade}.`;

        return;
    }

    const chave = normalizar(nome);
    const prazo = conservacao[chave];

    if (prazo === undefined) {
        resultado.textContent =
            "Não temos uma estimativa cadastrada para esse alimento. " +
            "Informe a validade da embalagem ou consulte uma fonte confiável.";
        return;
    }

    const vencimento = new Date(dataCompra);
    vencimento.setDate(vencimento.getDate() + prazo);

    resultado.textContent =
        `Alimento: ${nome}. Prazo ilustrativo: ${prazo} dias. ` +
        `Data estimada: ${formatarData(vencimento)}. ` +
        "Confirme as condições de conservação.";
});
