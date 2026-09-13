// Gerencia a "sessão" do usuário usando localStorage
// (a API não retorna token, então guardamos o objeto user que ela devolve no login)

const SESSION_KEY = 'musicbox_user';

function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// Desenha a navbar em todas as páginas, mostrando o usuário logado ou os links de login/cadastro
function renderNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const user = getSession();

  nav.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="brand">🎵 Music Review</a>
      <div class="nav-links">
        ${user
          ? `<span class="nav-user">Olá, ${user.name}</span>
             <button id="logoutBtn" class="btn-link">Sair</button>`
          : `<a href="login.html">Entrar</a>
             <a href="register.html">Criar conta</a>`
        }
      </div>
    </div>
  `;

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      clearSession();
      window.location.href = 'login.html';
    });
  }
}

document.addEventListener('DOMContentLoaded', renderNavbar);
