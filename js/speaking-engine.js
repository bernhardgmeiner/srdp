/* ════════════════════════════════════════════════════════════
   Speaking – engine (no pages here)
   Clock with phases and marks · microphone recording (MediaRecorder) ·
   loudness series for pauses and the waveform · player · local storage
   of kept recordings (IndexedDB) · charts and task cards.
   Nothing in this file sends data anywhere. Recordings exist as Blobs in
   memory and, only if the user chooses "Keep", in IndexedDB on the device.
   Not used on purpose: SpeechRecognition, speechSynthesis, WebRTC, fetch.
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { esc } = M;
const SP = {};
M.SP = SP;

SP.data = () => (window.SRDP && SRDP.speaking) || null;
SP.fmt = function (sec) {
  sec = Math.max(0, Math.floor(sec));
  return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0');
};
SP.today = function () { const d = new Date(), z = n => String(n).padStart(2, '0'); return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate()); };

/* ─── settings (localStorage, keys mwg_sp_*) ──────────────── */
SP.prepMinutes = function () {
  const d = SP.data(); const opts = d ? d.timing.prepOptions : [10];
  const v = M.store('mwg_sp_prep');
  if (opts.indexOf(v) >= 0) return v;
  return (M.school && M.school() === 'bhs') ? 20 : (d ? d.timing.prepDefault : 10);
};
SP.setPrepMinutes = v => M.store('mwg_sp_prep', v);
SP.soundOn = () => M.store('mwg_sp_sound') === true;
SP.setSound = v => M.store('mwg_sp_sound', !!v);

/* history of used tasks: { taskId: 'YYYY-MM-DD' } */
SP.history = () => { const h = M.store('mwg_sp_hist'); return (h && typeof h === 'object') ? h : {}; };
SP.markUsed = function (id) { const h = SP.history(); h[id] = SP.today(); M.store('mwg_sp_hist', h); };
/* least recently used first, unused ones in random order before the used ones */
SP.pickFresh = function (items) {
  const h = SP.history();
  const sh = M.shuffle(items);
  sh.sort((a, b) => (h[a.id] || '') < (h[b.id] || '') ? -1 : (h[a.id] || '') > (h[b.id] || '') ? 1 : 0);
  return sh[0];
};
SP.topic = id => SP.data().topics.find(t => t.id === id);

/* ─── clock ───────────────────────────────────────────────── */
/* Timestamp-based, so it stays exact when the tab sleeps.
   opts: { duration (s, where the clock "ends"), max (s, hard stop, optional),
           marks: [s…], onTick(elapsed), onMark(s), onEnd(), onMax() } */
SP.clock = function (opts) {
  let startAt = 0, base = 0, running = false, iv = null, ended = false, maxed = false;
  const fired = {};
  const now = () => (window.performance && performance.now) ? performance.now() : Date.now();
  const c = {
    elapsed() { return base + (running ? (now() - startAt) / 1000 : 0); },
    running() { return running; },
    start() { if (running) return; startAt = now(); running = true; iv = setInterval(tick, 200); tick(); },
    pause() { if (!running) return; base = c.elapsed(); running = false; clearInterval(iv); iv = null; },
    stop() { c.pause(); document.removeEventListener('visibilitychange', vis); },
  };
  function tick() {
    const e = c.elapsed();
    (opts.marks || []).forEach(m => { if (e >= m && !fired[m]) { fired[m] = true; if (opts.onMark) opts.onMark(m); } });
    if (opts.duration && e >= opts.duration && !ended) { ended = true; if (opts.onEnd) opts.onEnd(); }
    if (opts.max && e >= opts.max && !maxed) { maxed = true; if (opts.onMax) opts.onMax(); }
    if (opts.onTick) opts.onTick(e);
  }
  function vis() { if (running && !document.hidden) tick(); }
  document.addEventListener('visibilitychange', vis);
  return c;
};

/* One AudioContext for the whole page. iOS only lets it run after a tap, so SP.prime()
   is called from click handlers; later recordings (also ones that start by themselves
   after a countdown) can then read the microphone level. */
let actx = null;
SP.audio = function () {
  if (actx && actx.state !== 'closed') return actx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  try { actx = new AC(); } catch (e) { actx = null; }
  return actx;
};
SP.prime = function () { const c = SP.audio(); if (c && c.state === 'suspended' && c.resume) { try { c.resume(); } catch (e) {} } };

