import { createRequire } from 'module';
import fs from 'fs'; import path from 'path'; import http from 'http';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');
const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const MIME = { html:'text/html', js:'text/javascript', css:'text/css', png:'image/png', json:'application/json', woff2:'font/woff2', pdf:'application/pdf', xml:'application/xml', txt:'text/plain', svg:'image/svg+xml' };
const srv = http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  try { const d = fs.readFileSync(path.join(ROOT,p)); res.writeHead(200,{'Content-Type':MIME[path.extname(p).slice(1)]||'application/octet-stream'}); res.end(d); }
  catch(e){ res.writeHead(404); res.end('nf'); }
});
await new Promise(r=>srv.listen(8140,'127.0.0.1',r));

const errors = [];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport:{width:1440,height:900} });
page.on('console', m => { if (m.type()==='error') errors.push('CONSOLE: '+m.text()); });
page.on('pageerror', e => errors.push('PAGEERROR: '+e.message));
page.on('requestfailed', r => { const u=r.url(); if (/favicon|data:/.test(u)) return; errors.push('REQFAIL: '+u+' '+((r.failure()&&r.failure().errorText)||'')); });

await page.goto('http://127.0.0.1:8140/#home', { waitUntil:'load' });
await page.waitForTimeout(500);
const hasRoute = await page.evaluate(()=>!!(window.MWG&&window.MWG.route));
if (!hasRoute) errors.push('BOOT: MWG.route missing after load (defer scripts did not run)');

// CSP proof: stylesheet + fonts actually applied
const fontOk = await page.evaluate(()=>getComputedStyle(document.body).fontFamily.indexOf('Plex')>=0);
if (!fontOk) errors.push('CSS/FONT: IBM Plex not applied (CSP may have blocked stylesheet/font)');

const ids = await page.evaluate(()=>Object.keys(window.PAGES));
const idSchool = await page.evaluate(()=>{ const t=(window.SRDP&&SRDP.textTypes)||[]; const m={}; Object.keys(window.PAGES).forEach(id=>{ const x=t.find(z=>z.id===id); m[id]=(x&&x.schools&&x.schools.indexOf('ahs')<0)?x.schools[0]:'ahs'; }); return m; });

const results = [];
for (const id of ids) {
  const school = idSchool[id]||'ahs';
  const r = await page.evaluate(async (a)=>{
    try { localStorage.setItem('mwg_school', JSON.stringify(a.school)); } catch(e){}
    window.MWG.buildNav(); location.hash='#'+a.id; window.MWG.route();
    await new Promise(res=>setTimeout(res,50));
    const m=document.getElementById('main');
    return { len:(m?m.innerHTML.length:0), active:(document.querySelector('#sidenav .nav-item.active')||{}).dataset?document.querySelector('#sidenav .nav-item.active').dataset.nav:null };
  }, { id, school });
  results.push(id+':'+school+':'+r.len);
  if (r.len < 400) errors.push('EMPTY: #'+id+' ('+school+') main.len='+r.len);
}

// nav gating
const nav = await page.evaluate(()=>{ const o={}; ['ahs','bhs'].forEach(s=>{ try{localStorage.setItem('mwg_school',JSON.stringify(s));}catch(e){} window.MWG.buildNav(); o[s]=document.getElementById('sidenav').innerHTML; }); return o; });
if (/data-nav="leaflet"/.test(nav.ahs)) errors.push('NAV: leaflet visible in AHS');
if (/data-nav="essay"/.test(nav.bhs))  errors.push('NAV: essay visible in BHS');
if (!/data-nav="essay"/.test(nav.ahs)) errors.push('NAV: essay missing in AHS');
if (!/data-nav="leaflet"/.test(nav.bhs)) errors.push('NAV: leaflet missing in BHS');

// deep-link guard: hidden type redirects to home
const g = await page.evaluate(()=>{ try{localStorage.setItem('mwg_school',JSON.stringify('bhs'));}catch(e){} window.MWG.buildNav(); location.hash='#essay'; window.MWG.route(); const a=document.querySelector('#sidenav .nav-item.active'); return a?a.dataset.nav:'(none)'; });
if (g!=='home') errors.push('GUARD: #essay under BHS did not redirect home (active='+g+')');

// school-switch via setSchool exercises state-reset path
const sw = await page.evaluate(()=>{ try{ window.MWG.setSchool('bhs'); window.MWG.setSchool('ahs'); location.hash='#home'; window.MWG.route(); return document.getElementById('main').innerHTML.length; }catch(e){ return 'THREW:'+e.message; } });
if (typeof sw!=='number' || sw<400) errors.push('SETSCHOOL: switch path failed ('+sw+')');

// timer interaction: start must count down, no errors
function _toSec(t){const p=(t||'').split(':');return p.length===2?(+p[0])*60+(+p[1]):NaN;}
const timer = await page.evaluate(async ()=>{
  try{ localStorage.setItem('mwg_school', JSON.stringify('bhs')); }catch(e){}
  window.MWG.buildNav(); location.hash='#timer'; window.MWG.route();
  await new Promise(r=>setTimeout(r,60));
  const before=(document.getElementById('mockClock')||{}).textContent;
  const btn=document.getElementById('mockStart'); if(!btn) return {ok:false,why:'no start button'};
  btn.click(); await new Promise(r=>setTimeout(r,1300));
  const after=(document.getElementById('mockClock')||{}).textContent;
  const b2=document.getElementById('mockStart'); if(b2) b2.click();
  return {ok:true,before:before,after:after};
});
if(!timer.ok) errors.push('TIMER: '+timer.why);
else { const b=_toSec(timer.before), a=_toSec(timer.after); if(!(a<b)) errors.push('TIMER: no countdown ('+timer.before+' -> '+timer.after+')'); }

await browser.close(); srv.close();
const csp = errors.filter(e=>/Content Security|Refused to|violates/i.test(e));
console.log('ROUTES('+results.length+'): '+results.join('  '));
console.log('CSP-VIOLATIONS: '+csp.length+'   TOTAL-ERRORS: '+errors.length);
errors.forEach(e=>console.log('  X '+e));
console.log(errors.length===0 ? '=== VERIFY PASS ===' : '=== VERIFY FAIL ===');
process.exit(errors.length===0?0:1);
