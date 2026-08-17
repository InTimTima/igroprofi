// Доступ к Supabase (PostgREST) с сервера через service_role ключ.
// Ключ лежит только в переменных окружения и не попадает в браузер.
function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/+$/, ''), key: key };
}

function requireConfig() {
  const cfg = config();
  if (!cfg) {
    const err = new Error('dbNotConfigured');
    err.status = 503;
    throw err;
  }
  return cfg;
}

function headers() {
  const cfg = requireConfig();
  return {
    apikey: cfg.key,
    Authorization: 'Bearer ' + cfg.key,
    'Content-Type': 'application/json',
  };
}

function eq(name, value) {
  return name + '=eq.' + encodeURIComponent(String(value));
}

async function select(table, query) {
  const cfg = requireConfig();
  const res = await fetch(
    cfg.url + '/rest/v1/' + table + '?select=*' + (query ? '&' + query : ''),
    { headers: headers() }
  );
  if (!res.ok) {
    const err = new Error('dbSelect:' + res.status);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

async function insert(table, row) {
  const cfg = requireConfig();
  const res = await fetch(cfg.url + '/rest/v1/' + table, {
    method: 'POST',
    headers: Object.assign(headers(), { Prefer: 'return=representation' }),
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    const err = new Error('dbInsert:' + res.status);
    err.status = res.status;
    throw err;
  }
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}

async function update(table, query, patch) {
  const cfg = requireConfig();
  const res = await fetch(cfg.url + '/rest/v1/' + table + '?' + query, {
    method: 'PATCH',
    headers: Object.assign(headers(), { Prefer: 'return=representation' }),
    body: JSON.stringify(patch),
  });
  if (!res.ok) {
    const err = new Error('dbUpdate:' + res.status);
    err.status = res.status;
    throw err;
  }
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}

async function remove(table, query) {
  const cfg = requireConfig();
  const res = await fetch(cfg.url + '/rest/v1/' + table + '?' + query, {
    method: 'DELETE',
    headers: headers(),
  });
  if (!res.ok) {
    const err = new Error('dbDelete:' + res.status);
    err.status = res.status;
    throw err;
  }
  return true;
}

module.exports = { config, requireConfig, select, insert, update, remove, eq };