/* short signal at a mark: sound only if switched on, vibration where the device has it */
SP.signal = function () {
  if (!SP.soundOn()) return;
  try { if (navigator.vibrate) navigator.vibrate(180); } catch (e) {}
  try {
    const ctx = SP.audio(); if (!ctx || ctx.state !== 'running') return;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = 660; g.gain.value = 0.05;
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.15);
  } catch (e) {}
};

/* ─── screen wake lock ────────────────────────────────────── */
let wakeLock = null, wakeWanted = false, wakePending = false;
SP.wake = function (on) {
  wakeWanted = on;
  if (!on) { if (wakeLock) { try { wakeLock.release(); } catch (e) {} wakeLock = null; } return; }
  if (!('wakeLock' in navigator) || wakeLock || wakePending) return;
  wakePending = true;
  navigator.wakeLock.request('screen').then(l => {
    wakePending = false;
    if (!wakeWanted) { try { l.release(); } catch (e) {} return; }   /* switched off while the request was on its way */
    wakeLock = l; l.addEventListener('release', () => { if (wakeLock === l) wakeLock = null; });
  }, () => { wakePending = false; });
};
document.addEventListener('visibilitychange', () => { if (!document.hidden && wakeWanted && !wakeLock) SP.wake(true); });

/* ─── recording ───────────────────────────────────────────── */
SP.canRecord = () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
function pickMime() {
  /* Safari can write WebM too, but such files do not play in the Files or Voice Memos app
     on an iPhone, so mp4 goes first there. */
  const safari = /Safari|AppleWebKit/.test(navigator.userAgent) && !/Chrome|Chromium|CriOS|Firefox|FxiOS|Edg/.test(navigator.userAgent);
  const c = [['audio/webm;codecs=opus', 'webm'], ['audio/mp4', 'm4a'], ['audio/webm', 'webm'], ['audio/ogg;codecs=opus', 'ogg']];
  if (safari) c.unshift(['audio/mp4', 'm4a']);
  for (const [m, ext] of c) { try { if (MediaRecorder.isTypeSupported(m)) return { mime: m, ext }; } catch (e) {} }
  return { mime: '', ext: 'webm' };
}
/* Starts a recording. Resolves with { stop() → Promise<take>, onInterrupt }.
   take = { blob, url, mime, ext, ms, stats }.  Rejects if the microphone is refused or missing. */
