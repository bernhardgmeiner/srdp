import { createRequire } from 'module';
import fs from 'fs'; import path from 'path'; import http from 'http';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');
const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const MIME={html:'text/html',js:'text/javascript',css:'text/css',png:'image/png',json:'application/json',woff2:'font/woff2',svg:'image/svg+xml',xml:'application/xml'};
const srv=http.createServer((q,res)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';try{const d=fs.readFileSync(path.join(ROOT,p));res.writeHead(200,{'Content-Type':MIME[path.extname(p).slice(1)]||'application/octet-stream'});res.end(d);}catch(e){res.writeHead(404);res.end('nf');}});
await new Promise(r=>srv.listen(8162,'127.0.0.1',r));
const browser=await chromium.launch(); const page=await browser.newPage();
await page.goto('http://127.0.0.1:8162/#home',{waitUntil:'load'}); await page.waitForTimeout(400);
if(!(await page.evaluate(()=>!!(window.MWG&&window.MWG.route)))){ for(const f of ['js/data-texttypes.js','js/data-content.js','js/data-practice.js','js/core.js','js/toc.js','js/search.js','js/pages-main.js','js/studyplan.js','js/pages-tools.js','js/selfrating.js','js/pages-extra.js','js/flashcards.js','js/pages-practice.js','js/pages-timer.js','js/boot.js','js/pwa.js']) await page.addScriptTag({url:'/'+f}); await page.waitForTimeout(300); }
const problems=[];

// ---- QUIZ INTEGRITY ----
problems.push(...await page.evaluate(()=>{
  const out=[]; const chk=(name,arr)=>{ if(!Array.isArray(arr))return; arr.forEach((q,i)=>{
    const o=q.options||[]; const id=name+'#'+i;
    if(!q.q) out.push('QUIZ '+id+' empty question');
    if(o.length<2) out.push('QUIZ '+id+' <2 options');
    if(typeof q.correct!=='number'||q.correct<0||q.correct>=o.length) out.push('QUIZ '+id+' bad correct='+q.correct+' ('+o.length+' opts): '+q.q);
    if(new Set(o).size!==o.length) out.push('QUIZ '+id+' duplicate option: '+q.q);
    if(!q.explanation) out.push('QUIZ '+id+' no explanation: '+q.q);
  });};
  const Q=(window.SRDP&&SRDP.quizzes)||{}; Object.keys(Q).forEach(k=>chk('quizzes.'+k,Q[k])); chk('finalQuiz',SRDP.finalQuiz);
  return out;
}));

// ---- PURITY (both schools) + LINK INTEGRITY ----
const FORB={ ahs:[/leaflet/i,/broschüre/i,/\b195\b/,/three tasks/i], bhs:[/essay/i,/aufsatz/i,/language in use/i,/\b400\b/,/~400/,/400[- ]word/i,/two tasks/i,/120 minutes/i,/long or short task/i,/the short task/i,/the long task/i] };
const ALLOW={ ahs:/at bhs|for bhs|bhs students|no leaflet|unlike|switch to bhs|auf bhs/i, bhs:/no essay|instead of the essay|no separate language in use|not an essay|rather than an essay/i };
const ids=await page.evaluate(()=>Object.keys(window.PAGES));
for(const school of ['ahs','bhs']){
  for(const id of ids){
    const d=await page.evaluate(async(a)=>{
      try{localStorage.setItem('mwg_school',JSON.stringify(a.school));}catch(e){}
      window.MWG.buildNav(); location.hash='#'+a.id; window.MWG.route(); await new Promise(r=>setTimeout(r,30));
      const html=document.getElementById('main').innerHTML+' ~NAV~ '+document.getElementById('sidenav').innerHTML;
      const links=[...html.matchAll(/href="#([a-z]+)"/g)].map(m=>m[1]);
      const typeSchools=(window.SRDP.textTypes||[]).filter(t=>t.schools).reduce((o,t)=>{o[t.id]=t.schools;return o;},{});
      return {html,links,pages:Object.keys(window.PAGES),typeSchools};
    },{school,id});
    for(const re of FORB[school]){ const rx=new RegExp(re.source,re.flags.includes('g')?re.flags:re.flags+'g'); let h;
      while((h=rx.exec(d.html))){ const i=h.index; const ctx=d.html.slice(Math.max(0,i-48),i+48).replace(/\s+/g,' '); if(ALLOW[school].test(ctx)){continue;} problems.push('PURITY '+school+'/'+id+' ['+h[0]+']: …'+ctx+'…'); break; } }
    const seen=new Set();
    for(const t of d.links){ if(seen.has(t))continue; seen.add(t);
      if(t==='main'||t==='top')continue;
      if(d.pages.indexOf(t)<0){ problems.push('LINK '+school+'/'+id+' -> #'+t+' (no such page)'); continue; }
      const sc=d.typeSchools[t]; if(sc&&sc.indexOf(school)<0) problems.push('LINK '+school+'/'+id+' -> #'+t+' (hidden for '+school+')'); }
  }
}
await browser.close(); srv.close();
console.log('AUDIT problems: '+problems.length);
problems.forEach(p=>console.log('  ✗ '+p));
process.exit(problems.length?1:0);
