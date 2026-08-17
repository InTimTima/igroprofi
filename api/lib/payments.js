// Работа с платёжным API ЮKassa.
const crypto = require('crypto');

const YOOKASSA_API = 'https://api.yookassa.ru/v3';

const PRICES = {
  month: '350.00',
  forever: '2700.00',
};

const DESCRIPTIONS = {
  month: 'Подписка igroprofi — 1 месяц',
  forever: 'Подписка igroprofi — навсегда',
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