SP.record = function () {
  if (!SP.canRecord()) return Promise.reject(new Error('unsupported'));
  return navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }).then(stream => {
    let siv = null, src = null;
    try {
    const pm = pickMime();
    let rec;
    try { rec = pm.mime ? new MediaRecorder(stream, { mimeType: pm.mime }) : new MediaRecorder(stream); }
    catch (e) { rec = new MediaRecorder(stream); }
    const chunks = [];
    const t0 = Date.now();
    let stopped = null, resolveStop = null;
    /* loudness series: one RMS value every 50 ms, read from the live signal */
    const STEP = 50; const series = [];
    let ctx = null, an = null, buf = null, live = 0, doneTake = null;
    try {
      ctx = SP.audio(); SP.prime();
      an = ctx.createAnalyser(); an.fftSize = 1024;
      src = ctx.createMediaStreamSource(stream); src.connect(an);
      const useFloat = !!an.getFloatTimeDomainData;
      buf = useFloat ? new Float32Array(an.fftSize) : new Uint8Array(an.fftSize);
      siv = setInterval(() => {
        let s = 0;
        if (useFloat) { an.getFloatTimeDomainData(buf); for (let i = 0; i < buf.length; i++) s += buf[i] * buf[i]; }
        else { an.getByteTimeDomainData(buf); for (let i = 0; i < buf.length; i++) { const v = (buf[i] - 128) / 128; s += v * v; } }
        series.push(Math.sqrt(s / buf.length));
        if (ctx.state === 'running') live++;
      }, STEP);
    } catch (e) { ctx = null; }

    const handle = { onInterrupt: null, mime: rec.mimeType || pm.mime };
    function cleanup() {
      if (siv) { clearInterval(siv); siv = null; }
      try { stream.getTracks().forEach(t => t.stop()); } catch (e) {}
      if (src) { try { src.disconnect(); } catch (e) {} src = null; }
      document.removeEventListener('visibilitychange', onHide);
    }
    function finish() {
      if (doneTake) { if (resolveStop) resolveStop(doneTake); return doneTake; }
      const ms = Date.now() - t0;
      cleanup();
      const type = (rec.mimeType || pm.mime || 'audio/webm').split(';')[0];
      const blob = new Blob(chunks, { type });
      const ext = /mp4|aac|m4a/.test(type) ? 'm4a' : /ogg/.test(type) ? 'ogg' : 'webm';
      const take = { blob, url: URL.createObjectURL(blob), mime: type, ext, ms, stats: (series.length > 20 && live > series.length * 0.8) ? SP.stats(series, ms) : null };
      doneTake = take;
      if (resolveStop) resolveStop(take);
      return take;
    }
    rec.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
    rec.onstop = finish;
    rec.onerror = () => { try { if (rec.state !== 'inactive') rec.stop(); } catch (e) { finish(); } };
    handle.stop = function () {
      if (stopped) return stopped;
      stopped = new Promise(res => { resolveStop = res; });
      try { if (rec.state !== 'inactive') rec.stop(); else finish(); } catch (e) { finish(); }
      return stopped;
    };
    /* screen locked or app switched: the browser may cut the microphone, so stop cleanly and keep what we have */
    function onHide() { if (document.hidden && !stopped) { const p = handle.stop(); if (handle.onInterrupt) handle.onInterrupt(p); } }
    document.addEventListener('visibilitychange', onHide);
    rec.start(1000);
    return handle;
    } catch (e) {
      /* the recorder failed after the microphone was granted: let the microphone go again */
      try { stream.getTracks().forEach(t => t.stop()); } catch (e2) {}
      if (siv) clearInterval(siv);
      if (src) { try { src.disconnect(); } catch (e2) {} }
      throw e;
    }
  });
};

/* Loudness series → pauses and waveform. Indicators, not a rating. */
SP.stats = function (series, ms) {
  const n = series.length; const step = ms / n;
  const sorted = Array.prototype.slice.call(series).sort((a, b) => a - b);
  const pct = p => sorted[Math.min(n - 1, Math.floor(n * p))];
  const floor = pct(0.1), peak = pct(0.95);
  if (peak < 0.004) return { silent: true, pauses: [], longest: 0, bars: [], step };
  const thr = Math.max(0.004, floor + (peak - floor) * 0.15);
  const pauses = []; let runStart = -1;
  for (let i = 0; i <= n; i++) {
    const quiet = i < n && series[i] < thr;
    if (quiet && runStart < 0) runStart = i;
    if (!quiet && runStart >= 0) {
      const len = (i - runStart) * step;
      /* only quiet stretches with sound on both sides: the silence before the first word
         and after the last one is not a pause */
      if (len >= 3000 && runStart > 0 && i < n) pauses.push({ s: runStart * step / 1000, e: i * step / 1000 });
      runStart = -1;
    }
  }
  const B = 64, bars = [];
  for (let b = 0; b < B; b++) {
    const a = Math.floor(b * n / B), z = Math.max(a + 1, Math.floor((b + 1) * n / B));
    let s = 0; for (let i = a; i < z; i++) s += series[i];
    bars.push(Math.min(1, (s / (z - a)) / (peak || 1)));
  }
  const longest = pauses.reduce((m, p) => Math.max(m, p.e - p.s), 0);
  return { silent: false, pauses, longest, bars, step };
};

SP.dropTake = function (take) { if (take && take.url) { try { URL.revokeObjectURL(take.url); } catch (e) {} take.url = null; } };
SP.download = function (take, name) {
  if (!take || !take.blob) return;
  const url = URL.createObjectURL(take.blob);
  const a = document.createElement('a');
  a.href = url; a.download = name + '.' + take.ext;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
};
SP.downloadText = function (text, name) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url; a.download = name + '.txt';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
};

/* ─── player ──────────────────────────────────────────────── */
/* Own controls, because recordings from MediaRecorder often carry no length
   and the browser's own bar then shows nonsense. The length comes from our clock. */
