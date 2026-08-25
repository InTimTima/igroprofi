const PLANS = {
  twoWeeks: { price: '250', labelKey: 'planTwoWeeks', descKey: 'twoWeeksDesc' },
  month: { price: '400', labelKey: 'planMonth', descKey: 'monthDesc', benefitKey: 'monthBenefit' },
  halfYear: { price: '2 500', labelKey: 'planHalfYear', descKey: 'halfYearDesc', benefitKey: 'halfYearBenefit' },
  year: { price: '4 000', labelKey: 'planYear', descKey: 'yearDesc', benefitKey: 'yearBenefit' },
  forever: { price: '7 500', labelKey: 'planForever', descKey: 'foreverDesc', benefitKey: 'foreverBenefit' },
};

const PAY_I18N = {
  ru: {
    paymentTitle: 'Оформление подписки',
    plan: 'Тариф',
    featsTitle: 'Что входит в подписку',
    featAll: 'Все интерактивы без ограничений',
    featNew: 'Новые игры по мере выхода',
    featUpdates: 'Обновления и новые режимы',
    featSupport: 'Приоритетная поддержка',
    emailLabel: 'E-mail (для чека, необязательно)',
    emailPlaceholder: 'you@example.com',
    agreement: 'Я принимаю условия <a href="oferta.html" target="_blank" rel="noopener">Пользовательского соглашения</a> и <a href="privacy.html" target="_blank" rel="noopener">Политики конфиденциальности</a>',
    pay: 'Перейти к оплате',
    total: 'К оплате',
    processing: 'Создаём платёж…',
    demoNote: 'Демо-режим: реальный платёж не выполняется, подписка активируется сразу.',
    successTitle: 'Подписка активирована!',
    successText: 'Спасибо! Все интерактивы теперь доступны.',
    successDemoText: 'Демо-подписка активирована. Для приёма реальных платежей добавьте ключи ЮKassa в настройки проекта.',
    errorTitle: 'Не удалось начать оплату',
    errorText: 'Что-то пошло не так. Попробуйте ещё раз или зайдите позже.',
    tryAgain: 'Попробовать снова',
    close: 'Закрыть',
    payVia: 'Оплата через сервис ЮKassa — карты, СБП, кошельки',
    rub: '₽',
    requiredAgreement: 'Сначала подтвердите согласие с условиями',
    needAuth: 'Для покупки нужно войти в аккаунт',
    lockedHint: 'Доступно по подписке',
  },
  en: {
    paymentTitle: 'Checkout',
    plan: 'Plan',
    featsTitle: 'What the subscription includes',
    featAll: 'All activities without limits',
    featNew: 'New games as they come out',
    featUpdates: 'Updates and new modes',
    featSupport: 'Priority support',
    emailLabel: 'E-mail (for receipt, optional)',
    emailPlaceholder: 'you@example.com',
    agreement: 'I accept the <a href="oferta.html" target="_blank" rel="noopener">Terms of Service</a> and the <a href="privacy.html" target="_blank" rel="noopener">Privacy Policy</a>',
    pay: 'Pay now',
    total: 'Total',
    processing: 'Creating payment…',
    demoNote: 'Demo mode: no real charge, the subscription is activated right away.',
    successTitle: 'Subscription activated!',
    successText: 'Thank you! All activities are now available.',
    successDemoText: 'Demo subscription activated. To accept real payments, add YooKassa keys in the project settings.',
    errorTitle: 'Could not start the payment',
    errorText: 'Something went wrong. Please try again later.',
    tryAgain: 'Try again',
    close: 'Close',
    payVia: 'Paid via YooKassa — cards, SBP, wallets',
    rub: '₽',
    requiredAgreement: 'Please accept the terms first',
    needAuth: 'Please log in to purchase',
    lockedHint: 'Subscription required',
  },
};

function pt(key) {
  const lang = typeof getLang === 'function' ? getLang() : 'ru';
  const pack = PAY_I18N[lang] || PAY_I18N.ru;
  const value = pack[key];
  if (value != null) return value;
  if (typeof t === 'function') return t(key);
  return PAY_I18N.ru[key] || key;
}

let paymentStep = 'choose';
let paymentPlan = 'month';
let pendingPaymentPlan = null;

function buildFeatList(plan) {
  const keys = ['featAll', 'featNew', 'featUpdates'];
  return keys.map((k) => '<li>' + pt(k) + '</li>').join('');
}

