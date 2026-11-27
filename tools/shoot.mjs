// Screenshots of the real site: serves app/ locally, opens it in headless Chrome over the DevTools protocol at a
// desktop or a phone size with a URL hash (a filter, a search or an open deal), waits for the page to be ready and
// saves a JPEG. node tools/shoot.mjs <chrome.exe> <out dir> name@WxH=#hash [...]

import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join, extname, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';

const [chrome, outDir, ...specs] = process.argv.slice(2);
const root = resolve(new URL('../app', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };
const server = createServer((req, res) => {
  let path = join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(path) && statSync(path).isDirectory()) path = join(path, 'index.html');
  if (!path.startsWith(root) || !existsSync(path)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': types[extname(path)] ?? 'application/octet-stream' });
  res.end(readFileSync(path));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const debugPort = 9500 + (process.pid % 200);
const proc = spawn(chrome, ['--headless=new', `--remote-debugging-port=${debugPort}`, `--user-data-dir=${join(tmpdir(), `lowball-shoot-${process.pid}`)}`, '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
let targets;
for (let i = 0; i < 60 && !targets; i++) { try { targets = await (await fetch(`http://127.0.0.1:${debugPort}/json`)).json(); } catch { await new Promise((r) => setTimeout(r, 250)); } }
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0;
const waiting = new Map();
const errors = [];
ws.addEventListener('message', (m) => {
  const msg = JSON.parse(m.data);
  if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails.exception?.description ?? msg.params.exceptionDetails.text);
  if (msg.id && waiting.has(msg.id)) { waiting.get(msg.id)(msg); waiting.delete(msg.id); }
});
const send = (method, params = {}) => new Promise((r) => { const n = ++id; waiting.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
await send('Runtime.enable');
mkdirSync(outDir, { recursive: true });
for (const spec of specs) {
  const eq = spec.indexOf('=');
  const [name, size] = spec.slice(0, eq).split('@');
  const hash = spec.slice(eq + 1);
  const [w, h] = size.split('x').map(Number);
  const phone = w < 600;
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: phone });
  await send('Page.navigate', { url: `http://127.0.0.1:${server.address().port}/index.html?v=${id}${hash}` });
  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 200));
    const r = await send('Runtime.evaluate', { expression: 'document.documentElement.dataset.ready' });
    if (r.result?.result?.value === '1') break;
  }
  if (phone && hash.includes('filters')) await send('Runtime.evaluate', { expression: "document.body.classList.add('filters-open')" });
  await new Promise((r) => setTimeout(r, 300));
  const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 84, clip: { x: 0, y: 0, width: w, height: h, scale: 1 } });
  const bytes = Buffer.from(shot.result.data, 'base64');
  writeFileSync(join(outDir, `${name}.jpg`), bytes);
  console.log(name, `${w}x${h}`, hash, bytes.length);
}
console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'no page exceptions');
ws.close();
proc.kill();
server.close();