SP.playerHTML = function (take, label, opts) {
  opts = opts || {};
  if (!take || !take.url) return '<p class="sp-norec">No recording was made. Answer the questions from memory. If you have a phone, you can also record yourself with its voice memo app.</p>';
  const dur = take.ms / 1000;
  const st = take.stats;
  const bars = (st && st.bars && st.bars.length) ? st.bars : null;
  const wave = bars
    ? bars.map((v, i) => {
        const t = (i + 0.5) / bars.length * dur;
        const inPause = !opts.noPauses && st.pauses.some(p => t >= p.s && t <= p.e);
        return '<i' + (inPause ? ' class="pz"' : '') + ' style="height:' + Math.max(6, Math.round(v * 100)) + '%"></i>';
      }).join('')
    : '<span class="sp-wave-flat"></span>';
  return '<div class="sp-player" data-dur="' + dur.toFixed(2) + '">' +
    '<button type="button" class="sp-play" data-sp="play" aria-label="Play ' + esc(label || 'recording') + '"><span aria-hidden="true">&#9654;</span></button>' +
    '<div class="sp-wave" data-sp="seek" role="slider" tabindex="0" aria-label="Position in the recording" aria-valuemin="0" aria-valuemax="' + Math.round(dur) + '" aria-valuenow="0" aria-valuetext="0:00 of ' + SP.fmt(dur) + '">' + wave + '<b class="sp-pos"></b></div>' +
    '<span class="sp-ptime"><span data-ptime>0:00</span> / ' + SP.fmt(dur) + '</span>' +
    '<audio preload="auto" src="' + take.url + '"></audio>' +
  '</div>';
};
/* wires every player inside root; returns a function that stops them */
SP.wirePlayers = function (root) {
  const players = Array.prototype.slice.call(root.querySelectorAll('.sp-player'));
  players.forEach(pl => {
    if (pl._wired) return; pl._wired = true;
    const au = pl.querySelector('audio'), btn = pl.querySelector('.sp-play'), wave = pl.querySelector('.sp-wave'), pos = pl.querySelector('.sp-pos'), tm = pl.querySelector('[data-ptime]');
    const dur = parseFloat(pl.dataset.dur) || 1;
    let loop = null; /* { a, b } seconds: used by the 30-second exercise */
    pl._setLoop = l => { loop = l; };
    pl._play = () => { const p = au.play(); if (p && p.catch) p.catch(() => {}); };
    pl._pause = () => au.pause();
    /* some browsers report Infinity for recorded files until they have looked at the end once */
    au.addEventListener('loadedmetadata', () => {
      if (au.duration === Infinity || isNaN(au.duration)) {
        const back = () => { au.removeEventListener('timeupdate', back); try { au.currentTime = 0; } catch (e) {} };
        au.addEventListener('timeupdate', back);
        try { au.currentTime = 1e101; } catch (e) {}
      }
    });
    const now = () => Math.min(dur, au.currentTime > 1e6 ? 0 : (au.currentTime || 0));
    function paint() {
      const t = now();
      pos.style.left = (t / dur * 100) + '%';
      tm.textContent = SP.fmt(t);
    }
    /* told to screen readers only when the position was changed or playback stops, not four times a second */
    function tell() { const t = now(); wave.setAttribute('aria-valuenow', Math.round(t)); wave.setAttribute('aria-valuetext', SP.fmt(t) + ' of ' + SP.fmt(dur)); }
    pl._seek = t => { try { au.currentTime = Math.max(0, Math.min(dur - 0.05, t)); } catch (e) {} paint(); tell(); };
    au.addEventListener('timeupdate', () => {
      if (loop && au.currentTime >= loop.b) { au.pause(); try { au.currentTime = loop.a; } catch (e) {} }
      paint();
    });
    const setBtn = playing => { btn.innerHTML = '<span aria-hidden="true">' + (playing ? '&#10073;&#10073;' : '&#9654;') + '</span>'; btn.setAttribute('aria-label', playing ? 'Pause' : 'Play'); btn.classList.toggle('on', playing); };
    au.addEventListener('play', () => { players.forEach(o => { if (o !== pl && o._pause) o._pause(); }); setBtn(true); });
    au.addEventListener('pause', () => { setBtn(false); tell(); });
    au.addEventListener('ended', () => { setBtn(false); tell(); });
    btn.addEventListener('click', () => { if (au.paused) { if (loop && (au.currentTime < loop.a || au.currentTime >= loop.b)) pl._seek(loop.a); pl._play(); } else au.pause(); });
    wave.addEventListener('click', e => { const r = wave.getBoundingClientRect(); pl._seek((e.clientX - r.left) / r.width * dur); });
    wave.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); pl._seek((au.currentTime || 0) + 5); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); pl._seek((au.currentTime || 0) - 5); }
    });
  });
  return function stopAll() { players.forEach(pl => { if (pl._pause) pl._pause(); }); };
};

