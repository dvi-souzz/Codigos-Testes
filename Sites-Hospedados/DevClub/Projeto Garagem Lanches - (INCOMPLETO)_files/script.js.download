
const cartPanel = document.getElementById("cart-panel");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

let cart = [];

try {
    cart = JSON.parse(localStorage.getItem("garagemCart")) || [];
    if (!Array.isArray(cart)) cart = [];
} catch {
    cart = [];
}

function saveCart() {
    localStorage.setItem("garagemCart", JSON.stringify(cart));
}

function formatPrice(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    saveCart();
    renderCart();

    cartPanel.classList.add("open");
    cartPanel.setAttribute("aria-hidden", "false");
}

function changeQuantity(name, amount) {
    const item = cart.find(product => product.name === name);
    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.name !== name);
    }

    saveCart();
    renderCart();
}

function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let quantity = 0;

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="cart-empty">Seu carrinho está vazio.</p>';
    }

    cart.forEach(item => {
        total += item.price * item.quantity;
        quantity += item.quantity;

        const product = document.createElement("div");
        product.className = "cart-item";

        const title = document.createElement("h3");
        title.textContent = item.name;

        const price = document.createElement("p");
        price.textContent =
            `${formatPrice(item.price)} cada`;

        const subtotal = document.createElement("p");
        subtotal.textContent =
            `Subtotal: ${formatPrice(item.price * item.quantity)}`;

        const decrease = document.createElement("button");
        decrease.textContent = "−";
        decrease.setAttribute("aria-label", `Diminuir ${item.name}`);
        decrease.addEventListener("click", () =>
            changeQuantity(item.name, -1)
        );

        const amount = document.createElement("span");
        amount.textContent = ` ${item.quantity} `;

        const increase = document.createElement("button");
        increase.textContent = "+";
        increase.setAttribute("aria-label", `Aumentar ${item.name}`);
        increase.addEventListener("click", () =>
            changeQuantity(item.name, 1)
        );

        const remove = document.createElement("button");
        remove.textContent = "Remover";
        remove.addEventListener("click", () =>
            removeItem(item.name)
        );

        product.append(
            title, price, subtotal,
            decrease, amount, increase, remove
        );

        cartItems.appendChild(product);
    });

    cartCount.textContent = quantity;
    cartTotal.textContent = formatPrice(total);

    document.getElementById("checkout-button").disabled =
        cart.length === 0;
}

// Aproveita os seis produtos que já existem no HTML.
document.querySelectorAll(".menu .box").forEach(box => {
    const button = box.querySelector(".bnt");
    const name = box.querySelector("h3")?.textContent.trim();
    const priceElement = box.querySelector(".price");

    if (!button || !name || !priceElement) return;

    // Lê somente o preço atual, ignorando o preço riscado.
    const priceText = priceElement.childNodes[0].textContent;
    const price = Number(
        priceText.replace(/[^\d,]/g, "").replace(",", ".")
    );

    button.addEventListener("click", event => {
        event.preventDefault();
        addToCart(name, price);
    });
});

document.getElementById("cart-toggle").addEventListener("click", () => {
    cartPanel.classList.add("open");
    cartPanel.setAttribute("aria-hidden", "false");
});

document.getElementById("cart-close").addEventListener("click", () => {
    cartPanel.classList.remove("open");
    cartPanel.setAttribute("aria-hidden", "true");
});

document.getElementById("checkout-button").addEventListener("click", () => {
    if (cart.length === 0) return;

    const lines = cart.map(item =>
        `${item.quantity}x ${item.name} — ${formatPrice(item.price * item.quantity)}`
    );

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const message = [
        "Olá! Gostaria de fazer um pedido na Garagem Lanches:",
        "",
        ...lines,
        "",
        `Total: ${formatPrice(total)}`
    ].join("\n");

    const url = "https://wa.me/5511996720002?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank");
});

renderCart();


// ================================
// ANIMAÇÕES AO SUBIR E DESCER A PÁGINA
// ================================

const elementosAnimados = document.querySelectorAll(`
    .about .title,
    .about .row,
    .menu .title,
    .menu .box,
    .review .title,
    .review .box,
    .address .title,
    .address iframe,
    .footer .share
`);

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("is-visible");
        } else {
            entrada.target.classList.remove("is-visible");
        }
    });
}, {
    threshold: 0.12
});

elementosAnimados.forEach((elemento) => {
    elemento.classList.add("reveal");
    observador.observe(elemento);
});
