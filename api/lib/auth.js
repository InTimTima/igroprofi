// Аутентификация на сервере: хеширование паролей (scrypt, встроенный в Node),
// сессии с хешем токена (sha256), проверка авторизации.
const crypto = require('crypto');
const db = require('./db.js');

const SESSION_MS = 30 * 24 * 60 * 60 * 1000;
const ADMIN_LOGIN = 'igroprofi';

const DAY_MS = 24 * 60 * 60 * 1000;
const PLAN_DAYS = {
  twoWeeks: 14,
  month: 30,
  halfYear: 183,
  year: 365,
};

function isAdmin(user) {
  return !!(user && (user.is_admin === true || user.login === ADMIN_LOGIN));
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return 'scrypt$' + salt + '$' + hash;
}

function verifyPassword(password, stored) {
  if (!stored || typeof stored !== 'string') return false;
  const parts = stored.split('$');
  if (parts.length !== 3 || parts[0] !== 'scrypt') return false;
  const expected = Buffer.from(parts[2], 'hex');
  let calc;
  try {
    calc = crypto.scryptSync(password, parts[1], 64);
  } catch (err) {
    return false;
  }
  return calc.length === expected.length && crypto.timingSafeEqual(calc, expected);
}

function newToken() {
  return crypto.randomBytes(32).toString('hex');
}

function tokenHash(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function bearerToken(req) {
  const header = req.headers.authorization || '';
  const match = /^Bearer\s+(.+)$/i.exec(header);
  return match ? match[1].trim() : '';
}

function authError(message) {
  const err = new Error(message);
  err.status = 401;
  return err;
}

function publicUser(user) {
  return {
    id: user.id,
    login: user.login,
    isAdmin: isAdmin(user),
    subscription: user.subscription || null,
    expiresAt: user.expires_at ? new Date(user.expires_at).getTime() : null,
    createdAt: user.created_at ? new Date(user.created_at).getTime() : null,
  };
}

async function createSession(userId) {
  const token = newToken();
  const expiresAt = new Date(Date.now() + SESSION_MS).toISOString();
  await db.insert('sessions', {
    token_hash: tokenHash(token),
    user_id: userId,
    expires_at: expiresAt,
  });
  return { token: token, expiresAt: expiresAt };
}

async function destroySession(req) {
  const token = bearerToken(req);
  if (!token) return;
  try {
    await db.remove('sessions', db.eq('token_hash', tokenHash(token)));
  } catch (err) {
    // игнорируем — выход из аккаунта не должен падать
  }
}

async function requireUser(req) {
  const token = bearerToken(req);
  if (!token) throw authError('unauthorized');

  const rows = await db.select('sessions', db.eq('token_hash', tokenHash(token)));
  const session = rows[0];
  if (!session) throw authError('unauthorized');

  if (new Date(session.expires_at).getTime() < Date.now()) {
    await db.remove('sessions', db.eq('token_hash', tokenHash(token)));
    throw authError('unauthorized');
  }

  const users = await db.select('users', db.eq('id', session.user_id));
  const user = users[0];
  if (!user) throw authError('unauthorized');
  return user;
}

// Активация подписки в базе (вызывается после подтверждённого платежа).
// Идемпотентно: продление тарифа от текущей даты или от конца активной подписки.
async function activateSubscription(userId, plan) {
  const days = PLAN_DAYS[plan];
  if (!days) return;
  const rows = await db.select('users', db.eq('id', userId));
  const user = rows[0];
  if (!user) return;

  const now = Date.now();
  let base = now;
  if (user.subscription && PLAN_DAYS[user.subscription] && user.expires_at) {
    const exp = new Date(user.expires_at).getTime();
    if (exp > now) base = exp;
  }
  await db.update('users', db.eq('id', userId), {
    subscription: plan,
    expires_at: new Date(base + days * DAY_MS).toISOString(),
  });
}

module.exports = {
  hashPassword,
  verifyPassword,
  bearerToken,
  isAdmin,
  publicUser,
  createSession,
  destroySession,
  requireUser,
  activateSubscription,
};