/* ─── kept recordings (IndexedDB, this device only) ───────── */
const DB = 'mwg-speaking', STORE = 'takes';
function db() {
  return new Promise((res, rej) => {
    if (!window.indexedDB) return rej(new Error('no indexedDB'));
    const rq = indexedDB.open(DB, 1);
    rq.onupgradeneeded = () => { rq.result.createObjectStore(STORE, { keyPath: 'id' }); };
    rq.onsuccess = () => res(rq.result);
    rq.onerror = () => rej(rq.error);
  });
}
function tx(mode, fn) {
  return db().then(d => new Promise((res, rej) => {
    const t = d.transaction(STORE, mode); const out = fn(t.objectStore(STORE));
    t.oncomplete = () => { d.close(); res(out && out.result !== undefined ? out.result : undefined); };
    t.onerror = t.onabort = () => { d.close(); rej(t.error); };
  }));
}
SP.keep = function (take, meta) {
  const rec = { id: meta.taskId + '-' + Date.now(), taskId: meta.taskId, label: meta.label, created: new Date().toISOString(), ms: take.ms, mime: take.mime, ext: take.ext, stats: take.stats, blob: take.blob };
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
  return tx('readwrite', s => s.put(rec)).then(() => rec.id);
};
SP.kept = () => tx('readonly', s => s.getAll()).then(r => (r || []).sort((a, b) => a.created < b.created ? 1 : -1), () => []);
SP.unkeep = id => tx('readwrite', s => s.delete(id));
SP.unkeepAll = () => tx('readwrite', s => s.clear());

/* ─── charts ──────────────────────────────────────────────── */
/* Bars are drawn with HTML and CSS: they scale with the text, work in dark mode
   and in print, and the second series is striped so it does not rely on colour. */