function ensurePaymentModal() {
  let modal = document.getElementById('payment-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'payment-modal';
    modal.className = 'pay-modal';
    modal.hidden = true;
    modal.innerHTML =
      '<div class="pay-modal__card" role="dialog" aria-modal="true" aria-labelledby="pay-title">' +
      '<button type="button" class="auth-modal__close" id="pay-close"></button>' +
      '<h2 id="pay-title"></h2>' +

      '<div class="pay-step" data-pay-step="choose">' +
      '<div class="pay-plan">' +
      '<div class="pay-plan__head"><span class="pay-plan__name" id="pay-plan-name"></span><span class="pay-plan__price" id="pay-plan-price"></span></div>' +
      '<p class="pay-plan__desc" id="pay-plan-desc"></p>' +
      '<p class="pay-plan__benefit" id="pay-plan-benefit"></p>' +
      '<ul class="pay-plan__feats" id="pay-plan-feats"></ul>' +
      '</div>' +
      '<label class="auth-field"><span id="pay-email-label"></span><input id="pay-email" type="email" inputmode="email" autocomplete="email" placeholder="you@example.com"></label>' +
      '<label class="pay-agree"><input type="checkbox" id="pay-agree"><span id="pay-agree-text"></span></label>' +
      '<p class="pay-error" id="pay-error" hidden></p>' +
      '<div class="pay-total"><span id="pay-total-label"></span><strong id="pay-total-value"></strong></div>' +
      '<button type="button" class="auth-primary" id="pay-submit"></button>' +
      '<p class="pay-via" id="pay-via"></p>' +
      '</div>' +

      '<div class="pay-step pay-step--center" data-pay-step="processing" hidden>' +
      '<div class="pay-spinner"></div>' +
      '<p class="pay-status" id="pay-processing-text"></p>' +
      '<p class="pay-demo-note" id="pay-demo-note" hidden></p>' +
      '</div>' +

      '<div class="pay-step pay-step--center" data-pay-step="success" hidden>' +
      '<div class="pay-success-ico" aria-hidden="true">✓</div>' +
      '<h3 id="pay-success-title"></h3>' +
      '<p class="pay-status" id="pay-success-text"></p>' +
      '<p class="pay-demo-note" id="pay-success-demo" hidden></p>' +
      '<button type="button" class="auth-primary" id="pay-done"></button>' +
      '</div>' +

      '<div class="pay-step pay-step--center" data-pay-step="error" hidden>' +
      '<h3 id="pay-error-title"></h3>' +
      '<p class="pay-status" id="pay-error-text"></p>' +
      '<button type="button" class="auth-primary" id="pay-retry"></button>' +
      '</div>' +
      '</div>';
    document.body.appendChild(modal);
  }

  if (modal.dataset.bound === '1') {
    fillPaymentTexts();
    return;
  }
  modal.dataset.bound = '1';

  document.getElementById('pay-close').onclick = closePaymentModal;
  modal.addEventListener('click', function (event) {
    if (event.target === modal) closePaymentModal();
  });

  const agree = document.getElementById('pay-agree');
  agree.addEventListener('change', function () {
    document.getElementById('pay-submit').disabled = !agree.checked;
    const err = document.getElementById('pay-error');
    if (agree.checked) {
      err.hidden = true;
      err.textContent = '';
    }
  });

  document.getElementById('pay-submit').onclick = startPayment;
  document.getElementById('pay-retry').onclick = function () {
    setPaymentStep('choose');
  };
  document.getElementById('pay-done').onclick = closePaymentModal;

  fillPaymentTexts();
}

function fillPaymentTexts() {
  const plan = PLANS[paymentPlan] || PLANS.month;
  const setText = function (id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };
  setText('pay-close', pt('close'));
  setText('pay-title', pt('paymentTitle'));
  setText('pay-plan-name', pt(plan.labelKey));
  setText('pay-plan-price', plan.price + ' ' + pt('rub'));
  setText('pay-plan-desc', pt(plan.descKey));
  const benefit = document.getElementById('pay-plan-benefit');
  if (benefit) {
    if (plan.benefitKey) {
      benefit.textContent = pt(plan.benefitKey);
      benefit.hidden = false;
    } else {
      benefit.hidden = true;
    }
  }
  const feats = document.getElementById('pay-plan-feats');
  if (feats) feats.innerHTML = buildFeatList(paymentPlan);
  setText('pay-email-label', pt('emailLabel'));
  const email = document.getElementById('pay-email');
  if (email) email.placeholder = pt('emailPlaceholder');
  const agreeText = document.getElementById('pay-agree-text');
  if (agreeText) agreeText.innerHTML = pt('agreement');
  setText('pay-total-label', pt('total'));
  setText('pay-total-value', plan.price + ' ' + pt('rub'));
  setText('pay-submit', pt('pay'));
  setText('pay-via', pt('payVia'));
  setText('pay-processing-text', pt('processing'));
  setText('pay-demo-note', pt('demoNote'));
  setText('pay-success-title', pt('successTitle'));
  setText('pay-success-text', pt('successText'));
  setText('pay-success-demo', pt('successDemoText'));
  setText('pay-error-title', pt('errorTitle'));
  setText('pay-error-text', pt('errorText'));
  setText('pay-retry', pt('tryAgain'));
  setText('pay-done', pt('close'));
  if (paymentStep === 'success') {
    const demo = document.getElementById('pay-success-demo');
    if (demo) demo.hidden = true;
  }
}

