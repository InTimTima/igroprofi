const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const root = __dirname;
const port = process.env.PORT || 8765;

loadEnvFile();

function loadEnvFile() {
  const envPath = path.join(root, '.env');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith(';')) return;
    const eq = trimmed.indexOf('=');
    if (eq === -1) return;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  });
}

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
};

function serveStatic(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  });
}

async function handleApi(req, res, name) {
  const modPath = path.join(root, 'api', name + '.js');
  if (!fs.existsSync(modPath)) {
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: false, error: 'notFound' }));
    return;
  }

  let handler;
  try {
    handler = require(modPath);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: false, error: String(err && err.message) }));
    return;
  }

  req.query = Object.fromEntries(new URL(req.url, 'http://localhost').searchParams.entries());

  try {
    req.body = await readBodyJson(req);
  } catch (err) {
    req.body = {};
  }

  Promise.resolve(handler(req, res)).catch((err) => {
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: String(err && err.message) }));
    }
  });
  req.on('error', () => {});
}

function readBodyJson(req) {
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1e6) {
        resolve({});
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);

  const apiMatch = urlPath.match(/^\/api\/([^/]+)$/);
  if (apiMatch) {
    handleApi(req, res, apiMatch[1].replace(/\.js$/, ''));
    return;
  }

  let filePath = path.join(root, urlPath);
  if (urlPath.endsWith('/')) filePath = path.join(filePath, 'index.html');

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      serveStatic(res, path.join(filePath, 'index.html'));
      return;
    }
    serveStatic(res, filePath);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`http://127.0.0.1:${port}/`);
});