const payments = require('./lib/payments.js');
const auth = require('./lib/auth.js');
const { json, respondError } = require('./lib/http.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'methodNotAllowed' });

  try {
    const user = await auth.requireUser(req);
    const body = req.body || {};
    const plan = String(body.plan || '');
    if (!payments.PRICES[plan]) return json(res, 400, { ok: false, error: 'badPlan' });

    // Без ключей ЮKassa — демо-режим (только для разработки).
    if (!payments.config()) {
      return json(res, 200, {
        ok: true,
        mode: 'demo',
        plan: plan,
        paymentId: 'demo-' + plan,
      });
    }

    const origin = req.headers.origin || 'https://' + req.headers.host;
    const returnUrl = origin + '/payment-result.html?plan=' + plan;

    const payload = {
      amount: { value: payments.PRICES[plan], currency: 'RUB' },
      capture: true,
      confirmation: { type: 'redirect', return_url: returnUrl },
      description: payments.DESCRIPTIONS[plan],
      metadata: { userId: user.id, login: user.login, plan: plan },
    };

    const email = String(body.email || '').trim();
    if (email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      payload.receipt = {
        customer: { email: email },
        items: [
          {
            description: payments.DESCRIPTIONS[plan],
            quantity: '1.00',
            amount: { value: payments.PRICES[plan], currency: 'RUB' },
            vat_code: '1',
          },
        ],
      };
    }

    const payment = await payments.createPayment(payload);
    if (payment.confirmation && payment.confirmation.confirmation_url) {
      return json(res, 200, {
        ok: true,
        mode: 'live',
        plan: plan,
        paymentId: payment.id,
        confirmationUrl: payment.confirmation.confirmation_url,
      });
    }
    return json(res, 502, { ok: false, error: 'noConfirmation' });
  } catch (err) {
    return respondError(res, err);
  }
};