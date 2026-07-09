/* Setzt die SW-Versionskonstante auf einen Zeitstempel und erneuert die Precache-Liste.
   VOR JEDEM DEPLOY ausführen:  node _dev/bump-sw.mjs */
import fs from 'fs';
import path from 'path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const swPath = path.join(root, 'sw.js');
let sw = fs.readFileSync(swPath, 'utf-8');

/* Version = Zeitstempel */
const version = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
sw = sw.replace(/const VERSION = '[^']*';/, `const VERSION = '${version}';`);

/* Asset-Liste neu aufbauen: index, css, manifest, icons, js, fonts */
const list = ['/', 'index.html', 'css/main.css', 'manifest.json'];
for (const dir of ['icons', 'js', 'fonts']) {
  for (const f of fs.readdirSync(path.join(root, dir)).sort()) {
    if (/\.(png|js|woff2|css)$/.test(f)) list.push(dir + '/' + f);
  }
}
/* Prerenderte Sektionsseiten (Ordner mit index.html) fuer Offline-Deep-Links */
for (const d of fs.readdirSync(root, { withFileTypes: true })) {
  if (d.isDirectory() && !d.name.startsWith('_') && !d.name.startsWith('.') && fs.existsSync(path.join(root, d.name, 'index.html'))) {
    list.push(d.name + '/');
  }
}
/* PDFs + OG-Bild offline verfuegbar */
if (fs.existsSync(path.join(root, 'pdf'))) {
  for (const f of fs.readdirSync(path.join(root, 'pdf')).sort()) { if (/\.pdf$/.test(f)) list.push('pdf/' + f); }
}
if (fs.existsSync(path.join(root, 'og-image.png'))) list.push('og-image.png');
const block = "/* @assets:start (von bump-sw.mjs generiert) */\nconst ASSETS = [\n" +
  list.map(a => `  '${a}'`).join(',\n') + "\n];\n/* @assets:end */";
sw = sw.replace(/\/\* @assets:start[\s\S]*?@assets:end \*\//, block);

fs.writeFileSync(swPath, sw);
console.log('sw.js: VERSION=' + version + ', ' + list.length + ' Assets im Precache');
