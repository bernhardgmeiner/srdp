import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import http from 'http';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');
const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const BASE = 'https://matura.bernhardgmeiner.com';

const MIME = { html: 'text/html', js: 'text/javascript', css: 'text/css', png: 'image/png', json: 'application/json', woff2: 'font/woff2', pdf: 'application/pdf', xml: 'application/xml', txt: 'text/plain' };
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const file = path.join(ROOT, p);
  try {
    const data = fs.readFileSync(file);
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).slice(1)] || 'application/octet-stream' });
    res.end(data);
  } catch (e) { res.writeHead(404); res.end('nf'); }
});
await new Promise(r => srv.listen(8123, '127.0.0.1', r));

const shell = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf-8');
const absShell = shell
  .replace(/href="css\//g, 'href="/css/')
  .replace(/src="js\//g, 'src="/js/')
  .replace(/href="manifest\.json"/g, 'href="/manifest.json"')
  .replace(/href="icons\//g, 'href="/icons/')
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://127.0.0.1:8123/#home', { waitUntil: 'load' });
await page.waitForTimeout(500);
/* In diesem headless-Build fuehrt das defer-Script boot.js nicht immer aus.
   Falls MWG.route fehlt, boot.js-Quelle holen und ausfuehren (idempotent genug). */
const hasRoute = await page.evaluate(() => !!(window.MWG && window.MWG.route));
if (!hasRoute) {
  for (const f of ["js/data-texttypes.js","js/data-content.js","js/data-practice.js","js/core.js","js/toc.js","js/search.js","js/pages-main.js","js/studyplan.js","js/pages-tools.js","js/selfrating.js","js/pages-extra.js","js/flashcards.js","js/pages-practice.js","js/pages-timer.js","js/pages-rating.js","js/boot.js","js/pwa.js"]) { await page.addScriptTag({ url: '/' + f }); }
  await page.waitForTimeout(300);
}

const ids = await page.evaluate(() => Object.keys(window.PAGES).filter(id => id !== 'home'));
const idSchool = await page.evaluate(() => {
  const types = (window.SRDP && SRDP.textTypes) || [];
  const map = {};
  Object.keys(window.PAGES).forEach(function (id) {
    const t = types.find(function (x) { return x.id === id; });
    map[id] = (t && t.schools && t.schools.indexOf('ahs') < 0) ? t.schools[0] : 'ahs';
  });
  return map;
});

const urls = [BASE + '/'];
for (const id of ids) {
  const school = idSchool[id] || 'ahs';
  await page.evaluate(function (args) {
    try { localStorage.setItem('mwg_school', JSON.stringify(args.school)); } catch (e) {}
    window.MWG.buildNav();
    location.hash = '#' + args.id;
    window.MWG.route();
  }, { id: id, school: school });
  await page.waitForTimeout(220);
  let main = await page.evaluate(() => document.getElementById('main').innerHTML);
  const title = await page.evaluate(() => document.title);
  const lead = await page.evaluate(() => { const l = document.querySelector('#main .lead'); return l ? l.textContent.trim() : ''; });
  const navHtml = (await page.evaluate(() => document.getElementById('sidenav').innerHTML)).replace(/href="#([a-z]+)"/g, 'href="/$1/"');
  main = main.replace(/href="#([a-z]+)"/g, 'href="/$1/"').split('href="pdf/').join('href="/pdf/');
  const desc = (lead || 'Part of the free interactive B2 writing guide for the English Matura (AHS & BHS).').replace(/"/g, '&quot;').slice(0, 158);
  const out = absShell
    .replace(/<main id="main" tabindex="-1"><\/main>/, '<main id="main" tabindex="-1">' + main + '</main>')
    .replace(/<nav id="sidenav" aria-label="Main navigation"><\/nav>/, '<nav id="sidenav" aria-label="Main navigation">' + navHtml + '</nav>')
    .replace(/<title>[^<]*<\/title>/, '<title>' + title.replace(/</g, '&lt;') + '</title>')
    .replace(/(<meta name="description" content=")[^"]*(">)/, '$1' + desc + '$2')
    .replace(/(<link rel="canonical" href=")[^"]*(">)/, '$1' + BASE + '/' + id + '/$2')
    .replace(/(<meta property="og:url" content=")[^"]*(">)/, '$1' + BASE + '/' + id + '/$2')
    .replace(/(<meta property="og:title" content=")[^"]*(">)/, '$1' + title.replace(/"/g, '&quot;') + '$2');
  fs.mkdirSync(path.join(ROOT, id), { recursive: true });
  fs.writeFileSync(path.join(ROOT, id, 'index.html'), out);
  urls.push(BASE + '/' + id + '/');
  console.log('prerendered /' + id + '/ (' + school + ', ' + Math.round(out.length / 1024) + ' KB)');
}
await browser.close();
srv.close();

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(u => '  <url><loc>' + u + '</loc></url>').join('\n') + '\n</urlset>\n');
console.log('sitemap.xml: ' + urls.length + ' URLs');
