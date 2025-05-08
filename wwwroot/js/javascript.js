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

// Likes, dislikes e comentários das imagens
document.querySelectorAll('.publicacao').forEach(function(pub) {
    let likeImgBtn = pub.querySelector('.like-img-btn');
    let dislikeImgBtn = pub.querySelector('.dislike-img-btn');
    let likeImgCount = pub.querySelector('.like-img-count');
    let dislikeImgCount = pub.querySelector('.dislike-img-count');
    let comentarBtn = pub.querySelector('.comentar-btn');
    let comentarioInput = pub.querySelector('.comentario-input');
    let listaComentarios = pub.querySelector('.lista-comentarios');

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
        }
    };
});

// Botão de login
document.getElementById('login-btn').onclick = function() {
    alert('Funcionalidade de login em breve!');
};