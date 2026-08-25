const payments = require('./lib/payments.js');
const auth = require('./lib/auth.js');
const { json, respondError } = require('./lib/http.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'methodNotAllowed' });
  try {
    const user = await auth.requireUser(req);
    const body = req.body || {};
    let amount = String(body.amount || '').trim().replace(',', '.');
    const num = Number(amount);
    if (!num || isNaN(num) || num < 1) return json(res, 400, { ok: false, error: 'badAmount' });
    if (num > 100000) return json(res, 400, { ok: false, error: 'badAmount' });
    const value = num.toFixed(2);

    if (!payments.config()) {
      return json(res, 200, { ok: true, mode: 'demo', amount: value });
    }

    const origin = req.headers.origin || 'https://' + req.headers.host;
    const returnUrl = origin + '/payment-result.html?donate=1';

    const payload = {
      amount: { value: value, currency: 'RUB' },
      capture: true,
      confirmation: { type: 'redirect', return_url: returnUrl },
      description: 'Поддержка автора igroprofi — донат',
      metadata: { userId: user.id, login: user.login, kind: 'donate', amount: value },
    };

    const email = String(body.email || '').trim();
    if (email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      payload.receipt = {
        customer: { email: email },
        items: [{
          description: 'Поддержка автора igroprofi — донат',
          quantity: '1.00',
          amount: { value: value, currency: 'RUB' },
          vat_code: '1',
        }],
      };
    }

    const payment = await payments.createPayment(payload);
    if (payment.confirmation && payment.confirmation.confirmation_url) {
      return json(res, 200, { ok: true, mode: 'live', amount: value, paymentId: payment.id, confirmationUrl: payment.confirmation.confirmation_url });
    }
    return json(res, 502, { ok: false, error: 'noConfirmation' });
  } catch (err) {
    return respondError(res, err);
  }
};
