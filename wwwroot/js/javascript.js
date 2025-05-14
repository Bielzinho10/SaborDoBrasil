// Likes e dislikes da coluna 1
let likeCount = 0;
let dislikeCount = 0;

document.getElementById('like-btn').onclick = function() {
    likeCount++;
    document.getElementById('like-count').textContent = likeCount;
};

document.getElementById('dislike-btn').onclick = function() {
    dislikeCount++;
    document.getElementById('dislike-count').textContent = dislikeCount;
};

// Likes, dislikes e comentários das imagens + contador de comentários
document.querySelectorAll('.publicacao').forEach(function(pub) {
    let likeImgBtn = pub.querySelector('.like-img-btn');
    let dislikeImgBtn = pub.querySelector('.dislike-img-btn');
    let likeImgCount = pub.querySelector('.like-img-count');
    let dislikeImgCount = pub.querySelector('.dislike-img-count');
    let comentarBtn = pub.querySelector('.comentar-btn');
    let comentarioInput = pub.querySelector('.comentario-input');
    let listaComentarios = pub.querySelector('.lista-comentarios');

    // Adiciona contador de comentários se não existir
    let contador = pub.querySelector('.comentario-contador');
    if (!contador) {
        contador = document.createElement('span');
        contador.className = 'comentario-contador';
        contador.textContent = '0 comentários';
        listaComentarios.parentElement.insertBefore(contador, listaComentarios);
    }

    let likeImg = 0;
    let dislikeImg = 0;

    likeImgBtn.onclick = function() {
        likeImg++;
        likeImgCount.textContent = likeImg;
    };

    dislikeImgBtn.onclick = function() {
        dislikeImg++;
        dislikeImgCount.textContent = dislikeImg;
    };

    comentarBtn.onclick = function() {
        const texto = comentarioInput.value.trim();
        if (texto) {
            const li = document.createElement('li');
            li.textContent = texto;
            listaComentarios.appendChild(li);
            comentarioInput.value = '';
            // Atualiza contador de comentários
            contador.textContent = `${listaComentarios.children.length} comentário${listaComentarios.children.length > 1 ? 's' : ''}`;
        }
    };
});

// Botão de login (se existir)
const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
    loginBtn.onclick = function() {
        alert('Funcionalidade de login em breve!');
    };
}

// Carrossel simples (se existir)
const imgs = document.querySelectorAll('.carrossel-img');
if (imgs.length > 0) {
    let idx = 0;
    setInterval(() => {
        imgs.forEach(img => img.classList.remove('ativo'));
        idx = (idx + 1) % imgs.length;
        imgs[idx].classList.add('ativo');
    }, 3000);
}

// Botão voltar ao topo (se existir)
const botaoTopo = document.getElementById('voltar-topo');
if (botaoTopo) {
    window.onscroll = function() {
        if (document.documentElement.scrollTop > 200) {
            botaoTopo.style.display = 'block';
        } else {
            botaoTopo.style.display = 'none';
        }
    };
}