function num(v, dec) { return dec ? v.toFixed(dec) : String(Math.round(v)); }
SP.chartHTML = function (id) {
  const d = SP.data(); const c = d && d.charts[id];
  if (!c) return '';
  const max = c.max || 100;
  const unit = c.unit === '%' ? '%' : ' ' + c.unit;
  const bar = (v, cls) => '<div class="sp-barline"><div class="sp-track"><div class="sp-bar ' + cls + '" style="width:' + (v / max * 100).toFixed(1) + '%"></div></div><span class="sp-val">' + num(v, c.decimals) + '</span></div>';
  let rows, table;
  if (c.type === 'grouped') {
    rows = c.categories.map((cat, i) =>
      '<div class="sp-row"><div class="sp-rl">' + esc(cat) + '</div><div class="sp-bars">' + c.series.map((s, k) => bar(s.values[i], 's' + (k + 1))).join('') + '</div></div>').join('');
    table = '<table><caption>' + esc(c.title) + '. ' + esc(c.subtitle) + '</caption><thead><tr><th></th>' + c.series.map(s => '<th scope="col">' + esc(s.name) + '</th>').join('') + '</tr></thead><tbody>' +
      c.categories.map((cat, i) => '<tr><th scope="row">' + esc(cat) + '</th>' + c.series.map(s => '<td>' + num(s.values[i], c.decimals) + esc(unit) + '</td>').join('') + '</tr>').join('') + '</tbody></table>';
  } else {
    rows = c.rows.map(r =>
      '<div class="sp-row' + ((c.highlight || []).indexOf(r[0]) >= 0 ? ' hl' : '') + '"><div class="sp-rl">' + esc(r[0]) + '</div><div class="sp-bars">' + bar(r[1], 's1') + '</div></div>').join('');
    table = '<table><caption>' + esc(c.title) + '. ' + esc(c.subtitle) + '</caption><tbody>' + c.rows.map(r => '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + num(r[1], c.decimals) + esc(unit) + '</td></tr>').join('') + '</tbody></table>';
  }
  return '<figure class="sp-chart">' +
    '<figcaption><span class="sp-ct">' + esc(c.title) + '</span><span class="sp-cs">' + esc(c.subtitle) + '</span></figcaption>' +
    (c.type === 'grouped' ? '<div class="sp-legend" aria-hidden="true">' + c.series.map((s, k) => '<span><i class="sp-bar s' + (k + 1) + '"></i>' + esc(s.name) + '</span>').join('') + '</div>' : '') +
    '<div class="sp-rows" aria-hidden="true">' + rows + '</div>' +
    '<div class="visually-hidden">' + table + '</div>' +
    (c.note ? '<p class="sp-note">' + esc(c.note) + '</p>' : '') +
    '<p class="sp-src">Source: ' + esc(c.source) + ' (' + esc(c.period) + '), retrieved ' + esc(c.retrieved) + '. ' + esc(c.licence) + '.</p>' +
  '</figure>';
};

/* ─── task cards ──────────────────────────────────────────── */
SP.imageHTML = function (id) {
  const d = SP.data(); const im = d && d.images[id];
  if (!im) return '';
  if (im.pending) return '<figure class="sp-img pending"><div class="sp-img-ph"><span class="sp-img-tag">Picture</span><p>' + esc(im.alt) + '</p></div><figcaption>The picture for this task is still being made. Until then, use this description.</figcaption></figure>';
  return '<figure class="sp-img"><img src="/' + esc(im.file) + '" alt="' + esc(im.alt) + '" loading="' + (SP.eagerImages ? 'eager' : 'lazy') + '" width="1200" height="800"><figcaption>' + (im.ai ? 'AI-generated image' : esc(im.credit || '')) + '</figcaption></figure>';
};
SP.inputHTML = function (input) {
  if (!input) return '';
  if (input.type === 'chart') return SP.chartHTML(input.chart);
  if (input.type === 'images') return '<div class="sp-imgs n' + input.images.length + '">' + input.images.map((id, i) => (input.images.length > 1 ? '<div><div class="sp-img-n">Picture ' + (i + 1) + '</div>' + SP.imageHTML(id) + '</div>' : SP.imageHTML(id))).join('') + '</div>';
  if (input.type === 'statements') return '<div class="sp-quotes">' + input.statements.map(s => '<blockquote><p>&ldquo;' + esc(s.text) + '&rdquo;</p><footer>' + esc(s.who) + '</footer></blockquote>').join('') + '</div>';
  return '';
};
SP.bulletText = (b, i, n) => esc(typeof b === 'string' ? b : b.text) + (i < n - 1 ? ',' : '.');
SP.longTurnCard = function (topicName, lt) {
  const input = SP.inputHTML(lt.input);
  return '<div class="sp-task">' +
    '<div class="sp-task-k">Individual Long Turn &middot; ' + esc(topicName) + '</div>' +
    '<div class="sp-aspect">' + esc(lt.aspect) + '</div>' +
    input +
    '<p class="sp-lead">' + esc(lt.intro) + '</p>' +
    '<ol class="sp-bullets">' + lt.bullets.map((b, i) => '<li>' + SP.bulletText(b, i, lt.bullets.length) + '</li>').join('') + '</ol>' +
  '</div>';
};
SP.pairedCard = function (topicName, pa) {
  return '<div class="sp-task">' +
    '<div class="sp-task-k">Paired Activity &middot; ' + esc(topicName) + '</div>' +
    '<div class="sp-aspect">' + esc(pa.aspect) + '</div>' +
    '<p class="sp-scen">' + esc(pa.scenario) + '</p>' +
    '<p class="sp-lead">Discuss the following options with your partner:</p>' +
    '<ul class="sp-options">' + pa.options.map((o, i) => '<li>' + esc(o) + (i < pa.options.length - 1 ? ',' : '.') + '</li>').join('') + '</ul>' +
    '<p class="sp-closing">' + esc(pa.closing) + '</p>' +
    '<p class="sp-task-time">You have about ' + (pa.minutes || 10) + ' minutes.</p>' +
  '</div>';
};
})();
