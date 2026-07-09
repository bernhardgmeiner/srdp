import { createRequire } from 'module';
import fs from 'fs'; import path from 'path'; import http from 'http';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');
const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const MIME={html:'text/html',js:'text/javascript',css:'text/css',png:'image/png',json:'application/json',woff2:'font/woff2',svg:'image/svg+xml',xml:'application/xml'};
const srv=http.createServer((q,res)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';try{const d=fs.readFileSync(path.join(ROOT,p));res.writeHead(200,{'Content-Type':MIME[path.extname(p).slice(1)]||'application/octet-stream'});res.end(d);}catch(e){res.writeHead(404);res.end('nf');}});
await new Promise(r=>srv.listen(8155,'127.0.0.1',r));
const browser=await chromium.launch();
const page=await browser.newPage();
await page.goto('http://127.0.0.1:8155/#home',{waitUntil:'load'});
await page.waitForTimeout(400);
if(!(await page.evaluate(()=>!!(window.MWG&&window.MWG.route)))){ for(const f of ['js/data-texttypes.js','js/data-content.js','js/data-practice.js','js/core.js','js/toc.js','js/search.js','js/pages-main.js','js/studyplan.js','js/pages-tools.js','js/selfrating.js','js/pages-extra.js','js/flashcards.js','js/pages-practice.js','js/pages-timer.js','js/boot.js','js/pwa.js']) await page.addScriptTag({url:'/'+f}); await page.waitForTimeout(300); }

const ids=await page.evaluate(()=>Object.keys(window.PAGES));
const ALLOW=/no essay|instead of the essay|no separate language in use|not an essay|rather than an essay|no longer an essay/i;
const PATTERNS=[/essay/i,/language in use/i,/\b400\b/,/~400/,/400[- ]word/i,/two tasks/i,/120 minutes/i];
let hits=[];
for(const id of ids){
  const html=await page.evaluate(async(pid)=>{
    try{localStorage.setItem('mwg_school',JSON.stringify('bhs'));}catch(e){}
    window.MWG.buildNav(); location.hash='#'+pid; window.MWG.route();
    await new Promise(r=>setTimeout(r,40));
    return document.getElementById('main').innerHTML + ' ~~NAV~~ ' + document.getElementById('sidenav').innerHTML;
  }, id);
  for(const re of PATTERNS){
    const rx=new RegExp(re.source, re.flags.includes('g')?re.flags:re.flags+'g'); let h;
    while((h=rx.exec(html))){ const i=h.index; const ctx=html.slice(Math.max(0,i-55),i+55).replace(/\s+/g,' '); if(ALLOW.test(ctx)) continue; hits.push(id+' ['+h[0]+']: …'+ctx+'…'); break; }
  }
}
await browser.close(); srv.close();
console.log('BHS PAGES scanned: '+ids.length);
if(hits.length){ console.log('FORBIDDEN TOKENS FOUND ('+hits.length+'):'); hits.forEach(h=>console.log('  ✗ '+h)); }
else console.log('=== BHS PURITY CLEAN — no essay/400/Language-in-Use tokens ===');
process.exit(hits.length?1:0);
