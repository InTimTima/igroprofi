const Auth = {
  FREE_GAMES: ['color'],
  USERS_KEY: 'igro-users-v1',
  SESSION_KEY: 'igro-session-v1',
  MONTH_PRICE: 250,
  FOREVER_PRICE: 2500,
  MONTH_MS: 30 * 24 * 60 * 60 * 1000,

  getUsers: function () {
    try {
      return JSON.parse(localStorage.getItem(this.USERS_KEY) || '{}');
    } catch (err) {
      return {};
    }
  },

  saveUsers: function (users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  },

  getSessionLogin: function () {
    return localStorage.getItem(this.SESSION_KEY) || '';
  },

  setSession: function (login) {
    if (login) localStorage.setItem(this.SESSION_KEY, login);
    else localStorage.removeItem(this.SESSION_KEY);
  },

  getCurrentUser: function () {
    const login = this.getSessionLogin();
    if (!login) return null;
    const users = this.getUsers();
    const user = users[login];
    if (!user) {
      this.setSession('');
      return null;
    }
    return Object.assign({ login: login }, user);
  },

  isLoggedIn: function () {
    return !!this.getCurrentUser();
  },

  hasSubscription: function () {
    const user = this.getCurrentUser();
    if (!user || !user.subscription) return false;
    if (user.subscription === 'forever') return true;
    if (user.subscription === 'month') {
      if (!user.expiresAt || user.expiresAt <= Date.now()) {
        const users = this.getUsers();
        if (users[user.login]) {
          users[user.login].subscription = null;
          users[user.login].expiresAt = null;
          this.saveUsers(users);
        }
        return false;
      }
      return true;
    }
    return false;
  },

  canPlay: function (gameId) {
    if (this.FREE_GAMES.indexOf(gameId) !== -1) return true;
    return this.hasSubscription();
  },

  register: function (login, password) {
    login = String(login || '').trim().toLowerCase();
    password = String(password || '');
    if (login.length < 3) return { ok: false, error: 'loginShort' };
    if (password.length < 4) return { ok: false, error: 'passwordShort' };
    const users = this.getUsers();
    if (users[login]) return { ok: false, error: 'loginTaken' };
    users[login] = {
      password: password,
      subscription: null,
      expiresAt: null,
      createdAt: Date.now(),
    };
    this.saveUsers(users);
    this.setSession(login);
    return { ok: true };
  },

  login: function (login, password) {
    login = String(login || '').trim().toLowerCase();
    password = String(password || '');
    const users = this.getUsers();
    const user = users[login];
    if (!user || user.password !== password) return { ok: false, error: 'badCredentials' };
    this.setSession(login);
    return { ok: true };
  },

  logout: function () {
    this.setSession('');
  },

  buyMonth: function () {
    const user = this.getCurrentUser();
    if (!user) return { ok: false, error: 'needAuth' };
    const users = this.getUsers();
    const now = Date.now();
    const base = user.subscription === 'month' && user.expiresAt > now ? user.expiresAt : now;
    users[user.login].subscription = 'month';
    users[user.login].expiresAt = base + this.MONTH_MS;
    this.saveUsers(users);
    return { ok: true };
  },

  buyForever: function () {
    const user = this.getCurrentUser();
    if (!user) return { ok: false, error: 'needAuth' };
    const users = this.getUsers();
    users[user.login].subscription = 'forever';
    users[user.login].expiresAt = null;
    this.saveUsers(users);
    return { ok: true };
  },

  clearSubscription: function () {
    const user = this.getCurrentUser();
    if (!user) return { ok: false, error: 'needAuth' };
    const users = this.getUsers();
    users[user.login].subscription = null;
    users[user.login].expiresAt = null;
    this.saveUsers(users);
    return { ok: true };
  },

  subscriptionLabel: function () {
    const user = this.getCurrentUser();
    if (!user) return at('subNone');
    if (user.subscription === 'forever') return at('subForever');
    if (user.subscription === 'month' && user.expiresAt > Date.now()) {
      const until = new Date(user.expiresAt).toLocaleDateString(
        typeof getLang === 'function' && getLang() === 'en' ? 'en-GB' : 'ru-RU'
      );
      return at('subMonthUntil') + ' ' + until;
    }
    return at('subNone');
  },
};

