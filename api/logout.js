const auth = require('./lib/auth.js');
const { json } = require('./lib/http.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'methodNotAllowed' });
  await auth.destroySession(req);
  return json(res, 200, { ok: true });
};