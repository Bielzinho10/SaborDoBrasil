window.onload = () => {
  // Likes e dislikes globais do site
  const likeBtnGlobal = document.getElementById('like-btn');
  const dislikeBtnGlobal = document.getElementById('dislike-btn');
  const likeCountGlobal = document.getElementById('like-count');
  const dislikeCountGlobal = document.getElementById('dislike-count');

  // Carregar likes/dislikes globais do localStorage
  let globalLikes = parseInt(localStorage.getItem('globalLikes')) || 0;
  let globalDislikes = parseInt(localStorage.getItem('globalDislikes')) || 0;

  likeCountGlobal.textContent = globalLikes;
  dislikeCountGlobal.textContent = globalDislikes;

  likeBtnGlobal.addEventListener('click', () => {
    globalLikes++;
    likeCountGlobal.textContent = globalLikes;
    localStorage.setItem('globalLikes', globalLikes);
    animateBtn(likeBtnGlobal);
  });

  dislikeBtnGlobal.addEventListener('click', () => {
    globalDislikes++;
    dislikeCountGlobal.textContent = globalDislikes;
    localStorage.setItem('globalDislikes', globalDislikes);
    animateBtn(dislikeBtnGlobal);
  });

  // Função de animação rápida no botão
  function animateBtn(btn) {
    btn.style.transform = 'scale(1.2)';
    setTimeout(() => btn.style.transform = 'scale(1)', 150);
  }

  // Likes, dislikes e comentários para cada publicação
  document.querySelectorAll('.publicacao').forEach((post, index) => {
    const likeBtn = post.querySelector('.like-img-btn');
    const dislikeBtn = post.querySelector('.dislike-img-btn');
    const likeCount = post.querySelector('.like-img-count');
    const dislikeCount = post.querySelector('.dislike-img-count');
    const commentInput = post.querySelector('.comentario-input');
    const commentBtn = post.querySelector('.comentar-btn');
    const commentList = post.querySelector('.lista-comentarios');

    // Carregar dados do localStorage
    let savedLikes = parseInt(localStorage.getItem(`post${index}_likes`)) || 0;
    let savedDislikes = parseInt(localStorage.getItem(`post${index}_dislikes`)) || 0;
    let savedComments = JSON.parse(localStorage.getItem(`post${index}_comments`)) || [];

    likeCount.textContent = savedLikes;
    dislikeCount.textContent = savedDislikes;

    savedComments.forEach(c => {
      const li = document.createElement('li');
      li.textContent = c;
      commentList.appendChild(li);
    });

    likeBtn.addEventListener('click', () => {
      savedLikes++;
      likeCount.textContent = savedLikes;
      localStorage.setItem(`post${index}_likes`, savedLikes);
      animateBtn(likeBtn);
    });

    dislikeBtn.addEventListener('click', () => {
      savedDislikes++;
      dislikeCount.textContent = savedDislikes;
      localStorage.setItem(`post${index}_dislikes`, savedDislikes);
      animateBtn(dislikeBtn);
    });

    commentBtn.addEventListener('click', () => {
      const comment = commentInput.value.trim();
      if (comment === '') {
        alert('Comentário vazio!');
        return;
      }
      const li = document.createElement('li');
      li.textContent = comment;
      commentList.appendChild(li);

      savedComments.push(comment);
      localStorage.setItem(`post${index}_comments`, JSON.stringify(savedComments));

      commentInput.value = '';
    });
  });

  // Dark mode toggle
  const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
  const currentTheme = localStorage.getItem('theme') || 'light';

  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleDarkModeBtn.textContent = '☀️ Modo Claro';
  }

  toggleDarkModeBtn.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      toggleDarkModeBtn.textContent = '🌙 Modo Escuro';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      toggleDarkModeBtn.textContent = '☀️ Modo Claro';
    }
  });

  // Fake login form (exemplo básico)
  const loginForm = document.querySelector('.form-login');
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const password = loginForm.querySelector('input[type="password"]').value.trim();

    if (!email || !password) {
      alert('Preencha todos os campos!');
      return;
    }

    // Só pra demo
    alert(`Login realizado com sucesso!\nEmail: ${email}`);
    loginForm.reset();
  });
};
