const db = require('./lib/db.js');
const auth = require('./lib/auth.js');
const { json, respondError } = require('./lib/http.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'methodNotAllowed' });

  const body = req.body || {};
  const login = String(body.login || '').trim().toLowerCase();
  const password = String(body.password || '');

  try {
    const rows = await db.select('users', db.eq('login', login));
    const user = rows[0];
    if (!user || !auth.verifyPassword(password, user.password_hash)) {
      return json(res, 401, { ok: false, error: 'badCredentials' });
    }
    const session = await auth.createSession(user.id);
    return json(res, 200, { ok: true, token: session.token, user: auth.publicUser(user) });
  } catch (err) {
    return respondError(res, err);
  }
};