const AUTH_I18N = {
  ru: {
    loginRegister: 'Войти / Регистрация',
    profile: 'Профиль',
    logout: 'Выйти',
    loginTitle: 'Вход',
    registerTitle: 'Регистрация',
    login: 'Логин',
    password: 'Пароль',
    doLogin: 'Войти',
    doRegister: 'Зарегистрироваться',
    switchToRegister: 'Создать аккаунт',
    switchToLogin: 'Уже есть аккаунт',
    yourLogin: 'Логин',
    yourSub: 'Подписка',
    subNone: 'Нет подписки',
    subForever: 'Навсегда',
    subMonthUntil: 'Месяц до',
    buyMonth: 'Месяц — 250 ₽',
    buyForever: 'Навсегда — 2500 ₽',
    renewMonth: 'Продлить месяц — 250 ₽',
    clearSub: 'Тест: сбросить подписку',
    lockedHint: 'Доступно по подписке',
    lockedToast: 'Этот интерактив доступен только с подпиской',
    loginShort: 'Логин от 3 символов',
    passwordShort: 'Пароль от 4 символов',
    loginTaken: 'Такой логин уже занят',
    badCredentials: 'Неверный логин или пароль',
    needAuth: 'Сначала войдите в аккаунт',
    guest: 'Гость',
    close: 'Закрыть',
    authDemoNote: 'Пока это демо-фронтенд: оплата имитируется, данные хранятся в браузере.',
  },
  en: {
    loginRegister: 'Log in / Sign up',
    profile: 'Profile',
    logout: 'Log out',
    loginTitle: 'Log in',
    registerTitle: 'Sign up',
    login: 'Login',
    password: 'Password',
    doLogin: 'Log in',
    doRegister: 'Sign up',
    switchToRegister: 'Create an account',
    switchToLogin: 'I already have an account',
    yourLogin: 'Login',
    yourSub: 'Subscription',
    subNone: 'No subscription',
    subForever: 'Forever',
    subMonthUntil: 'Month until',
    buyMonth: '1 month — 250 ₽',
    buyForever: 'Forever — 2500 ₽',
    renewMonth: 'Renew month — 250 ₽',
    clearSub: 'Test: clear subscription',
    lockedHint: 'Subscription required',
    lockedToast: 'This activity is available with a subscription only',
    loginShort: 'Login must be at least 3 characters',
    passwordShort: 'Password must be at least 4 characters',
    loginTaken: 'This login is already taken',
    badCredentials: 'Wrong login or password',
    needAuth: 'Please log in first',
    guest: 'Guest',
    close: 'Close',
    authDemoNote: 'Frontend demo for now: payment is simulated and data is stored in the browser.',
  },
};

let authMode = 'login';

function at(key) {
  const lang = typeof getLang === 'function' ? getLang() : 'ru';
  const pack = AUTH_I18N[lang] || AUTH_I18N.ru;
  return pack[key] || AUTH_I18N.ru[key] || key;
}

function showEl(el) {
  if (!el) return;
  el.hidden = false;
  el.removeAttribute('hidden');
  el.classList.add('is-open');
}

function hideEl(el) {
  if (!el) return;
  el.hidden = true;
  el.setAttribute('hidden', '');
  el.classList.remove('is-open');
}

function openAuthModal(nextMode) {
  ensureAuthModals();
  authMode = nextMode || 'login';
  fillAuthTexts();
  const err = document.getElementById('auth-error');
  if (err) {
    err.hidden = true;
    err.textContent = '';
  }
  const login = document.getElementById('auth-login');
  const password = document.getElementById('auth-password');
  if (login) login.value = '';
  if (password) password.value = '';
  hideEl(document.getElementById('profile-drawer'));
  showEl(document.getElementById('auth-modal'));
  if (login) setTimeout(function () { login.focus(); }, 50);
}

function closeAuthModal() {
  hideEl(document.getElementById('auth-modal'));
}

function openProfileDrawer() {
  ensureAuthModals();
  if (!Auth.isLoggedIn()) {
    openAuthModal('login');
    return;
  }
  fillAuthTexts();
  hideEl(document.getElementById('auth-modal'));
  showEl(document.getElementById('profile-drawer'));
}

function closeProfileDrawer() {
  hideEl(document.getElementById('profile-drawer'));
}

function fillAuthTexts() {
  const setText = function (id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };
  setText('auth-modal-close', at('close'));
  setText('auth-demo-note', at('authDemoNote'));
  setText('auth-login-label', at('login'));
  setText('auth-password-label', at('password'));
  setText('auth-modal-title', authMode === 'login' ? at('loginTitle') : at('registerTitle'));
  setText('auth-submit', authMode === 'login' ? at('doLogin') : at('doRegister'));
  setText('auth-switch', authMode === 'login' ? at('switchToRegister') : at('switchToLogin'));
  setText('profile-close', at('close'));
  setText('profile-title', at('profile'));
  setText('profile-login-label', at('yourLogin'));
  setText('profile-sub-label', at('yourSub'));
  setText('profile-demo-note', at('authDemoNote'));
  setText('profile-logout', at('logout'));
  setText('clear-sub', at('clearSub'));
  refreshHomeAuthUI();
}

