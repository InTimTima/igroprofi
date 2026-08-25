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
  { label: '1', ms: 15000 },
  { label: '2', ms: 10000 },
  { label: '3', ms: 7000 },
  { label: '4', ms: 5000 },
  { label: '5', ms: 3500 },
  { label: '6', ms: 2500 },
  { label: '7', ms: 1500 },
  { label: '8', ms: 800 },
];

const I18N = {
  ru: {
    title: 'Интерактивные игры от igroprofi',
    titleLead: 'Интерактивные игры от',
    subtitle: 'Выберите интерактив для занятий и развития',
    open: 'Открыть →',
    back: '← Назад',
    methodica: 'Как играть?',
    methodicaTitle: 'Как играть?',
    methodicaClose: 'Закрыть',
    methodicaStub: 'Скоро здесь будет методичка. Здесь появится подробное описание, как использовать этот интерактив: идеи занятий, подсказки педагогу и примеры упражнений.',
    speed: 'Скорость',
    start: 'Старт',
    stop: 'Стоп',
    pause: 'Пауза',
    resume: 'Продолжить',
    super: 'Супер!',
    cheer: 'Ура! Какой ты молодец!',
    lang: 'EN',
    color: 'Цвет',
    colorDesc: 'Экран заливается одним из четырёх цветов. Фон меняется автоматически с настраиваемой скоростью.',
    hands: 'Ладошки',
    handsDesc: 'На белом фоне появляются левые и правые ладошки разных цветов. Можно выбрать одну или две ладошки.',
    arrows: 'Стрелочки',
    arrowsDesc: 'Стрелка случайного направления и цвета появляется на экране. Есть режим двух стрелочек и только вправо-влево.',
    halves: 'Половинки',
    halvesDesc: 'Экран разделён пополам — каждая половина меняет цвет независимо друг от друга.',
    quarters: 'Клеточки',
    quartersDesc: 'Экран разделён на четыре белые клетки. На каждой смене одна или несколько клеток закрашиваются случайным цветом.',
    dice: 'Кубики',
    diceDesc: 'На белом фоне появляется кубик с точками от 1 до 6 — каждый раз нового цвета.',
    numbers: 'Цифры',
    numbersDesc: 'Цвет фона меняется, а поверх него появляются цифры от 1 до 5.',
    carpetNumbers: 'Счет 1-10',
    carpetNumbersDesc: 'На стандартном ковре по очереди появляются цифры от 1 до 10 на случайных четвертях.',
    heels: 'Ножки',
    heelsDesc: 'Как «Ладошки», только с ножками: цвет, сторона и места меняются при каждой смене.',
    limbs: 'Ножки-ладошки',
    limbsDesc: 'На стандартном ковре появляются ладошки и ножки — одна конечность или ладошка с ножкой.',
    fence: 'Заборчик',
    fenceDesc: 'Четыре палочки в ряд. Цвета не повторяются, можно оставить три из четырёх.',
    sticks: 'Палочки',
    sticksDesc: 'Палочки выкладываются разными фигурами. Цвета не повторяются, фигура поворачивается.',
    shapes: 'Фигуры',
    shapesDesc: 'Квадрат, круг и треугольник разных цветов появляются на экране по очереди.',
    fly: 'Муха',
    flyDesc: 'Муха сидит в центре, а красный кружок показывает, в какой клетке её искать.',
    dots: 'Точки-цифра',
    dotsDesc: 'Кубики с точками 1–4 или квадраты с цифрами 1–4 в 4 цветах, сменяются на экране.',
    vowels: 'Гласные ладошки',
    vowelsDesc: 'Красные ладошки с гласными внутри и рядами троек для чтения.',
    flashlight: 'Фонарик',
    flashlightDesc: 'Жёлтый круг подсвечивает буквы Л / ЛП / П или цифры 1–5.',
    math: 'Математика',
    mathDesc: 'Простые примеры на сложение и вычитание в пределах 10.',
    reading: 'Чтение',
    readingDesc: 'Простые слова из 3, 4 и 5 букв появляются на экране.',
    oneHand: '1 ладошка',
    twoHands: '2 ладошки',
    oneHeel: '1 ножка',
    twoHeels: '2 ножки',
    oneArrow: '1 стрелочка',
    twoArrows: '2 стрелочки',
    leftRight: 'вправо-влево',
    fourSides: '4 стороны',
    threeSticks: '3 палочки',
    fourSticks: '4 палочки',
    oneLimb: 'одна рука или нога',
    bothLimb: 'и рука и нога',
    legsNoCross: 'без перекреста ног',
    legsRandom: 'случайно',
    dotsCubes: 'кубики',
    dotsSquares: 'квадраты',
    oneCube: '1 кубик',
    twoCubes: '2 кубика',
    flashLetters: 'буквы',
    flashDigits: 'цифры',
    mathAdd: 'сложение',
    mathSub: 'вычитание',
    mathMixed: 'сложение / вычитание',
    read3: '3 буквы',
    read4: '4 буквы',
    read5: '5 букв',
    shapesTwo: 'квадрат, круг',
    shapesThree: 'квадрат, круг, треугольник',
    shapesRepeat: 'фигуры повторяются',
    shapesUnique: 'фигуры не повторяются',
    cellsRepeat: 'клеточки повторяются',
    cellsUnique: 'клеточки не повторяются',
    squares: 'Цветных квадратов',
    colorsRepeat: 'цвета повторяются',
    colorsUnique: 'цвета не повторяются',
    vertical: 'вертикально',
    horizontal: 'горизонтально',
    plansTitle: 'Подписка igroprofi',
    plansSubtitle: 'Полный доступ ко всем интерактивам для занятий и развития',
    planTwoWeeks: '2 недели',
    planMonth: '1 месяц',
    planHalfYear: 'полгода',
    planYear: '1 год',
    planForever: 'навсегда',
    twoWeeksDesc: '14 дней полного доступа ко всем интерактивам',
    monthDesc: '30 дней полного доступа ко всем интерактивам',
    halfYearDesc: '183 дня полного доступа ко всем интерактивам',
    yearDesc: '365 дней полного доступа ко всем интерактивам',
    foreverDesc: 'Бессрочный доступ ко всем интерактивам',
    monthBenefit: 'Выгода 100 ₽ по сравнению с «2 недели»',
    halfYearBenefit: 'Выгода 500 ₽ по сравнению с «2 недели»',
    yearBenefit: 'Выгода 2 000 ₽ по сравнению с «2 недели»',
    foreverBenefit: 'Максимальная выгода — доступ навсегда',
    featAll: 'Все интерактивы без ограничений',
    featNew: 'Новые игры по мере выхода',
    featUpdates: 'Обновления и новые режимы',
    featAuto: 'Автопродление не требуется',
    buyPlan: 'Оформить подписку',
    rub: '₽',
    plansNote: 'Оплата через сервис ЮKassa: банковские карты, СБП, электронные кошельки. Тарифы и условия — в Пользовательском соглашении.',
    offerLink: 'Пользовательское соглашение',
    privacyLink: 'Политика конфиденциальности',
  },
  en: {
    title: 'Interactive games by igroprofi',
    titleLead: 'Interactive games by',
    subtitle: 'Choose an activity for lessons and development',
    open: 'Open →',
    back: '← Back',
    methodica: 'How to play?',
    methodicaTitle: 'How to play?',
    methodicaClose: 'Close',
    methodicaStub: 'The guide will be here soon. This section will explain how to use this activity: lesson ideas, tips for teachers and exercise examples.',
    speed: 'Speed',
    start: 'Start',
    stop: 'Stop',
    pause: 'Pause',
    resume: 'Resume',
    super: 'Super!',
    cheer: 'Yay! You did great!',
    lang: 'RU',
    color: 'Color',
    colorDesc: 'The screen fills with one of four colors and changes automatically at a chosen speed.',
    hands: 'Hands',
    handsDesc: 'Left and right hands of different colors appear on a white background. Choose one or two hands.',
    arrows: 'Arrows',
    arrowsDesc: 'An arrow of a random direction and color appears on screen. There is a two-arrow mode and a left-right only mode.',
    halves: 'Halves',
    halvesDesc: 'The screen is split in two — each half changes color independently.',
    quarters: 'Cells',
    quartersDesc: 'The screen is split into four white cells. On each change, one or more cells get a random color.',
    dice: 'Dice',
    diceDesc: 'A die with 1 to 6 dots appears on a white background, in one of four colors.',
    numbers: 'Numbers',
    numbersDesc: 'The background color changes while numbers from 1 to 5 appear on top.',
    carpetNumbers: 'Counting 1-10',
    carpetNumbersDesc: 'On the standard carpet, numbers from 1 to 10 appear one by one in random quarters.',
    heels: 'Feet',
    heelsDesc: 'Like Hands, but with feet: color, side and places change each time.',
    limbs: 'Hands and feet',
    limbsDesc: 'On the standard carpet, hands and feet appear — one limb, or a hand with a foot.',
    fence: 'Fence',
    fenceDesc: 'Four sticks in a row. Colors never repeat, you can leave three of the four.',
    sticks: 'Sticks',
    sticksDesc: 'Sticks form different shapes. Colors never repeat, the shape rotates.',
    shapes: 'Shapes',
    shapesDesc: 'Square, circle and triangle in different colors appear on screen one by one.',
    fly: 'Fly',
    flyDesc: 'The fly sits in the center, and a red circle shows which cell to look for it in.',
    dots: 'Dots-Number',
    dotsDesc: 'Dice with 1–4 dots or squares with numbers 1–4 in 4 colors.',
    vowels: 'Vowel Palms',
    vowelsDesc: 'Red palms with vowels inside and rows of triples for reading.',
    flashlight: 'Flashlight',
    flashlightDesc: 'A yellow circle highlights letters Л / ЛП / П or digits 1–5.',
    math: 'Math',
    mathDesc: 'Simple addition and subtraction examples within 10.',
    reading: 'Reading',
    readingDesc: 'Simple words of 3, 4 and 5 letters appear on screen.',
    oneHand: '1 hand',
    twoHands: '2 hands',
    oneHeel: '1 foot',
    twoHeels: '2 feet',
    oneArrow: '1 arrow',
    twoArrows: '2 arrows',
    leftRight: 'left-right',
    fourSides: '4 sides',
    threeSticks: '3 sticks',
    fourSticks: '4 sticks',
    oneLimb: 'one hand or foot',
    bothLimb: 'a hand and a foot',
    legsNoCross: 'no crossed legs',
    legsRandom: 'random',
    dotsCubes: 'dice',
    dotsSquares: 'squares',
    oneCube: '1 die',
    twoCubes: '2 dice',
    flashLetters: 'letters',
    flashDigits: 'digits',
    mathAdd: 'addition',
    mathSub: 'subtraction',
    mathMixed: 'addition / subtraction',
    read3: '3 letters',
    read4: '4 letters',
    read5: '5 letters',
    shapesTwo: 'square, circle',
    shapesThree: 'square, circle, triangle',
    shapesRepeat: 'shapes may repeat',
    shapesUnique: 'shapes never repeat',
    cellsRepeat: 'cells may repeat',
    cellsUnique: 'cells never repeat',
    squares: 'Colored squares',
    colorsRepeat: 'colors may repeat',
    colorsUnique: 'colors cannot repeat',
    vertical: 'vertical',
    horizontal: 'horizontal',
    plansTitle: 'igroprofi subscription',
    plansSubtitle: 'Full access to all activities for lessons and development',
    planTwoWeeks: '2 weeks',
    planMonth: '1 month',
    planHalfYear: '6 months',
    planYear: '1 year',
    planForever: 'forever',
    twoWeeksDesc: '14 days of full access to all activities',
    monthDesc: '30 days of full access to all activities',
    halfYearDesc: '183 days of full access to all activities',
    yearDesc: '365 days of full access to all activities',
    foreverDesc: 'Lifetime access to all activities',
    monthBenefit: 'Save 100 ₽ vs the 2-week plan',
    halfYearBenefit: 'Save 500 ₽ vs the 2-week plan',
    yearBenefit: 'Save 2,000 ₽ vs the 2-week plan',
    foreverBenefit: 'Best value — lifetime access',
    featAll: 'All activities without limits',
    featNew: 'New games as they come out',
    featUpdates: 'Updates and new modes',
    featAuto: 'No auto-renewal required',
    buyPlan: 'Get the subscription',
    rub: '₽',
    plansNote: 'Paid via YooKassa: bank cards, SBP, e-wallets. Plans and terms — see the Terms of Service.',
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
  speedMs: SPEED_STEPS[5].ms,
  audio: null,
  lastSoundAt: 0,
  playBtn: null,
  pauseBtn: null,
  paused: false,
  base: (function () {
    const path = window.location.pathname || '';
    return path.indexOf('/games/') !== -1 ? '../../' : '';
  })(),
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

function playTick() {
  try {
    const ctx = getAudio();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const start = ctx.currentTime;
    tone(ctx, 880, start, 0.12, 'sine', 0.07);
  } catch (err) {
    /* ignore */
  }
}

function playStartTone() {
  try {
    const ctx = getAudio();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const start = ctx.currentTime;
    tone(ctx, 3136, start, 0.5, 'sine', 0.055);
    tone(ctx, 4186, start + 0.04, 0.45, 'sine', 0.028);
  } catch (err) {
    /* ignore */
  }
}

function pickVoice(langPrefix) {
  try {
    const voices = window.speechSynthesis.getVoices();
    const candidates = voices.filter(function (v) {
      return v.lang && v.lang.toLowerCase().indexOf(langPrefix) === 0;
    });
    if (!candidates.length) return null;
    const preferred = candidates.filter(function (v) {
      const n = v.name.toLowerCase();
      return /natural|google|irina|svetlana|milena|katya|arina/.test(n) && !/male|dmitry|dmitri|yuri|yuriy|pavel|daniel|mark/.test(n);
    });
    return preferred[0] || candidates[0] || null;
  } catch (err) {
    return null;
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
    playCheerVoice();
  } catch (err) {
    /* ignore */
  }
}

function playCheerVoice() {
  try {
    let audio = Interactive.cheerAudio;
    if (!audio) {
      audio = new Audio(Interactive.base + 'assets/voice-cheer.mp3');
      audio.preload = 'auto';
      Interactive.cheerAudio = audio;
    }
    audio.currentTime = 0;
    audio.play().catch(function () {});
  } catch (err) {
    /* ignore */
  }
}

function pickVoice(langPrefix) {
  try {
    const voices = window.speechSynthesis.getVoices();
    const candidates = voices.filter(function (v) {
      return v.lang && v.lang.toLowerCase().indexOf(langPrefix) === 0;
    });
    if (!candidates.length) return null;
    const preferred = candidates.filter(function (v) {
      const n = v.name.toLowerCase();
      return /natural|google|irina|svetlana|milena|katya|arina/.test(n) && !/male|dmitry|dmitri|yuri|yuriy|pavel|daniel|mark/.test(n);
    });
    return preferred[0] || candidates[0] || null;
  } catch (err) {
    return null;
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
    if (Interactive.paused) return;
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
  updatePauseBtn();
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
  playTick();
  updatePlayBtn();

  let n = 3;
  function step() {
    if (token !== Interactive.token) return;
    n -= 1;
    if (n >= 1) {
      if (count) popCountdown(count, n);
      playTick();
      Interactive.countdownId = setTimeout(step, 720);
      return;
    }
    Interactive.countingDown = false;
    Interactive.countdownId = null;
    if (idle) idle.hidden = true;
    if (count) count.hidden = true;
    if (mosya) mosya.hidden = false;
    Interactive.active = true;
    playStartTone();
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
  Interactive.paused = false;
  if (typeof Interactive.reset === 'function') Interactive.reset();
  beginCountdown();
}

function userStop() {
  const wasRunning = Interactive.active;
  clearLoop();
  Interactive.active = false;
  Interactive.paused = false;
  updatePlayBtn();
  if (wasRunning) celebrateThenIdle();
  else showIdle();
}

function hardStop() {
  Interactive.active = false;
  Interactive.countingDown = false;
  Interactive.paused = false;
  clearLoop();
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  if (Interactive.audio && Interactive.audio.state === 'running') {
    Interactive.audio.suspend().catch(() => {});
  }
}

function createSpeedControl(container, initialIndex) {
  const index = initialIndex == null ? 5 : initialIndex;
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

  const pauseBtn = document.createElement('button');
  pauseBtn.type = 'button';
  pauseBtn.className = 'pause-btn';
  pauseBtn.textContent = '❚❚';
  pauseBtn.setAttribute('aria-label', t('pause'));
  pauseBtn.title = t('pause');
  Interactive.pauseBtn = pauseBtn;

  const ticks = document.createElement('div');
  ticks.className = 'speed-ticks';
  SPEED_STEPS.forEach((step) => {
    const tick = document.createElement('span');
    tick.textContent = step.label;
    ticks.appendChild(tick);
  });

  const row = document.createElement('div');
  row.className = 'speed-row';

  pauseBtn.addEventListener('click', () => {
    togglePause();
  });

  slider.addEventListener('input', () => {
    Interactive.speedMs = SPEED_STEPS[Number(slider.value)].ms;
    if (Interactive.active && !Interactive.paused) runLoop(Interactive.token);
  });

  row.append(pauseBtn, slider);
  wrapper.append(label, row, ticks);
  container.appendChild(wrapper);
}

function togglePause() {
  if (!Interactive.active || Interactive.countingDown) return;
  Interactive.paused = !Interactive.paused;
  updatePauseBtn();
  if (!Interactive.paused) {
    const token = Interactive.token;
    if (typeof Interactive.tick === 'function') Interactive.tick(false);
    runLoop(token);
  }
}

function updatePauseBtn() {
  const btn = Interactive.pauseBtn;
  if (!btn) return;
  const busy = isBusy();
  btn.disabled = !busy;
  if (Interactive.paused) {
    btn.textContent = '▶';
    btn.setAttribute('aria-label', t('resume'));
    btn.title = t('resume');
    btn.classList.add('pause-btn--on');
  } else {
    btn.textContent = '❚❚';
    btn.setAttribute('aria-label', t('pause'));
    btn.title = t('pause');
    btn.classList.remove('pause-btn--on');
  }
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

// Перекрашивает палочки по отдельности (фигуры из нескольких палочек).
function paintSticksSvg(container, colors) {
  const svg = container.querySelector('svg');
  if (!svg) return;
  svg.querySelectorAll('style').forEach((style) => style.remove());
  svg.querySelectorAll('rect').forEach((rect, index) => {
    rect.removeAttribute('class');
    rect.setAttribute('fill', IGRO_COLORS[colors[index % colors.length]]);
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
    const content = options.methodica || '<p>' + t('methodicaStub') + '</p>';
    panel.innerHTML =
      '<button type="button" class="method-panel__close">' + t('methodicaClose') + '</button>' +
      '<h2>' + t('methodicaTitle') + '</h2>' +
      content;
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
