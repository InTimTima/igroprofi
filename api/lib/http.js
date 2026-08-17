// Общие утилиты HTTP-ответов для серверных функций.
function json(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

function respondError(res, err) {
  const status = (err && err.status) || 502;
  const message = (err && err.message) || 'serverError';
  if (status === 401) return json(res, 401, { ok: false, error: 'unauthorized' });
  if (status === 503) return json(res, 503, { ok: false, error: 'dbNotConfigured' });
  return json(res, status, { ok: false, error: message });
}

module.exports = { json, respondError };