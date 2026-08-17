const payments = require('./lib/payments.js');
const auth = require('./lib/auth.js');
const { json } = require('./lib/http.js');

// Уведомление от ЮKassa (настраивается в кабинете ЮKassa:
// URL уведомлений -> https://igroprofi.ru/api/webhook)
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'methodNotAllowed' });

  const body = req.body || {};
  const paymentId = body.object && body.object.id;
  if (!paymentId || !payments.config()) return json(res, 200, { ok: true });

  try {
    // Не доверяем телу уведомления — проверяем статус напрямую в ЮKassa.
    const payment = await payments.getPayment(paymentId);
    if (payment.status === 'succeeded') {
      const meta = payment.metadata || {};
      if (meta.userId && (meta.plan === 'month' || meta.plan === 'forever')) {
        await auth.activateSubscription(meta.userId, meta.plan);
      }
    }
    return json(res, 200, { ok: true });
  } catch (err) {
    // Возвращаем 200, чтобы ЮKassa не повторяла уведомление бесконечно;
    // активация подстрахована при проверке платежа на странице результата.
    return json(res, 200, { ok: false });
  }
};