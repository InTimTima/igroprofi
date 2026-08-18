// Работа с платёжным API ЮKassa.
const crypto = require('crypto');

const YOOKASSA_API = 'https://api.yookassa.ru/v3';

const PRICES = {
  twoWeeks: '250.00',
  month: '400.00',
  halfYear: '2500.00',
  year: '4000.00',
};

const DESCRIPTIONS = {
  twoWeeks: 'Подписка igroprofi — 2 недели',
  month: 'Подписка igroprofi — 1 месяц',
  halfYear: 'Подписка igroprofi — полгода',
  year: 'Подписка igroprofi — 1 год',
};

function config() {
  const shopId = process.env.YOOKASSA_SHOP_ID;
  const secret = process.env.YOOKASSA_SECRET_KEY;
  if (!shopId || !secret) return null;
  return { shopId, secret };
}

function requestYooz(method, path, body) {
  const cfg = config();
  if (!cfg) {
    const err = new Error('yookassaNotConfigured');
    err.status = 503;
    throw err;
  }
  const headers = {
    Authorization: 'Basic ' + Buffer.from(cfg.shopId + ':' + cfg.secret).toString('base64'),
    'Idempotence-Key': crypto.randomUUID(),
    'Content-Type': 'application/json',
  };
  const options = { method, headers };
  if (body !== undefined) options.body = JSON.stringify(body);
  return fetch(YOOKASSA_API + path, options).then(function (res) {
    return res.json().then(function (data) {
      if (!res.ok) {
        const err = new Error(String(data.description || data.code || res.status));
        err.status = res.status;
        throw err;
      }
      return data;
    });
  });
}

function getPayment(paymentId) {
  return requestYooz('GET', '/payments/' + encodeURIComponent(paymentId));
}

function createPayment(payload) {
  return requestYooz('POST', '/payments', payload);
}

module.exports = { PRICES, DESCRIPTIONS, config, createPayment, getPayment };