window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.openProfileDrawer = openProfileDrawer;
window.closeProfileDrawer = closeProfileDrawer;
window.refreshAuthTexts = fillAuthTexts;

function mountHomeAuth() {
  if (!document.body.classList.contains('home')) return;

  let bar = document.getElementById('home-top-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'home-top-bar';
    bar.className = 'home-top-bar';
    const lang = document.getElementById('lang-btn');
    if (lang && lang.parentNode) {
      lang.parentNode.insertBefore(bar, lang);
      bar.appendChild(lang);
    } else {
      document.body.appendChild(bar);
    }
  }

  function bindAuthButton(btn) {
    btn.onclick = function () {
      if (Auth.isLoggedIn()) openProfileDrawer();
      else openAuthModal('login');
    };
  }

  let authBtn = document.getElementById('auth-entry-btn');
  if (!authBtn) {
    authBtn = document.createElement('button');
    authBtn.type = 'button';
    authBtn.id = 'auth-entry-btn';
    authBtn.className = 'auth-entry-btn';
    bar.insertBefore(authBtn, bar.firstChild);
  }
  bindAuthButton(authBtn);

  const leftoverHeaderAuth = document.getElementById('auth-entry-btn-header');
  if (leftoverHeaderAuth) leftoverHeaderAuth.remove();

  ensureAuthModals();
  refreshHomeAuthUI();

  document.querySelectorAll('.card[data-game]').forEach(function (card) {
    if (card.dataset.authBound) return;
    card.dataset.authBound = '1';
    const gameId = card.getAttribute('data-game');
    card.addEventListener('click', function (event) {
      if (Auth.canPlay(gameId)) return;
      event.preventDefault();
      showLockedToast();
      if (!Auth.isLoggedIn()) openAuthModal('login');
      else openProfileDrawer();
    });
  });

  const params = new URLSearchParams(window.location.search);
  if (params.get('locked')) {
    showLockedToast();
    history.replaceState({}, '', window.location.pathname);
  }
}

function refreshHomeAuthUI() {
  const label = Auth.isLoggedIn() ? at('profile') : at('loginRegister');
  const authBtn = document.getElementById('auth-entry-btn');
  if (authBtn) authBtn.textContent = label;

  document.querySelectorAll('.card[data-game]').forEach(function (card) {
    const gameId = card.getAttribute('data-game');
    const locked = !Auth.canPlay(gameId);
    card.classList.toggle('card--locked', locked);
    let lock = card.querySelector('.card-lock');
    if (locked) {
      if (!lock) {
        lock = document.createElement('div');
        lock.className = 'card-lock';
        lock.innerHTML =
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17 8h-1V6a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm-7-2a2 2 0 1 1 4 0v2h-4V6zm3 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>' +
          '<span>' + at('lockedHint') + '</span>';
        const preview = card.querySelector('.card__preview') || card;
        preview.appendChild(lock);
      } else {
        const span = lock.querySelector('span');
        if (span) span.textContent = at('lockedHint');
      }
    } else if (lock) {
      lock.remove();
    }
  });

  const profileLogin = document.getElementById('profile-login');
  const profileSub = document.getElementById('profile-sub');
  if (profileLogin) {
    const user = Auth.getCurrentUser();
    profileLogin.textContent = user ? user.login : at('guest');
  }
  if (profileSub) profileSub.textContent = Auth.subscriptionLabel();

  const buyMonth = document.getElementById('buy-month');
  if (buyMonth) {
    const user = Auth.getCurrentUser();
    buyMonth.textContent =
      Auth.hasSubscription() && user && user.subscription === 'month' ? at('renewMonth') : at('buyMonth');
  }
  const buyForever = document.getElementById('buy-forever');
  if (buyForever) buyForever.textContent = at('buyForever');
  const clearSub = document.getElementById('clear-sub');
  if (clearSub) clearSub.textContent = at('clearSub');
}

