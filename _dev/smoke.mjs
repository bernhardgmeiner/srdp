#!/usr/bin/env node
/* Smoke-Test für matura.bernhardgmeiner.com
   Aufruf:  node _dev/smoke.mjs --base http://localhost:8000 --pages home,essay,phrasebank --out /tmp/shots [--tour] [--fast]
   Macht pro Seite Screenshots (1440px + 390px, light + dark), sammelt Konsolenfehler,
   prüft Theme-Toggle, Hash-Routing und localStorage-Robustheit. --tour klickt die Tour komplett durch.
   Benötigt playwright-core (NODE_PATH oder lokales node_modules). */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');

const arg = (name, dflt) => {
  const i = process.argv.indexOf('--' + name);
  return i === -1 ? dflt : (process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : true);
};
const BASE = arg('base', 'http://localhost:8000');
const PAGES = String(arg('pages', 'home,essay,phrasebank')).split(',');
const OUT = arg('out', '/tmp/shots');
const DO_TOUR = !!arg('tour', false);
const FAST = !!arg('fast', false); // nur 1440 light

const fs = await import('fs');
fs.mkdirSync(OUT, { recursive: true });

const errors = [];
const browser = await chromium.launch();
const mk = async (w, h) => {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  return ctx;
};

const variants = FAST
  ? [['1440', 1440, 900, 'light']]
  : [['1440', 1440, 900, 'light'], ['1440', 1440, 900, 'dark'], ['390', 390, 844, 'light'], ['390', 390, 844, 'dark']];

for (const [label, w, h, theme] of variants) {
  const ctx = await mk(w, h);
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') errors.push(`[${label}/${theme}] console: ${m.text().slice(0, 200)}`); });
  page.on('pageerror', e => errors.push(`[${label}/${theme}] pageerror: ${String(e).slice(0, 200)}`));
  await page.goto(BASE + '/#home', { waitUntil: 'load' });
  await page.evaluate(t => { try { localStorage.setItem('mwg_theme', JSON.stringify(t)); } catch (e) {} }, theme);
  for (const id of PAGES) {
    await page.evaluate(id => { location.hash = '#' + (id === 'home' ? 'home' : id); }, id);
    await page.reload({ waitUntil: 'load' });
    await page.waitForTimeout(350);
    await page.screenshot({ path: `${OUT}/${id}-${label}-${theme}.png`, fullPage: false });
  }
  await ctx.close();
}

/* Funktions-Checks auf Desktop light */
const ctx = await mk(1440, 900);
const page = await ctx.newPage();
page.on('pageerror', e => errors.push('check pageerror: ' + String(e).slice(0, 200)));
page.on('console', m => { if (m.type() === 'error') errors.push('check console: ' + m.text().slice(0, 200)); });
await page.goto(BASE + '/#home', { waitUntil: 'load' });

/* Migration: alte mwg_-Daten dürfen keinen Fehler werfen */
await page.evaluate(() => {
  localStorage.setItem('mwg_progress', JSON.stringify({ essay: { visited: true, quiz: true } }));
  localStorage.setItem('mwg_theme', '"light"');
});
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(250);

/* Theme-Toggle */
const themeOk = await page.evaluate(() => {
  const before = document.documentElement.getAttribute('data-theme');
  document.getElementById('themeToggle').click();
  const after = document.documentElement.getAttribute('data-theme');
  document.getElementById('themeToggle').click();
  return before !== after;
});
if (!themeOk) errors.push('theme toggle broken');

/* Hash-Routing */
await page.evaluate(() => { location.hash = '#essay'; });
await page.waitForTimeout(250);
const routeOk = await page.evaluate(() => document.title.startsWith('Essay'));
if (!routeOk) errors.push('hash routing broken (essay)');

/* Nav-Häkchen aus Progress */
const checkOk = await page.evaluate(() => document.querySelector('[data-check="essay"]').textContent.includes('✓'));
if (!checkOk) errors.push('progress checkmark broken');

/* PDF-Links vorhanden */
await page.evaluate(() => { location.hash = '#overview'; });
await page.waitForTimeout(250);
const pdfHref = await page.evaluate(() => { const a = document.querySelector('a[href^="pdf/"]'); return a ? a.getAttribute('href') : null; });
if (!pdfHref) errors.push('pdf link missing on overview');
else {
  const resp = await page.request.head(BASE + '/' + pdfHref).catch(() => null);
  if (!resp || !resp.ok()) errors.push('pdf HEAD failed: ' + pdfHref);
}

/* Tour */
if (DO_TOUR) {
  await page.evaluate(() => { location.hash = '#home'; });
  await page.waitForTimeout(250);
  await page.click('[data-action="start-tour"]');
  for (let i = 0; i < 30; i++) {
    await page.waitForTimeout(120);
    const btn = await page.$('#tourCard [data-action="tour-next"]');
    if (!btn) break;
    const done = await page.evaluate(() => document.querySelector('#tourCard [data-action="tour-next"]').textContent.trim() === 'Done');
    await btn.click();
    if (done) break;
  }
  const tourClosed = await page.evaluate(() => { const c = document.getElementById('tourCard'); return !c || c.style.display === 'none'; });
  if (!tourClosed) errors.push('tour did not close after Done');
}

await ctx.close();
await browser.close();

if (errors.length) { console.error('SMOKE FAIL\n' + errors.join('\n')); process.exit(1); }
console.log('SMOKE OK — pages: ' + PAGES.join(', ') + (DO_TOUR ? ' + tour' : ''));
