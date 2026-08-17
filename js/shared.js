const IGRO_COLORS = {
  red: '#E53935',
  yellow: '#FDD835',
  green: '#43A047',
  blue: '#1E88E5',
};

const COLOR_KEYS = Object.keys(IGRO_COLORS);
const IGRO_BLACK = '#333333';
const CARPET = ['#E53935', '#FDD835', '#43A047', '#1E88E5'];

const SPEED_STEPS = [
  { label: '1', ms: 5000 },
  { label: '2', ms: 3500 },
  { label: '3', ms: 2500 },
  { label: '4', ms: 1500 },
  { label: '5', ms: 800 },
];

const I18N = {
  ru: {
    title: 'Интерактивные игры от igroprofi',
    titleLead: 'Интерактивные игры от',
    subtitle: 'Выберите интерактив для занятий и развития',
    open: 'Открыть →',
    back: '← Назад',
    methodica: 'Методичка',
    methodicaTitle: 'Методичка',
    methodicaClose: 'Закрыть',
    methodicaStub: 'Здесь будет описание, как использовать этот интерактив: идеи занятий, подсказки педагогу и примеры. Пока это заглушка — позже заменим на настоящий текст, фото и видео.',
    speed: 'Скорость',
    start: 'Старт',
    stop: 'Стоп',
    super: 'Супер!',
    cheer: 'ура! ты молодец!',
    lang: 'EN',
    color: 'Цвет',
    colorDesc: 'Экран заливается одним из четырёх цветов. Фон меняется автоматически с настраиваемой скоростью.',
    hands: 'Ладошки',
    handsDesc: 'На белом фоне появляются левые и правые ладошки разных цветов. Можно выбрать одну или две ладошки.',
    arrows: 'Стрелочки',
    arrowsDesc: 'Стрелка случайного направления и цвета появляется на экране. Есть режим двух стрелочек и только вправо-влево.',
    halves: 'Половинки',
    halvesDesc: 'Экран разделён пополам — каждая половина меняет цвет независимо друг от друга.',
    quarters: 'Четвертинки',
    quartersDesc: 'Экран разделён на четыре части, и каждая четверть меняет цвет.',
    dice: 'Кубики',
    diceDesc: 'На белом фоне появляется кубик с точками от 1 до 6 — каждый раз нового цвета.',
    numbers: 'Цифры',
    numbersDesc: 'Цвет фона меняется, а поверх него появляются цифры от 1 до 5.',
    carpetNumbers: 'Цифры на ковре',
    carpetNumbersDesc: 'На стандартном ковре по очереди появляются цифры от 1 до 10 на случайных четвертях.',
    heels: 'Пятки',
    heelsDesc: 'Как «Ладошки», только с пятками: цвет, сторона и места меняются при каждой смене.',
    limbs: 'Руки-ноги',
    limbsDesc: 'На стандартном ковре появляются две руки, две ноги или рука и нога — без двух одинаковых сторон.',
    staticArrows: 'Статичные стрелочки',
    staticArrowsDesc: 'Две стрелочки: левая всегда влево, правая всегда вправо. Меняются только цвета.',
    oneHand: '1 ладошка',
    twoHands: '2 ладошки',
    oneHeel: '1 пятка',
    twoHeels: '2 пятки',
    oneArrow: '1 стрелочка',
    twoArrows: '2 стрелочки',
    leftRight: 'вправо-влево',
    fourSides: '4 стороны',
    colorsRepeat: 'цвета могут повторяться',
    colorsUnique: 'цвета не могут повторяться',
    vertical: 'вертикально',
    horizontal: 'горизонтально',
    colorsSame: 'цвета могут быть одинаковыми',
    colorsDifferent: 'цвета не могут быть одинаковыми',
    plansTitle: 'Подписка igroprofi',
    plansSubtitle: 'Полный доступ ко всем интерактивам для занятий и развития',
    planMonth: '1 месяц',
    planForever: 'Навсегда',
    featAll: 'Все интерактивы без ограничений',
    featNew: 'Новые игры по мере выхода',
    featUpdates: 'Обновления и новые режимы',
    featAuto: 'Автопродление не требуется',
    featLifetime: 'Одноразовый платёж навсегда',
    buyPlan: 'Оформить подписку',
    rub: '₽',
    plansNote: 'Оплата через сервис ЮKassa: банковские карты, СБП, электронные кошельки. Деньги вернём, если что-то не подойдёт — условия в Пользовательском соглашении.',
    offerLink: 'Пользовательское соглашение',
    privacyLink: 'Политика конфиденциальности',
  },
  en: {
    title: 'Interactive games by igroprofi',
    titleLead: 'Interactive games by',
    subtitle: 'Choose an activity for lessons and development',
    open: 'Open →',
    back: '← Back',
    methodica: 'Guide',
    methodicaTitle: 'Guide',
    methodicaClose: 'Close',
    methodicaStub: 'This is where we will explain how to use this activity: teaching ideas, tips and examples. This is a placeholder for now and will later be replaced with real text, photos and video.',
    speed: 'Speed',
    start: 'Start',
    stop: 'Stop',
    super: 'Super!',
    cheer: 'yay! you did great!',
    lang: 'RU',
    color: 'Color',
    colorDesc: 'The screen fills with one of four colors and changes automatically at a chosen speed.',
    hands: 'Hands',
    handsDesc: 'Left and right hands of different colors appear on a white background. Choose one or two hands.',
    arrows: 'Arrows',
    arrowsDesc: 'An arrow of a random direction and color appears on screen. There is a two-arrow mode and a left-right only mode.',
    halves: 'Halves',
    halvesDesc: 'The screen is split in two — each half changes color independently.',
    quarters: 'Quarters',
    quartersDesc: 'The screen is split into four parts, and each quarter changes color.',
    dice: 'Dice',
    diceDesc: 'A die with 1 to 6 dots appears on a white background, in one of four colors.',
    numbers: 'Numbers',
    numbersDesc: 'The background color changes while numbers from 1 to 5 appear on top.',
    carpetNumbers: 'Numbers on the carpet',
    carpetNumbersDesc: 'On the standard carpet, numbers from 1 to 10 appear one by one in random quarters.',
    heels: 'Heels',
    heelsDesc: 'Like Hands, but with heels: color, side and places change each time.',
    limbs: 'Hands and feet',
    limbsDesc: 'On the standard carpet, two hands, two feet, or one of each appear — never two of the same side.',
    staticArrows: 'Static arrows',
    staticArrowsDesc: 'Two arrows: the left always points left, the right always points right. Only the colors change.',
    oneHand: '1 hand',
    twoHands: '2 hands',
    oneHeel: '1 heel',
    twoHeels: '2 heels',
    oneArrow: '1 arrow',
    twoArrows: '2 arrows',
    leftRight: 'left-right',
    fourSides: '4 sides',
    colorsRepeat: 'colors may repeat',
    colorsUnique: 'colors cannot repeat',
    vertical: 'vertical',
    horizontal: 'horizontal',
    colorsSame: 'colors may match',
    colorsDifferent: 'colors cannot match',
    plansTitle: 'igroprofi subscription',
    plansSubtitle: 'Full access to all activities for lessons and development',
    planMonth: '1 month',
    planForever: 'Forever',
    featAll: 'All activities without limits',
    featNew: 'New games as they come out',
    featUpdates: 'Updates and new modes',
    featAuto: 'No auto-renewal required',
    featLifetime: 'One-time payment forever',
    buyPlan: 'Get the subscription',
    rub: '₽',
    plansNote: 'Paid via YooKassa: bank cards, SBP, e-wallets. Money-back if something goes wrong — see the Terms of Service.',
    offerLink: 'Terms of Service',
    privacyLink: 'Privacy Policy',
  },
};