function ensureAuthModals() {
  let modal = document.getElementById('auth-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'auth-modal';
    modal.className = 'auth-modal';
    modal.hidden = true;
    modal.innerHTML =
      '<div class="auth-modal__card" role="dialog" aria-modal="true">' +
      '<button type="button" class="auth-modal__close" id="auth-modal-close"></button>' +
      '<h2 id="auth-modal-title"></h2>' +
      '<p class="auth-modal__note" id="auth-demo-note"></p>' +
      '<label class="auth-field"><span id="auth-login-label"></span><input id="auth-login" autocomplete="username"></label>' +
      '<label class="auth-field"><span id="auth-password-label"></span><input id="auth-password" type="password" autocomplete="current-password"></label>' +
      '<p class="auth-error" id="auth-error" hidden></p>' +
      '<button type="button" class="auth-primary" id="auth-submit"></button>' +
      '<button type="button" class="auth-link" id="auth-switch"></button>' +
      '</div>';
    document.body.appendChild(modal);
  }

  let drawer = document.getElementById('profile-drawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'profile-drawer';
    drawer.className = 'profile-drawer';
    drawer.hidden = true;
    drawer.innerHTML =
      '<div class="profile-drawer__panel">' +
      '<button type="button" class="auth-modal__close" id="profile-close"></button>' +
      '<h2 id="profile-title"></h2>' +
      '<div class="profile-row"><span id="profile-login-label"></span><strong id="profile-login"></strong></div>' +
      '<div class="profile-row"><span id="profile-sub-label"></span><strong id="profile-sub"></strong></div>' +
      '<p class="auth-modal__note" id="profile-demo-note"></p>' +
      '<button type="button" class="auth-primary" id="buy-month"></button>' +
      '<button type="button" class="auth-primary auth-primary--alt" id="buy-forever"></button>' +
      '<button type="button" class="auth-link auth-link--danger" id="clear-sub"></button>' +
      '<button type="button" class="auth-link" id="profile-logout"></button>' +
      '</div>';
    document.body.appendChild(drawer);
  }

  if (!document.getElementById('locked-toast')) {
    const toast = document.createElement('div');
    toast.id = 'locked-toast';
    toast.className = 'locked-toast';
    toast.hidden = true;
    document.body.appendChild(toast);
  }

  if (modal.dataset.bound === '1') {
    fillAuthTexts();
    return;
  }
  modal.dataset.bound = '1';

  document.getElementById('auth-modal-close').onclick = closeAuthModal;
  modal.addEventListener('click', function (event) {
    if (event.target === modal) closeAuthModal();
  });
  document.getElementById('auth-switch').onclick = function () {
    authMode = authMode === 'login' ? 'register' : 'login';
    const err = document.getElementById('auth-error');
    if (err) {
      err.hidden = true;
      err.textContent = '';
    }
    fillAuthTexts();
  };
  document.getElementById('auth-submit').onclick = function () {
    const login = document.getElementById('auth-login').value;
    const password = document.getElementById('auth-password').value;
    const result = authMode === 'login' ? Auth.login(login, password) : Auth.register(login, password);
    if (!result.ok) {
      const err = document.getElementById('auth-error');
      err.textContent = at(result.error);
      err.hidden = false;
      return;
    }
    closeAuthModal();
    refreshHomeAuthUI();
    openProfileDrawer();
  };
  document.getElementById('auth-password').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') document.getElementById('auth-submit').click();
  });

  document.getElementById('profile-close').onclick = closeProfileDrawer;
  drawer.addEventListener('click', function (event) {
    if (event.target === drawer) closeProfileDrawer();
  });
  document.getElementById('profile-logout').onclick = function () {
    Auth.logout();
    closeProfileDrawer();
    refreshHomeAuthUI();
  };
  document.getElementById('buy-month').onclick = function () {
    const result = Auth.buyMonth();
    if (!result.ok) {
      closeProfileDrawer();
      openAuthModal('login');
      return;
    }
    refreshHomeAuthUI();
  };
  document.getElementById('buy-forever').onclick = function () {
    const result = Auth.buyForever();
    if (!result.ok) {
      closeProfileDrawer();
      openAuthModal('login');
      return;
    }
    refreshHomeAuthUI();
  };
  document.getElementById('clear-sub').onclick = function () {
    Auth.clearSubscription();
    refreshHomeAuthUI();
  };

  fillAuthTexts();
}

function showLockedToast() {
  const toast = document.getElementById('locked-toast');
  if (!toast) return;
  toast.textContent = at('lockedToast');
  showEl(toast);
  clearTimeout(showLockedToast._timer);
  showLockedToast._timer = setTimeout(function () {
    hideEl(toast);
  }, 2800);
}
