// Referências
const btnLoginLogout = document.getElementById('btn-login-logout');
const modalLogin = document.getElementById('modal-login');
const formLogin = document.getElementById('form-login');
const comentariosSections = document.querySelectorAll('.comentarios');

let loggedIn = false;
let currentUser = null;

// Dados para likes/dislikes do usuário (perfil)
let userLikesCount = 0;
let userDislikesCount = 0;

// Total global no perfil (os spans com ids)
const totalLikesSpan = document.getElementById('total-likes');
const totalDislikesSpan = document.getElementById('total-dislikes');

// Abrir modal login
btnLoginLogout.addEventListener('click', () => {
  if (!loggedIn) {
    openModal();
  } else {
    logout();
  }
});

// Modal funções
function openModal() {
  modalLogin.classList.add('active');
  modalLogin.setAttribute('aria-hidden', 'false');
  document.getElementById('usuario').focus();
}
function closeModal() {
  modalLogin.classList.remove('active');
  modalLogin.setAttribute('aria-hidden', 'true');
}

// Submissão login
formLogin.addEventListener('submit', e => {
  e.preventDefault();
  const usuario = formLogin.usuario.value.trim();
  const senha = formLogin.senha.value.trim();

  if (usuario && senha) {
    loggedIn = true;
    currentUser = usuario;
    btnLoginLogout.textContent = 'Sair';
    closeModal();
    alert(`Bem-vindo(a), ${usuario}!`);
    // Pode carregar perfil, likes, dislikes do usuário aqui
    // Inicializar com valores padrão
    userLikesCount = 0;
    userDislikesCount = 0;
    updatePerfil();
  } else {
    alert('Preencha todos os campos.');
  }
});

// Fechar modal clicando fora do conteúdo
modalLogin.addEventListener('click', e => {
  if (e.target === modalLogin) {
    closeModal();
  }
});

// Logout
function logout() {
  loggedIn = false;
  currentUser = null;
  btnLoginLogout.textContent = 'Entrar';
  userLikesCount = 0;
  userDislikesCount = 0;
  updatePerfil();
  alert('Você saiu da conta.');
  // Opcional: limpar campos de comentários etc
}

// Atualiza o perfil (totais likes/dislikes)
function updatePerfil() {
  totalLikesSpan.textContent = userLikesCount;
  totalDislikesSpan.textContent = userDislikesCount;
}

// Função para atualizar contador do post no DOM
function updatePostCounters(postId, likes, dislikes, comments) {
  const btnLike = document.querySelector(`.btn-like[data-post-id="${postId}"] .contador-likes`);
  const btnDislike = document.querySelector(`.btn-dislike[data-post-id="${postId}"] .contador-dislikes`);
  const btnComments = document.querySelector(`.btn-chat[data-post-id="${postId}"] .contador-comentarios`);
  if (btnLike) btnLike.textContent = likes;
  if (btnDislike) btnDislike.textContent = dislikes;
  if (btnComments) btnComments.textContent = comments;
}

// Estado de cada post: armazenar likes, dislikes, comentários e qual usuário curtiu ou não
const postsData = {};

// Inicialização dos posts do DOM
document.querySelectorAll('.publicacao').forEach(postEl => {
  const postId = postEl.querySelector('.btn-like').getAttribute('data-post-id');
  
  // Pegamos os valores iniciais do DOM
  const likes = parseInt(postEl.querySelector('.contador-likes').textContent) || 0;
  const dislikes = parseInt(postEl.querySelector('.contador-dislikes').textContent) || 0;
  const commentsCount = postEl.querySelector('.lista-comentarios').children.length || 0;
  
  postsData[postId] = {
    likes,
    dislikes,
    commentsCount,
    likedByUser: false,
    dislikedByUser: false,
  };
});

// Botões de like
document.querySelectorAll('.btn-like').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!loggedIn) {
      alert('Você precisa estar logado para curtir.');
      openModal();
      return;
    }
    
    const postId = btn.getAttribute('data-post-id');
    const post = postsData[postId];

    if (post.likedByUser) {
      // Tirar like
      post.likes--;
      post.likedByUser = false;
      userLikesCount--;
    } else {
      // Colocar like
      post.likes++;
      post.likedByUser = true;
      userLikesCount++;

      // Se tinha disliked, tirar dislike
      if (post.dislikedByUser) {
        post.dislikes--;
        post.dislikedByUser = false;
        userDislikesCount--;
      }
    }

    updatePostCounters(postId, post.likes, post.dislikes, post.commentsCount);
    updatePerfil();
  });
});

// Botões de dislike
document.querySelectorAll('.btn-dislike').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!loggedIn) {
      alert('Você precisa estar logado para não gostar.');
      openModal();
      return;
    }
    
    const postId = btn.getAttribute('data-post-id');
    const post = postsData[postId];

    if (post.dislikedByUser) {
      // Tirar dislike
      post.dislikes--;
      post.dislikedByUser = false;
      userDislikesCount--;
    } else {
      // Colocar dislike
      post.dislikes++;
      post.dislikedByUser = true;
      userDislikesCount++;

      // Se tinha liked, tirar like
      if (post.likedByUser) {
        post.likes--;
        post.likedByUser = false;
        userLikesCount--;
      }
    }

    updatePostCounters(postId, post.likes, post.dislikes, post.commentsCount);
    updatePerfil();
  });
});

// Botões comentários (mostrar/ocultar)
document.querySelectorAll('.btn-chat').forEach(btn => {
  btn.addEventListener('click', () => {
    const postId = btn.getAttribute('data-post-id');
    const postEl = btn.closest('.publicacao');
    const comentariosSection = postEl.querySelector('.comentarios');

    if (comentariosSection.hasAttribute('hidden')) {
      comentariosSection.removeAttribute('hidden');
      btn.setAttribute('aria-expanded', 'true');
      comentariosSection.querySelector('textarea').focus();
    } else {
      comentariosSection.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
});

// Textareas e botões comentar
document.querySelectorAll('.comentarios').forEach(comentSection => {
  const textarea = comentSection.querySelector('textarea');
  const btnComentar = comentSection.querySelector('.comentar-btn');
  const postEl = comentSection.closest('.publicacao');
  const postId = postEl.querySelector('.btn-like').getAttribute('data-post-id');
  const ulComentarios = comentSection.querySelector('.lista-comentarios');

  // Habilitar botão comentar quando textarea tem texto
  textarea.addEventListener('input', () => {
    if (textarea.value.trim().length > 0 && loggedIn) {
      btnComentar.classList.add('enabled');
      btnComentar.disabled = false;
    } else {
      btnComentar.classList.remove('enabled');
      btnComentar.disabled = true;
    }
  });

  // Clique no botão comentar
  btnComentar.addEventListener('click', () => {
    if (!loggedIn) {
      alert('Você precisa estar logado para comentar.');
      openModal();
      return;
    }

    const texto = textarea.value.trim();
    if (texto.length === 0) return;

    // Criar novo comentário
    const li = document.createElement('li');
    li.innerHTML = `<strong>${currentUser}:</strong> <span>${texto}</span>`;
    ulComentarios.appendChild(li);

    // Limpar textarea e desabilitar botão
    textarea.value = '';
    btnComentar.classList.remove('enabled');
    btnComentar.disabled = true;

    // Atualizar contador de comentários
    postsData[postId].commentsCount++;
    updatePostCounters(postId, postsData[postId].likes, postsData[postId].dislikes, postsData[postId].commentsCount);
  });
});