function getLang() {
  return localStorage.getItem('igro-lang') === 'en' ? 'en' : 'ru';
}

function setLang(lang) {
  localStorage.setItem('igro-lang', lang);
}

function t(key) {
  const pack = I18N[getLang()] || I18N.ru;
  return pack[key] || I18N.ru[key] || key;
}

function applyI18n(root) {
  (root || document).querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  const header = document.querySelector('[data-title-brand]');
  if (header) {
    header.innerHTML = t('titleLead') + ' <span>igroprofi</span>';
  }
  document.documentElement.lang = getLang();
  const titleEl = document.querySelector('title');
  if (titleEl && document.body && document.body.classList.contains('home')) {
    document.title = t('title');
  }
}

const Interactive = {
  active: false,
  token: 0,
  intervalId: null,
  countdownId: null,
  celebrateId: null,
  countingDown: false,
  tick: null,
  reset: null,
  speedMs: SPEED_STEPS[2].ms,
  audio: null,
  lastSoundAt: 0,
  playBtn: null,
};

function randomColorKey() {
  return COLOR_KEYS[Math.floor(Math.random() * COLOR_KEYS.length)];
}

function randomDirection(pool) {
  const list = pool && pool.length ? pool : ['up', 'down', 'left', 'right'];
  return randomItem(list);
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}

