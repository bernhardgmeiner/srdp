/* Rendert og-template.html zu og-image.png (1200×630).
   Aufruf aus dem Projektroot: NODE_PATH=… node _dev/make-og.mjs */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await p.goto('file://' + process.cwd() + '/og-template.html');
await p.waitForTimeout(400); /* Fonts laden */
await p.screenshot({ path: 'og-image.png' });
await b.close();
console.log('og-image.png geschrieben');
