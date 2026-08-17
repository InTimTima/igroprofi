const payments = require('./lib/payments.js');
const auth = require('./lib/auth.js');
const { json, respondError } = require('./lib/http.js');

module.exports = async function handler(req, res) {
  try {
    const user = await auth.requireUser(req);

    const id = String(req.query.id || req.query.payment_id || (req.body && (req.body.id || req.body.payment_id)) || '').trim();
    if (!id) return json(res, 400, { ok: false, error: 'missingId' });

    // Демо-платежи работают только когда ЮKassa не настроена.
    if (id.indexOf('demo-') === 0) {
      if (payments.config()) return json(res, 400, { ok: false, error: 'badPayment' });
      const plan = id.replace('demo-', '');
      if (plan !== 'month' && plan !== 'forever') return json(res, 400, { ok: false, error: 'badPlan' });
      await auth.activateSubscription(user.id, plan);
      return json(res, 200, { ok: true, mode: 'demo', status: 'succeeded', plan: plan });
    }

    if (!payments.config()) return json(res, 503, { ok: false, error: 'yookassaNotConfigured' });

    const payment = await payments.getPayment(id);

    if (payment.status === 'succeeded') {
      const meta = payment.metadata || {};
      if (meta.userId && String(meta.userId) !== String(user.id)) {
        return json(res, 403, { ok: false, error: 'paymentMismatch' });
      }
      await auth.activateSubscription(user.id, meta.plan);
    }

    return json(res, 200, {
      ok: true,
      mode: 'live',
      status: payment.status || 'unknown',
      plan: (payment.metadata && payment.metadata.plan) || '',
    });
  } catch (err) {
    return respondError(res, err);
  }
};