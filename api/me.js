const auth = require('./lib/auth.js');
const { json, respondError } = require('./lib/http.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { ok: false, error: 'methodNotAllowed' });
  try {
    const user = await auth.requireUser(req);
    return json(res, 200, { ok: true, user: auth.publicUser(user) });
  } catch (err) {
    return respondError(res, err);
  }
};