function setPaymentStep(step) {
  paymentStep = step;
  document.querySelectorAll('[data-pay-step]').forEach(function (el) {
    el.hidden = el.getAttribute('data-pay-step') !== step;
  });
  if (step === 'choose') {
    const agree = document.getElementById('pay-agree');
    agree.checked = false;
    document.getElementById('pay-submit').disabled = true;
  }
}

function showPayError(key) {
  const err = document.getElementById('pay-error');
  err.textContent = pt(key);
  err.hidden = false;
}

function openPaymentModal(plan) {
  if (!Auth.isLoggedIn()) {
    pendingPaymentPlan = plan || 'month';
    if (typeof openAuthModal === 'function') openAuthModal('login');
    return;
  }
  pendingPaymentPlan = null;
  ensurePaymentModal();
  paymentPlan = plan || 'month';
  fillPaymentTexts();
  const err = document.getElementById('pay-error');
  if (err) {
    err.hidden = true;
    err.textContent = '';
  }
  if (typeof closeAuthModal === 'function') closeAuthModal();
  if (typeof closeProfileDrawer === 'function') closeProfileDrawer();
  setPaymentStep('choose');
  showEl(document.getElementById('payment-modal'));
}

function closePaymentModal() {
  hideEl(document.getElementById('payment-modal'));
}

function startPayment() {
  const agree = document.getElementById('pay-agree');
  if (!agree.checked) {
    showPayError('requiredAgreement');
    return;
  }
  const err = document.getElementById('pay-error');
  err.hidden = true;
  err.textContent = '';

  const email = document.getElementById('pay-email').value.trim();

  setPaymentStep('processing');
  const demoNote = document.getElementById('pay-demo-note');

  Auth.api('/api/create-payment', {
    method: 'POST',
    body: JSON.stringify({ plan: paymentPlan, email: email || undefined }),
  })
    .then(function (res) {
      return res.json().then(function (data) {
        return { ok: res.ok, data: data };
      });
    })
    .then(function (result) {
      if (!result.ok || !result.data || result.data.ok === false) {
        throw new Error(result.data && result.data.error ? result.data.error : 'serverError');
      }
      const data = result.data;
      if (data.mode === 'demo') {
        demoNote.hidden = false;
        setTimeout(function () {
          verifyDemoPayment(data.plan || paymentPlan);
        }, 900);
        return;
      }
      if (data.confirmationUrl) {
        window.location.href = data.confirmationUrl;
        return;
      }
      throw new Error('noConfirmUrl');
    })
    .catch(function () {
      setPaymentStep('error');
    });
}

function verifyDemoPayment(plan) {
  Auth.api('/api/check-payment?id=' + encodeURIComponent('demo-' + plan))
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data || data.status !== 'succeeded') throw new Error('demoFailed');
      return Auth.loadUser();
    })
    .then(function () {
      paymentStep = 'success';
      fillPaymentTexts();
      const demo = document.getElementById('pay-success-demo');
      if (demo) demo.hidden = false;
      setPaymentStep('success');
      if (typeof refreshHomeAuthUI === 'function') refreshHomeAuthUI();
    })
    .catch(function () {
      setPaymentStep('error');
    });
}

function mountPaymentUI() {
  document.querySelectorAll('[data-buy]').forEach(function (btn) {
    if (btn.dataset.payBound) return;
    btn.dataset.payBound = '1';
    btn.addEventListener('click', function () {
      if (!Auth.isLoggedIn()) {
        pendingPaymentPlan = btn.getAttribute('data-buy');
        if (typeof openAuthModal === 'function') openAuthModal('login');
        return;
      }
      openPaymentModal(btn.getAttribute('data-buy'));
    });
  });
}

window.openPaymentModal = openPaymentModal;
window.closePaymentModal = closePaymentModal;
window.getPendingPaymentPlan = function () {
  return pendingPaymentPlan;
};
window.clearPendingPaymentPlan = function () {
  pendingPaymentPlan = null;
};

if (document.body && document.body.classList.contains('home')) {
  mountPaymentUI();
}