function pickColors(count, unique) {
  if (!unique) {
    return Array.from({ length: count }, randomColorKey);
  }
  const keys = shuffle(COLOR_KEYS.slice());
  const out = [];
  for (let i = 0; i < count; i += 1) {
    out.push(keys[i % keys.length]);
  }
  return out;
}

function isBusy() {
  return Interactive.active || Interactive.countingDown;
}

function getAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!Interactive.audio) Interactive.audio = new AudioContext();
  return Interactive.audio;
}

function tone(ctx, freq, start, dur, type, vol) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type || 'sine';
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(vol, start + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

function playBell() {
  if (!Interactive.active || document.hidden) return;
  const now = performance.now();
  if (now - Interactive.lastSoundAt < 180) return;
  Interactive.lastSoundAt = now;
  try {
    const ctx = getAudio();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const start = ctx.currentTime;
    tone(ctx, 1568, start, 0.85, 'sine', 0.05);
    tone(ctx, 2093, start, 1.05, 'sine', 0.028);
    tone(ctx, 2637, start + 0.04, 0.7, 'triangle', 0.016);
    tone(ctx, 3136, start + 0.08, 0.45, 'sine', 0.01);
  } catch (err) {
    /* ignore */
  }
}

function playCheer() {
  try {
    const ctx = getAudio();
    if (ctx) {
      if (ctx.state === 'suspended') ctx.resume();
      const start = ctx.currentTime;
      [523, 659, 784, 1046].forEach((freq, i) => {
        tone(ctx, freq, start + i * 0.06, 0.5, 'triangle', 0.045);
      });
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(t('cheer'));
      utter.lang = getLang() === 'en' ? 'en-US' : 'ru-RU';
      utter.pitch = 1.35;
      utter.rate = 0.95;
      utter.volume = 1;
      window.speechSynthesis.speak(utter);
    }
  } catch (err) {
    /* ignore */
  }
}

function triggerChangeAnimation(element, silent) {
  if (!silent) playBell();
  if (!element) return;
  element.classList.remove('changing');
  void element.offsetWidth;
  element.classList.add('changing');
}

function clearLoop() {
  Interactive.token += 1;
  Interactive.countingDown = false;
  if (Interactive.intervalId !== null) {
    clearInterval(Interactive.intervalId);
    Interactive.intervalId = null;
  }
  if (Interactive.countdownId !== null) {
    clearTimeout(Interactive.countdownId);
    Interactive.countdownId = null;
  }
  if (Interactive.celebrateId !== null) {
    clearTimeout(Interactive.celebrateId);
    Interactive.celebrateId = null;
  }
}

function runLoop(token) {
  if (Interactive.intervalId !== null) {
    clearInterval(Interactive.intervalId);
    Interactive.intervalId = null;
  }
  Interactive.intervalId = setInterval(() => {
    if (token !== Interactive.token) return;
    if (!Interactive.active || document.hidden) return;
    if (typeof Interactive.tick === 'function') Interactive.tick(false);
  }, Interactive.speedMs);
}

function showIdle() {
  const idle = document.getElementById('idle-layer');
  const celebrate = document.getElementById('celebrate-layer');
  const count = document.getElementById('countdown');
  const mosya = document.getElementById('mosya');
  if (idle) idle.hidden = false;
  if (celebrate) celebrate.hidden = true;
  if (count) count.hidden = true;
  if (mosya) mosya.hidden = false;
  if (typeof Interactive.reset === 'function') Interactive.reset();
}

function updatePlayBtn() {
  if (!Interactive.playBtn) return;
  const busy = isBusy();
  Interactive.playBtn.textContent = busy ? t('stop') : t('start');
  Interactive.playBtn.classList.toggle('play-btn--stop', busy);
  Interactive.playBtn.setAttribute('aria-pressed', busy ? 'true' : 'false');
}

function popCountdown(el, value) {
  el.textContent = String(value);
  el.classList.remove('countdown--pop');
  void el.offsetWidth;
  el.classList.add('countdown--pop');
}

function beginCountdown() {
  const token = Interactive.token;
  const idle = document.getElementById('idle-layer');
  const mosya = document.getElementById('mosya');
  const count = document.getElementById('countdown');
  const celebrate = document.getElementById('celebrate-layer');
  Interactive.countingDown = true;
  if (celebrate) celebrate.hidden = true;
  if (idle) idle.hidden = false;
  if (mosya) mosya.hidden = true;
  if (count) {
    count.hidden = false;
    popCountdown(count, 3);
  }
  updatePlayBtn();

  let n = 3;
  function step() {
    if (token !== Interactive.token) return;
    n -= 1;
    if (n >= 1) {
      if (count) popCountdown(count, n);
      Interactive.countdownId = setTimeout(step, 720);
      return;
    }
    Interactive.countingDown = false;
    Interactive.countdownId = null;
    if (idle) idle.hidden = true;
    if (count) count.hidden = true;
    if (mosya) mosya.hidden = false;
    Interactive.active = true;
    if (typeof Interactive.tick === 'function') Interactive.tick(false);
    runLoop(token);
    updatePlayBtn();
  }
  Interactive.countdownId = setTimeout(step, 720);
}

function celebrateThenIdle() {
  const token = Interactive.token;
  const idle = document.getElementById('idle-layer');
  const celebrate = document.getElementById('celebrate-layer');
  const count = document.getElementById('countdown');
  if (count) count.hidden = true;
  if (idle) idle.hidden = true;
  if (celebrate) {
    celebrate.hidden = false;
    const label = celebrate.querySelector('.super-text');
    if (label) label.textContent = t('super');
  }
  playCheer();
  Interactive.celebrateId = setTimeout(() => {
    if (token !== Interactive.token) return;
    showIdle();
  }, 2400);
}

function userStart() {
  const ctx = getAudio();
  if (ctx && ctx.state === 'suspended') ctx.resume();
  clearLoop();
  Interactive.active = false;
  if (typeof Interactive.reset === 'function') Interactive.reset();
  beginCountdown();
}

function userStop() {
  const wasRunning = Interactive.active;
  clearLoop();
  Interactive.active = false;
  updatePlayBtn();
  if (wasRunning) celebrateThenIdle();
  else showIdle();
}

function hardStop() {
  Interactive.active = false;
  Interactive.countingDown = false;
  clearLoop();
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  if (Interactive.audio && Interactive.audio.state === 'running') {
    Interactive.audio.suspend().catch(() => {});
  }
}

function createSpeedControl(container, initialIndex) {
  const index = initialIndex == null ? 2 : initialIndex;
  Interactive.speedMs = SPEED_STEPS[index].ms;

  const wrapper = document.createElement('div');
  wrapper.className = 'control-group';

  const label = document.createElement('label');
  label.className = 'control-label';
  label.textContent = t('speed');
  label.setAttribute('for', 'speed-slider');

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.id = 'speed-slider';
  slider.min = '0';
  slider.max = String(SPEED_STEPS.length - 1);
  slider.step = '1';
  slider.value = String(index);

  const ticks = document.createElement('div');
  ticks.className = 'speed-ticks';
  SPEED_STEPS.forEach((step) => {
    const tick = document.createElement('span');
    tick.textContent = step.label;
    ticks.appendChild(tick);
  });

  slider.addEventListener('input', () => {
    Interactive.speedMs = SPEED_STEPS[Number(slider.value)].ms;
    if (Interactive.active) runLoop(Interactive.token);
  });

  wrapper.append(label, slider, ticks);
  container.appendChild(wrapper);
}

function createPairSwitch(container, options) {
  const wrap = document.createElement('div');
  wrap.className = 'pair-switch';
  wrap.innerHTML =
    '<span class="pair-switch__label">' + t(options.leftKey) + '</span>' +
    '<label class="pair-switch__toggle">' +
    '<input type="checkbox"' + (options.checked ? ' checked' : '') + '>' +
    '<span class="pair-switch__track"></span>' +
    '</label>' +
    '<span class="pair-switch__label">' + t(options.rightKey) + '</span>';
  const input = wrap.querySelector('input');
  input.addEventListener('change', () => {
    options.onChange(input.checked);
  });
  wrap.querySelectorAll('.pair-switch__label').forEach((label, index) => {
    label.addEventListener('click', () => {
      const wantChecked = index === 1;
      if (input.checked !== wantChecked) {
        input.checked = wantChecked;
        input.dispatchEvent(new Event('change'));
      }
    });
  });
  container.appendChild(wrap);
  return input;
}

const assetCache = new Map();

function loadAsset(url) {
  if (!assetCache.has(url)) {
    assetCache.set(
      url,
      fetch(url).then((response) => {
        if (!response.ok) throw new Error('Не удалось загрузить ' + url);
        return response.text();
      })
    );
  }
  return assetCache.get(url);
}

function padViewBox(svg, ratio) {
  if (svg.dataset.padded === '1') return;
  const raw = svg.getAttribute('viewBox');
  if (!raw) return;
  const parts = raw.trim().replace(/,/g, ' ').split(/\s+/).map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return;
  const pad = Math.max(parts[2], parts[3]) * (ratio || 0.12);
  svg.setAttribute(
    'viewBox',
    (parts[0] - pad) + ' ' + (parts[1] - pad) + ' ' + (parts[2] + pad * 2) + ' ' + (parts[3] + pad * 2)
  );
  svg.dataset.padded = '1';
}

function prepareSvg(container, padRatio) {
  const svg = container.querySelector('svg');
  if (!svg) return null;
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.setAttribute('overflow', 'visible');
  svg.removeAttribute('width');
  svg.removeAttribute('height');
  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.overflow = 'visible';
  svg.style.display = 'block';
  svg.style.maxWidth = '100%';
  svg.style.maxHeight = '100%';
  if (padRatio !== 0) padViewBox(svg, padRatio == null ? 0.08 : padRatio);
  return svg;
}

function colorSvg(container, color) {
  container.querySelectorAll('style').forEach((style) => {
    style.textContent = style.textContent.replace(/fill:\s*#?[a-z0-9]+/gi, 'fill:' + color);
  });
  container.querySelectorAll('path, rect, polygon, ellipse').forEach((node) => {
    const fill = (node.getAttribute('fill') || '').toLowerCase();
    if (fill === 'none') return;
    node.setAttribute('fill', color);
    node.style.fill = color;
  });
}

function paintAsset(container, url, color, options) {
  options = options || {};
  if (container.dataset.assetUrl === url && container.querySelector('svg')) {
    colorSvg(container, color);
    return Promise.resolve();
  }
  return loadAsset(url).then((text) => {
    container.innerHTML = text;
    container.dataset.assetUrl = url;
    prepareSvg(container, options.pad);
    colorSvg(container, color);
  });
}

function guardGameAccess(gameId) {
  return new Promise(function (resolve) {
    if (typeof Auth === 'undefined' || typeof Auth.canPlayAsync !== 'function') {
      resolve(true);
      return;
    }
    Auth.canPlayAsync(gameId).then(function (allowed) {
      if (allowed) {
        resolve(true);
        return;
      }
      window.location.href = '../../index.html?locked=' + encodeURIComponent(gameId);
      resolve(false);
    });
  });
}

async function mountGameShell(options) {
  options = options || {};
  if (options.gameId) {
    const allowed = await guardGameAccess(options.gameId);
    if (!allowed) return;
  }

  Interactive.tick = options.tick;
  Interactive.reset = options.reset || null;

  if (options.titleKey) {
    document.title = t(options.titleKey) + ' — igroprofi';
  }

  const back = document.querySelector('.back-btn');
  if (back) back.textContent = t('back');

  let cluster = document.querySelector('.top-left');
  if (!cluster) {
    cluster = document.createElement('div');
    cluster.className = 'top-left';
    if (back) {
      back.replaceWith(cluster);
      cluster.appendChild(back);
    } else {
      document.body.appendChild(cluster);
    }
  }

  if (!document.querySelector('.game-logo')) {
    const logo = document.createElement('div');
    logo.className = 'game-logo';
    logo.textContent = 'igroprofi';
    document.body.appendChild(logo);
  }

  if (!document.querySelector('.method-btn')) {
    const methodBtn = document.createElement('button');
    methodBtn.type = 'button';
    methodBtn.className = 'method-btn';
    methodBtn.textContent = t('methodica');
    document.body.appendChild(methodBtn);

    const panel = document.createElement('div');
    panel.className = 'method-panel';
    panel.hidden = true;
    panel.innerHTML =
      '<button type="button" class="method-panel__close">' + t('methodicaClose') + '</button>' +
      '<h2>' + t('methodicaTitle') + '</h2>' +
      '<p>' + t('methodicaStub') + '</p>';
    document.body.appendChild(panel);

    methodBtn.addEventListener('click', () => {
      panel.hidden = !panel.hidden;
    });
    panel.querySelector('.method-panel__close').addEventListener('click', () => {
      panel.hidden = true;
    });
  }

  const stage = document.getElementById('stage');
  if (stage && !document.getElementById('idle-layer')) {
    const idle = document.createElement('div');
    idle.id = 'idle-layer';
    idle.className = 'idle-layer';
    idle.innerHTML =
      '<img id="mosya" class="mosya" src="../../assets/logo/logo.svg" alt="igroprofi">' +
      '<div id="countdown" class="countdown" hidden>3</div>';
    stage.appendChild(idle);

    const celebrate = document.createElement('div');
    celebrate.id = 'celebrate-layer';
    celebrate.className = 'celebrate-layer';
    celebrate.hidden = true;
    celebrate.innerHTML =
      '<div class="firework firework--left"></div>' +
      '<div class="super-text">' + t('super') + '</div>' +
      '<div class="firework firework--right"></div>';
    stage.appendChild(celebrate);
  }

  const controls = document.getElementById('controls');
  controls.innerHTML = '';
  const startCol = document.createElement('div');
  startCol.className = 'controls-start';
  const play = document.createElement('button');
  play.type = 'button';
  play.className = 'play-btn';
  play.textContent = t('start');
  const endCol = document.createElement('div');
  endCol.className = 'controls-end';
  controls.append(startCol, play, endCol);
  Interactive.playBtn = play;
  createSpeedControl(startCol);
  if (typeof options.setupControls === 'function') options.setupControls(startCol, endCol);

  play.addEventListener('click', () => {
    if (isBusy()) userStop();
    else userStart();
  });

  showIdle();
  updatePlayBtn();
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (Interactive.intervalId !== null) {
      clearInterval(Interactive.intervalId);
      Interactive.intervalId = null;
    }
  } else if (Interactive.active && Interactive.tick) {
    runLoop(Interactive.token);
  }
});

window.addEventListener('pagehide', hardStop);
window.addEventListener('beforeunload', hardStop);
window.addEventListener('unload', hardStop);

document.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (link && link.getAttribute('href')) hardStop();
});
