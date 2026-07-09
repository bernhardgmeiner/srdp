import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import http from 'http';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');
const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const PORT = 8131;
const MIME = { html:'text/html', js:'text/javascript', css:'text/css', png:'image/png', json:'application/json', woff2:'font/woff2', pdf:'application/pdf', xml:'application/xml', txt:'text/plain', svg:'image/svg+xml' };
const srv = http.createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); if(p.endsWith('/'))p+='index.html'; try{const d=fs.readFileSync(path.join(ROOT,p)); res.writeHead(200,{'Content-Type':MIME[path.extname(p).slice(1)]||'application/octet-stream'}); res.end(d);}catch(e){res.writeHead(404);res.end('nf');} });
await new Promise(r=>srv.listen(PORT,'127.0.0.1',r));
const args = process.argv.slice(2);
const targets = args.length ? args : ['leaflet','topicvocab'];
const FILE = { phrasebank:'phrase-bank', topicvocab:'topic-vocabulary' };
const browser = await chromium.launch();
const base='http://127.0.0.1:'+PORT;
const page = await browser.newPage({ viewport:{width:900,height:1200} });
await page.goto(base+'/#home',{waitUntil:'load'}); await page.waitForTimeout(500);
if(!(await page.evaluate(()=>!!(window.MWG&&window.MWG.route)))){
  for (const f of ["js/data-texttypes.js","js/data-content.js","js/data-practice.js","js/core.js","js/toc.js","js/search.js","js/pages-main.js","js/studyplan.js","js/pages-tools.js","js/selfrating.js","js/pages-extra.js","js/flashcards.js","js/pages-practice.js","js/pages-timer.js","js/boot.js","js/pwa.js"]) { await page.addScriptTag({url:'/'+f}); } await page.waitForTimeout(300);
}
for(const id of targets){
  const school=await page.evaluate(i=>{const t=(window.SRDP&&SRDP.textTypes||[]).find(x=>x.id===i);return (t&&t.schools&&t.schools.indexOf('ahs')<0)?t.schools[0]:'ahs';},id);
  await page.evaluate(function(a){
    try{localStorage.setItem('mwg_school',JSON.stringify(a.school));}catch(e){}
    var ch=document.getElementById('schoolChooser'); if(ch) ch.remove();
    if(window.MWG&&window.MWG.buildNav) window.MWG.buildNav();
    location.hash='#'+a.id;
  },{id:id,school:school});
  await page.waitForTimeout(400); /* let hashchange->route settle */
  await page.evaluate(function(){
    var ch=document.getElementById('schoolChooser'); if(ch) ch.remove();
    document.querySelectorAll('.acc-item').forEach(function(e){e.classList.add('open');});
    document.querySelectorAll('.acc-head').forEach(function(b){b.setAttribute('aria-expanded','true');});
  });
  await page.waitForTimeout(200);
  const chooser=await page.evaluate(()=>!!document.getElementById('schoolChooser'));
  const openN=await page.evaluate(()=>document.querySelectorAll('.acc-item.open').length);
  await page.emulateMedia({media:'print'});
  await page.screenshot({path:'/tmp/'+id+'_print.png', fullPage:true});
  const name=(FILE[id]||id)+'.pdf';
  await page.pdf({ path:path.join(ROOT,'pdf',name), format:'A4', printBackground:true, margin:{top:'14mm',bottom:'16mm',left:'12mm',right:'12mm'} });
  await page.emulateMedia({media:'screen'});
  const kb=Math.round(fs.statSync(path.join(ROOT,'pdf',name)).size/1024);
  console.log('pdf/'+name+' ('+school+', '+kb+' KB, chooser='+chooser+', accOpen='+openN+')');
}
await browser.close(); srv.close();
