// Simulação de banco de dados (poderia vir de backend futuramente)
const usuarios = [
    { email: "joao@email.com", senha: "123456", nome: "João da Silva" },
    { email: "maria@email.com", senha: "abcdef", nome: "Maria Oliveira" }
];

// Abrir/Fechar modal
const modal = document.getElementById("modal-login");
document.querySelector(".btn-login").addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("hidden");
});
document.getElementById("cancelar-login").addEventListener("click", () => {
    modal.classList.add("hidden");
    document.getElementById("erro-login").classList.add("hidden");
});

// Autenticar usuário
document.getElementById("form-login").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const senha = document.getElementById("login-senha").value.trim();

    const user = usuarios.find(u => u.email === email && u.senha === senha);

    if (user) {
        sessionStorage.setItem("logado", "true");
        sessionStorage.setItem("usuario", JSON.stringify(user));
        modal.classList.add("hidden");
        atualizarInterfaceUsuarioLogado();
    } else {
        document.getElementById("erro-login").classList.remove("hidden");
        document.getElementById("login-email").classList.add("erro-input");
        document.getElementById("login-senha").classList.add("erro-input");
    }
});

// Atualiza interface após login
function atualizarInterfaceUsuarioLogado() {
    const user = JSON.parse(sessionStorage.getItem("usuario"));
    if (!user) return;

    // Mostrar nome na coluna1
    const perfil = document.querySelector(".coluna1");
    const userSpan = document.createElement("p");
    userSpan.textContent = `Usuário: ${user.nome}`;
    userSpan.style.marginTop = "10px";
    perfil.appendChild(userSpan);

    document.querySelectorAll(".publicacao").forEach((pub, index) => {
        const input = pub.querySelector(".comentario-input");
        const btn = pub.querySelector(".comentar-btn");
        const ul = pub.querySelector(".lista-comentarios");

        input.disabled = false;
        btn.disabled = true;

        input.addEventListener("input", () => {
            btn.disabled = input.value.trim() === "";
        });

        btn.addEventListener("click", () => {
            if (!input.value.trim()) return;
            const comentario = {
                nome: user.nome,
                texto: input.value.trim()
            };

            const key = `comentarios-${index}`;
            const salvos = JSON.parse(localStorage.getItem(key)) || [];
            salvos.push(comentario);
            localStorage.setItem(key, JSON.stringify(salvos));
            renderizarComentarios(ul, salvos);
            input.value = "";
            btn.disabled = true;
        });

        const key = `comentarios-${index}`;
        const existentes = JSON.parse(localStorage.getItem(key)) || [];
        renderizarComentarios(ul, existentes);
    });

    // Ativar botões de like/dislike
    document.querySelectorAll(".like-img-btn, .dislike-img-btn").forEach(btn => {
        btn.disabled = false;
    });
}

// Renderiza comentários
function renderizarComentarios(ul, lista) {
    ul.innerHTML = "";
    lista.forEach(c => {
        const li = document.createElement("li");
        li.textContent = `${c.nome}: ${c.texto}`;
        ul.appendChild(li);
    });
}

// Impedir ações se não estiver logado
function protegerInteracoes() {
    const logado = sessionStorage.getItem("logado") === "true";
    const interativos = document.querySelectorAll(".like-img-btn, .dislike-img-btn, .comentar-btn");

    interativos.forEach(btn => {
        if (!logado) {
            btn.addEventListener("click", () => {
                modal.classList.remove("hidden");
            });
        } else {
            btn.disabled = false;
        }
    });
}

// Persistência de likes/dislikes
document.querySelectorAll(".publicacao").forEach((pub, index) => {
    const likeBtn = pub.querySelector(".like-img-btn");
    const dislikeBtn = pub.querySelector(".dislike-img-btn");
    const likeCount = pub.querySelector(".like-img-count");
    const dislikeCount = pub.querySelector(".dislike-img-count");

    const likeKey = `likes-${index}`;
    const dislikeKey = `dislikes-${index}`;

    let likes = parseInt(localStorage.getItem(likeKey)) || 0;
    let dislikes = parseInt(localStorage.getItem(dislikeKey)) || 0;

    likeCount.textContent = likes;
    dislikeCount.textContent = dislikes;

    likeBtn.addEventListener("click", () => {
        if (sessionStorage.getItem("logado") !== "true") return;
        likes++;
        likeCount.textContent = likes;
        localStorage.setItem(likeKey, likes);
        atualizarTotalLikes();
    });

    dislikeBtn.addEventListener("click", () => {
        if (sessionStorage.getItem("logado") !== "true") return;
        dislikes++;
        dislikeCount.textContent = dislikes;
        localStorage.setItem(dislikeKey, dislikes);
        atualizarTotalDislikes();
    });
});

// Totalizadores na coluna 1
function atualizarTotalLikes() {
    let total = 0;
    document.querySelectorAll(".like-img-count").forEach(e => total += parseInt(e.textContent));
    document.getElementById("like-count").textContent = total;
}

function atualizarTotalDislikes() {
    let total = 0;
    document.querySelectorAll(".dislike-img-count").forEach(e => total += parseInt(e.textContent));
    document.getElementById("dislike-count").textContent = total;
}

// Executa ao carregar
document.addEventListener("DOMContentLoaded", () => {
    protegerInteracoes();
    if (sessionStorage.getItem("logado") === "true") {
        atualizarInterfaceUsuarioLogado();
    }
    atualizarTotalLikes();
    atualizarTotalDislikes();
});
