const db = require('./lib/db.js');
const auth = require('./lib/auth.js');
const { json, respondError } = require('./lib/http.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'methodNotAllowed' });

  const body = req.body || {};
  const login = String(body.login || '').trim().toLowerCase();
  const password = String(body.password || '');

  if (login.length < 3) return json(res, 400, { ok: false, error: 'loginShort' });
  if (password.length < 4) return json(res, 400, { ok: false, error: 'passwordShort' });

  try {
    const existing = await db.select('users', db.eq('login', login));
    if (existing[0]) return json(res, 400, { ok: false, error: 'loginTaken' });

    const user = await db.insert('users', {
      login: login,
      password_hash: auth.hashPassword(password),
    });
    const session = await auth.createSession(user.id);

    return json(res, 200, { ok: true, token: session.token, user: auth.publicUser(user) });
  } catch (err) {
    return respondError(res, err);
  }
};