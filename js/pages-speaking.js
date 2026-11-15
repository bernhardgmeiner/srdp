/* ════════════════════════════════════════════════════════════
   Speaking – trainer (Route "speaking")
   Hub page + a full-screen practice stage with three ways:
     Long Turn alone   draw → prepare → talk → listen back → one exercise
     Paired Activity   one phone between two, top half turned for partner B
     Mock exam for two two Long Turns, then a Paired Activity (paired form)
   The stage is a modal layer above the app. It is closed on every route
   change, and a running recording is stopped and thrown away.
   hidden:true keeps the page out of the menu, the sitemap and search
   engines until launch (see _dev/prerender-playwright.mjs).
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG, SP = M.SP;
const { esc, pageHead, sectionLabel } = M;
const D = () => SP.data();
const TM = () => D().timing;

/* ═══ HUB ═══════════════════════════════════════════════════ */
function prepTabs() {
  const cur = SP.prepMinutes();
  return '<div class="tabs filters" aria-label="Preparation time">' + TM().prepOptions.map(v =>
    '<button type="button" class="tab' + (v === cur ? ' active' : '') + '" data-hub="prep" data-v="' + v + '">' + v + ' min</button>').join('') + '</div>';
}
function keptHTML(list) {
  if (!list.length) return '<p class="muted">Nothing kept yet. After a talk you can keep the recording on this device or save it as a file.</p>';
  return '<ul class="sp-kept">' + list.map(r =>
    '<li><div class="sp-kept-h"><strong>' + esc(r.label) + '</strong><span class="muted">' + esc(r.created.slice(0, 10)) + ' &middot; ' + SP.fmt(r.ms / 1000) + '</span></div>' +
    '<div class="row-wrap"><button type="button" class="btn btn-ghost btn-sm" data-hub="kplay" data-id="' + esc(r.id) + '">Listen</button>' +
    '<button type="button" class="btn btn-ghost btn-sm" data-hub="ksave" data-id="' + esc(r.id) + '">Save as file</button>' +
    '<button type="button" class="btn btn-ghost btn-sm" data-hub="kdel" data-id="' + esc(r.id) + '">Delete</button></div>' +
    '<div data-kslot="' + esc(r.id) + '"></div></li>').join('') + '</ul>' +
    '<p class="mt-4"><button type="button" class="btn btn-ghost btn-sm" data-hub="kdelall">Delete all recordings on this device</button></p>';
}
let keptCache = [];
function paintKept() {
  const host = document.getElementById('spKept'); if (!host) return;
  Array.prototype.forEach.call(host.querySelectorAll('[data-kslot]'), x => { SP.dropTake(x._take); x._take = null; });
  SP.kept().then(list => { keptCache = list; const h = document.getElementById('spKept'); if (h) h.innerHTML = keptHTML(list); });
}

PAGES.speaking = {
  title: 'Speaking', hidden: true,
  render() {
    const d = D();
    const prep = SP.prepMinutes();
    const way = (act, t, dsc) => '<button type="button" class="way-card" data-hub="' + act + '"><span class="way-t">' + t + ' <span aria-hidden="true">&rarr;</span></span><span class="way-d">' + dsc + '</span></button>';
    return '<div class="page" id="spHub">' +
      pageHead('Oral exam &middot; B2', 'Practise speaking. <span class="stick">Out loud.</span>', 'Individual Long Turn and Paired Activity in the format of the oral Matura. You record yourself, listen back and work on one thing at a time. Your recordings stay on this device.') +
      '<div class="wrap">' +
        (PAGES.speaking.hidden ? '<div class="tip mt-4"><strong>Test version.</strong> This part of the site is not in the menu yet. Please do not pass the link on.</div>' : '') +
        '<nav class="ways sp-ways" aria-label="Choose how to practise">' +
          way('lt', 'Long Turn &middot; alone', '<span data-preplabel>' + prep + '</span> min to prepare &middot; 5 min talk &middot; listen back &middot; work on one thing') +
          way('pa', 'Paired Activity &middot; two of you', 'One phone between you &middot; 10 min &middot; agree on two options') +
          way('mock', 'Full mock exam for two', 'Two Long Turns, then a Paired Activity &middot; about 35 min, plus time to listen back') +
        '</nav>' +
        '<div class="sp-set">' +
          '<div class="sp-set-row"><div><div class="sp-set-l">Preparation time</div><div class="sp-set-d">10 minutes is the minimum in the paired form. Choose more if your school gives you more.</div></div>' + prepTabs() + '</div>' +
          '<div class="sp-set-row"><div><div class="sp-set-l" id="spSoundL">Sound signals</div><div class="sp-set-d">A short sound (and a vibration on phones that support it) at 1:00 and 3:00 in your talk, at 7:00 in the discussion and when time is up. The screen always shows the next step.</div></div>' +
            '<button type="button" class="tab' + (SP.soundOn() ? ' active' : '') + '" data-hub="sound" role="switch" aria-labelledby="spSoundL" aria-checked="' + SP.soundOn() + '">' + (SP.soundOn() ? 'On' : 'Off') + '</button></div>' +
        '</div>' +
        '<p class="sp-promise"><strong>No AI, no score.</strong> You judge your own recording with questions that examiners also ask themselves. <a href="#speakingguide">Why it works this way</a></p>' +

        sectionLabel('Before you start') +
        '<ul class="home-links">' +
          '<li><a href="#speakingguide"><strong>How the paired exam works</strong><span class="muted">Who talks when, and for how long</span></a></li>' +
          '<li><a href="#speakingguide"><strong>How to use your 10 minutes</strong><span class="muted">A plan for the preparation time</span></a></li>' +
          '<li><a href="#speakingguide"><strong>What examiners listen for</strong><span class="muted">The four criteria in plain words</span></a></li>' +
          '<li><a href="#speakingguide"><strong>Model talk and model discussion</strong><span class="muted">Two transcripts with notes</span></a></li>' +
          '<li><a href="#speakingguide"><strong>Phrases</strong><span class="muted">For the Long Turn and the Paired Activity</span></a></li>' +
          '<li><a href="#speakingclass"><strong>For teachers</strong><span class="muted">Class view for the projector and printable task cards</span></a></li>' +
        '</ul>' +

        sectionLabel('The six practice topic areas') +
        '<p class="lead-sm mb-4">Your school has its own list of topic areas. These six are common ones, and the way you prepare and speak is the same for any topic.</p>' +
        '<div class="sp-topics">' + d.topics.map(t => '<div class="sp-topic"><strong>' + esc(t.name) + '</strong><span>' + esc(t.keyAspects.slice(0, 4).join(' · ')) + '</span></div>').join('') + '</div>' +

        sectionLabel('Recordings kept on this device') +
        '<div id="spKept"><p class="muted">Loading &hellip;</p></div>' +
        '<p class="muted text-sm mt-4">Kept recordings are stored in this browser only. On iPhones and iPads they can disappear if you do not open the site for a week, so save important ones as a file.</p>' +
        '<div class="page-end"></div>' +
      '</div></div>';
  },
  wire() {
    paintKept();
    const hub = document.getElementById('spHub'); if (!hub) return;
    hub.addEventListener('click', e => {
      const el = e.target.closest('[data-hub]'); if (!el) return;
      const a = el.dataset.hub;
      if (a === 'lt' || a === 'pa' || a === 'mock') openStage(a, el);
      else if (a === 'prep') {
        SP.setPrepMinutes(+el.dataset.v);
        hub.querySelectorAll('[data-hub="prep"]').forEach(b => { const on = b === el; b.classList.toggle('active', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
        const l = hub.querySelector('[data-preplabel]'); if (l) l.textContent = el.dataset.v;
      }
      else if (a === 'sound') { const on = !SP.soundOn(); SP.setSound(on); el.classList.toggle('active', on); el.setAttribute('aria-checked', on); el.textContent = on ? 'On' : 'Off'; if (on) SP.signal(); }
      else if (a === 'kplay') {
        const r = keptCache.find(x => x.id === el.dataset.id); const slot = hub.querySelector('[data-kslot="' + el.dataset.id + '"]');
        if (!r || !slot) return;
        if (slot.innerHTML) { slot.innerHTML = ''; SP.dropTake(slot._take); slot._take = null; return; }
        const take = { blob: r.blob, url: URL.createObjectURL(r.blob), ms: r.ms, stats: r.stats, ext: r.ext };
        slot._take = take;
        slot.innerHTML = SP.playerHTML(take, r.label); SP.wirePlayers(slot);
      }
      else if (a === 'ksave') { const r = keptCache.find(x => x.id === el.dataset.id); if (r) SP.download(r, 'speaking_' + r.taskId + '_' + r.created.slice(0, 10)); }
      else if (a === 'kdel') { SP.unkeep(el.dataset.id).then(paintKept, paintKept); }
      else if (a === 'kdelall') { if (window.confirm('Delete all recordings that are kept on this device?')) SP.unkeepAll().then(paintKept, paintKept); }
    });
  },
};

/* ═══ STAGE ═════════════════════════════════════════════════ */
let F = null;            /* state of the running practice */
let stage = null, clock = null, rec = null, stopPlayers = null;
const INERT = ['app', 'bottomNav'];
const inertExtra = () => Array.prototype.slice.call(document.querySelectorAll('.mobile-bar, .skip-link, #backtop'));

/* announcements for screen readers: the region sits inside the dialog, because
   VoiceOver ignores everything outside a modal dialog */
function say(msg) {
  const r = document.getElementById('spLive');
  if (!r) { M.announce(msg); return; }
  r.textContent = ''; setTimeout(() => { const x = document.getElementById('spLive'); if (x) x.textContent = msg; }, 30);
}
function openStage(mode, opener) {
  if (F) closeStage(true);
  F = { mode, opener, noRec: false, ans: {}, paAns: {}, b3ans: {}, notes: ['', '', ''], taps: {}, flip: true };
  stage = document.createElement('div');
  stage.className = 'sp-stage'; stage.id = 'spStage';
  stage.setAttribute('role', 'dialog'); stage.setAttribute('aria-modal', 'true'); stage.setAttribute('aria-label', 'Speaking practice');
  stage.innerHTML = '<div id="spLive" class="visually-hidden" aria-live="polite"></div><div class="sp-screen" id="spScreen"></div>';
  document.body.appendChild(stage);
  document.documentElement.classList.add('sp-open');
  INERT.forEach(id => { const x = document.getElementById(id); if (x) x.setAttribute('inert', ''); });
  inertExtra().forEach(x => x.setAttribute('inert', ''));
  /* the back button of the phone closes the practice and stays on the page */
  try { history.pushState({ spStage: true }, ''); F.pushed = true; } catch (e) {}
  SP.prime();
  stage.addEventListener('click', onClick);
  stage.addEventListener('input', onInput);
  stage.addEventListener('keydown', e => { if (e.key === 'Escape') { e.preventDefault(); ACT.quit(); } });
  if (mode === 'lt') { drawTwo(); go('draw'); }
  else if (mode === 'pa') { newPaired(null); go('pa-setup'); }
  else { F.mk = { who: 'A', A: { ear: { ans: {}, good: '' }, taps: {} }, B: { ear: { ans: {}, good: '' }, taps: {} } }; go('mk-intro'); }
}
function leaveStep() {
  if (clock) { clock.stop(); clock = null; }
  if (stopPlayers) { stopPlayers(); stopPlayers = null; }
}
function allTakes() { if (!F) return []; const t = [F.take, F.b3take, F.paTake]; if (F.mk) t.push(F.mk.A.take, F.mk.B.take); return t.filter(Boolean); }
function closeStage(silent, fromPop) {
  if (!F) return;
  const pushed = F.pushed && !fromPop;
  leaveStep();
  if (rec) { const r = rec; rec = null; r.stop().then(SP.dropTake); }
  allTakes().forEach(SP.dropTake);
  SP.wake(false);
  { const c = SP.audio(); if (c && c.state === 'running' && c.suspend) { try { c.suspend(); } catch (e) {} } }
  const opener = F.opener;
  F = null;
  if (stage) { stage.remove(); stage = null; }
  document.documentElement.classList.remove('sp-open');
  INERT.forEach(id => { const x = document.getElementById(id); if (x) x.removeAttribute('inert'); });
  inertExtra().forEach(x => x.removeAttribute('inert'));
  if (pushed && !silent) { skipPop++; try { history.back(); } catch (e) { skipPop--; } }
  if (!silent) { const b = (opener && document.contains(opener)) ? opener : document.querySelector('#spHub [data-hub="lt"]'); if (b) { try { b.focus(); } catch (e) {} } paintKept(); }
}
window.addEventListener('hashchange', () => { if (F) closeStage(true); });
let skipPop = 0;   /* our own history.back() after closing: not a request to close again */
window.addEventListener('popstate', () => {
  if (skipPop > 0) { skipPop--; return; }
  if (!F || !F.pushed) return;
  if (!confirmLeave()) { try { history.pushState({ spStage: true }, ''); } catch (e) {} return; }
  closeStage(false, true);
});
function confirmLeave() {
  const busy = rec || (F && /talk|prep|read/.test(F.step));
  const has = allTakes().some(t => t.url);
  if (!busy && !has) return true;
  return window.confirm(rec ? 'Stop and leave? The recording will be deleted.' : has ? 'Leave the practice? Recordings you have not saved or kept will be deleted.' : 'Leave the practice?');
}
/* closing the tab, a reload or pull-to-refresh would throw a recording away without a word */
window.addEventListener('beforeunload', e => { if (F && (rec || allTakes().some(t => t.url))) { e.preventDefault(); e.returnValue = ''; } });

function go(step, patch) {
  if (!F) return;
  leaveStep();
  if (patch) Object.assign(F, patch);
  F.step = step; F.stopping = false; F.micBusy = false;
  const s = STEPS[step];
  stage.className = 'sp-stage' + (s.cls ? ' ' + s.cls : '');
  document.getElementById('spScreen').innerHTML = s.html();
  SP.wake(!!s.wake);
  if (s.wire) s.wire();
  stopPlayers = SP.wirePlayers(stage);
  const h = stage.querySelector('[data-focus]') || stage.querySelector('h1');
  if (h) { if (!h.matches('button,a[href],input,select,textarea')) h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (e) {} }
  const b = stage.querySelector('.sp-body'); if (b) b.scrollTop = 0;
}

/* ─── building blocks ─────────────────────────────────────── */
const X = '<button type="button" class="sp-x" data-sp="quit" aria-label="Close the practice"><span aria-hidden="true">&times;</span></button>';
function shell(o) {
  return '<div class="sp-top"><div class="sp-top-l">' + (o.kicker ? '<span class="sp-kicker">' + o.kicker + '</span>' : '') + (o.clock || '') + '</div><div class="sp-top-r">' + (o.top || '') + X + '</div></div>' +
    (o.bar || '') +
    '<div class="sp-body"><div class="sp-in">' + o.body + '</div></div>' +
    (o.foot ? '<div class="sp-foot"><div class="sp-in">' + o.foot + '</div></div>' : '');
}
function ynRows(list, ans, group) {
  return '<div class="sp-yn">' + list.map((c, i) => {
    const id = c.id || ('q' + i), q = c.q || c, v = ans[id], lab = 'yn-' + group + '-' + id;
    const b = (val, t) => '<button type="button" data-sp="yn" data-g="' + group + '" data-id="' + id + '" data-v="' + val + '" aria-pressed="' + (v === val) + '">' + t + '</button>';
    return '<div class="sp-yn-row"><span id="' + lab + '">' + esc(q) + '</span><span class="sp-yn-b" role="group" aria-labelledby="' + lab + '">' + b('y', 'Yes') + b('n', 'No') + '</span></div>';
  }).join('') + '</div>';
}
function ansOf(group) {
  if (group === 'lt') return F.ans;
  if (group === 'pa') return F.paAns;
  if (group === 'b3') return F.b3ans;
  if (group === 'earA') return F.mk.A.ear.ans;
  if (group === 'earB') return F.mk.B.ear.ans;
  return {};
}
function takeOf(key) {
  if (key === 'lt') return { take: F.take, id: F.lt.id, label: 'Long Turn: ' + F.lt.aspect };
  if (key === 'b3') return { take: F.b3take, id: F.lt.id + '-bullet3', label: 'Bullet 3: ' + F.lt.aspect };
  if (key === 'pa') return { take: F.paTake, id: F.pa.id, label: 'Paired Activity: ' + F.pa.aspect };
  if (key === 'mkA' || key === 'mkB') { const p = F.mk[key.slice(2)]; return { take: p.take, id: p.lt.id + '-' + key.slice(2), label: 'Mock exam, Partner ' + key.slice(2) + ': ' + p.lt.aspect }; }
  return {};
}
function takeBtns(key) {
  const t = takeOf(key).take;
  if (!t || !t.url) return '';
  return '<div class="row-wrap sp-takebtns"><button type="button" class="btn btn-ghost btn-sm" data-sp="save" data-k="' + key + '">Save as file</button>' +
    '<button type="button" class="btn btn-ghost btn-sm" data-sp="keep" data-k="' + key + '">Keep on this device</button>' +
    '<button type="button" class="btn btn-ghost btn-sm" data-sp="del" data-k="' + key + '">Delete</button></div>';
}
/* paired = two voices at different distances from the phone: no pause figures there */
function statsHTML(take, sec, t3, withB3, paired) {
  const st = paired ? null : take && take.stats;
  const cell = (l, v) => '<div class="sp-stat"><span class="sp-stat-l">' + l + '</span><span class="sp-stat-v">' + v + '</span></div>';
  return '<div class="sp-stats">' +
    cell('Talk time', SP.fmt(take ? take.ms / 1000 : sec)) +
    (withB3 ? cell('Bullet 3 at', t3 != null ? SP.fmt(t3) : 'not marked') : '') +
    (paired ? '' : cell('Longest pause', st && !st.silent ? (st.longest ? Math.round(st.longest) + ' s' : '&lt; 3 s') : '&ndash;')) +
    '</div>' +
    '<p class="sp-fine">' + (st && st.silent ? 'The recording is very quiet. Listen to check that it worked. ' : (st ? 'Striped orange marks: 3 seconds or more that were much quieter than the rest. Usually these are pauses, but a quiet voice or background noise can fool the measurement. ' : '')) +
    (withB3 ? '&ldquo;Bullet 3 at&rdquo; is the moment you tapped bullet 3. ' : '') + 'These are plain measurements. They say nothing about your grade.</p>';
}
function topicCards(ids, kicker) {
  return ids.map(id => { const t = SP.topic(id);
    return '<div class="sp-card"><div class="sp-card-k">' + kicker + '</div><div class="sp-card-t">' + esc(t.name) + '</div><div class="sp-card-d">' + esc(t.keyAspects.slice(0, 4).join(' · ')) + '</div>' +
      '<button type="button" class="btn btn-primary" data-sp="choose" data-topic="' + id + '">Choose this topic area</button></div>'; }).join('');
}
function drawTwo(exclude) {
  const ids = M.shuffle(D().topics.map(t => t.id).filter(id => (exclude || []).indexOf(id) < 0));
  F.draw = ids.slice(0, 2);
}
function newPaired(topicId) {
  const all = [];
  D().topics.forEach(t => { if (!topicId || t.id === topicId) t.paired.forEach(p => all.push({ id: p.id, t, p })); });
  const pool = all.filter(x => !F.pa || x.id !== F.pa.id);
  const pick = SP.pickFresh(pool.length ? pool : all);
  if (F.paTake) { SP.dropTake(F.paTake); }
  F.paTopic = pick.t; F.pa = pick.p; F.opt = [0, 0, 0, 0, 0]; F.paTake = null; F.paAns = {}; F.picks = [];
}
/* Every microphone request belongs to one practice and one step. If the user has quit,
   moved on, chosen "without recording" or locked the screen before the browser answers,
   the recording is stopped at once and the microphone is released. */
let micOk = false;
function askMic(cb) {
  const mine = F, step = F.step; F.micBusy = true;
  SP.record().then(h => {
    if (F !== mine || F.step !== step || F.noRec || !cb || document.hidden) { h.stop().then(SP.dropTake); if (F === mine && F.step === step) F.micBusy = false; return; }
    micOk = true; M.store('mwg_sp_micok', true); F.micBusy = false; F.micNext = null; cb(h);
  }, () => { if (F === mine && F.step === step) go('mic', { micErr: true }); });
}
function withMic(cb) {
  if (F.micBusy) return;
  if (F.noRec || !SP.canRecord()) return cb(null);
  F.micNext = cb;
  if (!micOk && !M.store('mwg_sp_micok')) return go('mic', { micErr: false });
  askMic(cb);
}
function recBadge() { return rec ? '<span class="sp-rec"><i></i>Recording on this device</span>' : '<span class="sp-rec off">Timer only, no recording</span>'; }

/* ─── steps ───────────────────────────────────────────────── */
const STEPS = {};

STEPS.draw = {
  html() {
    return shell({ kicker: 'Long Turn &middot; alone',
      body: '<h1 class="sp-h1">You drew two topic areas.</h1><p class="sp-p">Pick one, just like in the exam. The other one goes back into the pool.</p>' +
        '<div class="sp-cards">' + topicCards(F.draw, 'Topic area') + '</div>',
      foot: '<button type="button" class="btn btn-ghost" data-sp="redraw">Draw again</button>' +
        '<p class="sp-fine">Six practice topic areas. Your school has its own list; the way you prepare and speak is the same.</p>' });
  },
};

/* the task plus keyword notes while the preparation clock runs */
STEPS.prep = {
  wake: true,
  html() {
    const total = SP.prepMinutes() * 60;
    return shell({ kicker: 'Preparation',
      clock: '<span class="sp-clock" id="spClock" role="timer">' + SP.fmt(total) + '</span>',
      top: '<button type="button" class="btn btn-ghost btn-sm" data-sp="pause" id="spPause">Pause</button>',
      bar: '<div class="sp-prog"><i id="spProg"></i></div>',
      body: '<div data-focus class="visually-hidden">Preparation. ' + SP.prepMinutes() + ' minutes.</div>' +
        SP.longTurnCard(F.topic.name, F.lt) +
        '<div class="sp-notes"><div class="sp-notes-h">Your keyword notes</div>' +
        [0, 1, 2].map(i => '<label class="sp-note-in"><span class="n">' + (i + 1) + '</span><span class="visually-hidden">Keywords for bullet ' + (i + 1) + '</span><input type="text" data-note="' + i + '" value="' + esc(F.notes[i]) + '" placeholder="max. 6 words" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="next"></label>').join('') +
        '<p class="sp-fine" id="spNoteHint" aria-live="polite">Keywords only, six for each bullet. Full sentences turn into a script.</p></div>' +
        '<p class="sp-fine" id="spPrepEnd" aria-live="polite"></p>',
      foot: '<button type="button" class="btn btn-primary sp-main" data-sp="ready">I&rsquo;m ready &middot; start talking</button>' });
  },
  wire() {
    const total = SP.prepMinutes() * 60;
    const cl = document.getElementById('spClock'), pr = document.getElementById('spProg');
    clock = SP.clock({ duration: total,
      onTick(e) { const left = Math.max(0, total - e); cl.textContent = SP.fmt(Math.ceil(left)); pr.style.width = Math.min(100, e / total * 100) + '%'; },
      onEnd() { cl.classList.add('over'); const x = document.getElementById('spPrepEnd'); if (x) x.textContent = 'Your preparation time is over. In the exam you would start now.'; SP.signal(); say('Your preparation time is over.'); } });
    clock.start();
  },
};

STEPS.mic = {
  html() {
    return shell({ kicker: 'Microphone',
      body: '<h1 class="sp-h1">Record yourself?</h1>' +
        '<p class="sp-p">Your browser will ask for the microphone. The recording stays on this device. Nothing is uploaded. It is deleted when you close the practice or start a new task, unless you keep it or save it as a file.</p>' +
        (F.micErr ? '<div class="tip warn">The microphone could not be switched on. Allow it in your browser settings and try again, or practise without recording.</div>' : ''),
      foot: '<button type="button" class="btn btn-primary sp-main" data-sp="mic-on">Turn on the microphone</button>' +
        '<button type="button" class="btn btn-ghost" data-sp="mic-off">Practise without recording</button>' });
  },
};

/* Long Turn: used alone and in the mock exam (who = A or B) */
function talkCtx() {
  if (F.mode === 'mock') { const p = F.mk[F.mk.who]; return { lt: p.lt, topic: p.topic, taps: p.taps, notes: null, who: F.mk.who }; }
  return { lt: F.lt, topic: F.topic, taps: F.taps, notes: F.notes, who: null };
}
function talkHint(e) {
  const m = TM().marks, end = TM().longTurn;
  if (e < m[0]) return '<b>Next at ' + SP.fmt(m[0]) + ':</b> move on to bullet 2';
  if (e < m[0] + 15) return '<b>Now:</b> move on to bullet 2';
  if (e < m[1]) return '<b>Next at ' + SP.fmt(m[1]) + ':</b> move on to bullet 3. Your own view, with a reason.';
  if (e < m[1] + 15) return '<b>Now:</b> move on to bullet 3';
  if (e < end) return '<b>Before ' + SP.fmt(end) + ':</b> finish with a clear last sentence';
  return '<b>Time is up.</b> Finish your sentence.';
}
STEPS.talk = {
  wake: true, cls: 'sp-talking',
  html() {
    const c = talkCtx(), end = TM().longTurn;
    const cur = c.taps[3] != null ? 3 : c.taps[2] != null ? 2 : 1;
    return shell({ kicker: recBadge(),
      body: '<div data-focus class="visually-hidden">' + (c.who ? 'Partner ' + c.who + ': ' : '') + 'Your five minutes have started.</div>' +
        '<div class="sp-big"><span class="sp-bigclock" id="spBig" role="timer">0:00</span><span class="sp-of">of ' + SP.fmt(end) + (c.who ? ' &middot; Partner ' + c.who : '') + '</span></div>' +
        '<div class="sp-segs" aria-hidden="true"><div><i id="spSeg1"></i></div><div><i id="spSeg2"></i></div><div><i id="spSeg3"></i></div></div>' +
        '<div class="sp-seglab" aria-hidden="true"><span>Bullet 1</span><span>Bullet 2 from 1:00</span><span>Bullet 3 from 3:00</span></div>' +
        '<div class="sp-hint" id="spHint">' + talkHint(0) + '</div>' +
        '<div class="sp-tapbox"><div class="sp-tapbox-h">Tap a bullet when you start it</div>' +
        c.lt.bullets.map((b, i) => {
          const n = i + 1, kw = c.notes && c.notes[i] ? '<span class="kw">' + esc(c.notes[i]) + '</span>' : '';
          const inner = '<span class="n">' + n + '</span><span class="bt">' + esc(b.text) + kw + '</span>';
          return n === 1 ? '<div class="sp-tap' + (cur === 1 ? ' on' : ' done') + '" data-tapline="1">' + inner + '</div>'
            : '<button type="button" class="sp-tap' + (cur === n ? ' on' : cur > n ? ' done' : '') + '" data-sp="tap" data-b="' + n + '" data-tapline="' + n + '">' + inner + '</button>';
        }).join('') + '</div>' +
        '<div class="sp-talkinput">' + SP.inputHTML(c.lt.input) + '</div>',
      foot: '<button type="button" class="btn sp-stop sp-main" data-sp="stop-talk">Stop and listen back</button><p class="sp-fine ctr">The screen should stay on while you talk. If it locks, the recording stops. Nothing is uploaded.</p>' });
  },
  wire() {
    const m = TM().marks, end = TM().longTurn, max = TM().longTurnMax;
    const big = document.getElementById('spBig'), hint = document.getElementById('spHint');
    const seg = [1, 2, 3].map(i => document.getElementById('spSeg' + i));
    const span = [[0, m[0]], [m[0], m[1]], [m[1], end]];
    let lastHint = '';
    clock = SP.clock({ duration: end, max, marks: m,
      onTick(e) {
        big.textContent = SP.fmt(e);
        big.classList.toggle('over', e >= end + 30);
        span.forEach((s, i) => { seg[i].style.width = Math.max(0, Math.min(100, (e - s[0]) / (s[1] - s[0]) * 100)) + '%'; });
        const h = talkHint(e); if (h !== lastHint) { hint.innerHTML = h; lastHint = h; hint.classList.toggle('now', /^<b>(Now|Time)/.test(h)); }
      },
      onMark(s) { SP.signal(); say(s === m[0] ? 'One minute. Move on to bullet 2.' : 'Three minutes. Move on to bullet 3.'); },
      onEnd() { SP.signal(); say('Five minutes. Finish your sentence.'); },
      onMax() { finishTalk(); } });
    if (rec) rec.onInterrupt = p => { F.interrupted = true; finishTalk(p); };
    clock.start();
  },
};
function finishTalk(pending) {
  if (!F || F.step !== 'talk' || F.stopping) return;
  F.stopping = true;
  const c = talkCtx();
  const sec = clock ? clock.elapsed() : 0;
  if (clock) { clock.stop(); clock = null; }
  SP.markUsed(c.lt.id);
  const done = take => {
    if (!F) { SP.dropTake(take); return; }
    if (F.mode === 'mock') { const p = F.mk[F.mk.who]; p.take = take; p.sec = sec; go('mk-ear'); }
    else { F.take = take; F.talkSec = sec; go('review'); }
  };
  const r = rec; rec = null;
  if (pending) pending.then(done);
  else if (r) r.stop().then(done);
  else done(null);
}

function suggestion() {
  const list = D().checks.longturn, a = F.ans;
  if (Object.keys(a).length < list.length) return null;
  if (a.all3 === 'n' || a.opinion === 'n' || a.time === 'n') return 'b3';
  if (list.every(c => a[c.id] === 'y')) return 'new';
  return 'write';
}
function paintSuggest() {
  const s = suggestion();
  stage.querySelectorAll('[data-ex]').forEach(el => { const on = el.dataset.ex === s; el.classList.toggle('sug', on); const tag = el.querySelector('.sp-sugtag'); if (tag) tag.hidden = !on; });
  const p = document.getElementById('spSugLine');
  if (p) p.textContent = s ? 'Suggested for you, based on your answers.' : 'Answer the questions above, and one of these exercises will be suggested.';
}
STEPS.review = {
  html() {
    const ex = (id, t, d) => '<button type="button" class="sp-ex" data-sp="ex" data-ex="' + id + '"><span class="sp-ex-t">' + t + '<span class="sp-sugtag" hidden>Suggested</span></span><span class="sp-ex-d">' + d + '</span></button>';
    return shell({ kicker: 'Listen back',
      body: '<h1 class="sp-h1">Listen to yourself.</h1>' +
        (F.interrupted ? '<div class="tip warn">The recording stopped when the screen was locked or you left the page. What was recorded until then is here.</div>' : '') +
        SP.playerHTML(F.take, 'your Long Turn') +
        statsHTML(F.take, F.talkSec, F.taps[3], true) +
        takeBtns('lt') +
        '<h2 class="sp-h2">While you listen: what is true?</h2>' + ynRows(D().checks.longturn, F.ans, 'lt') +
        '<h2 class="sp-h2">Work on one thing</h2><p class="sp-fine" id="spSugLine"></p>' +
        '<div class="sp-exs">' +
          ex('b3', 'Bullet 3 in 60 seconds', 'Only your opinion, with a sentence frame to start from.') +
          ex('write', 'Write down 30 seconds', 'Type what you really said, then find and fix up to three mistakes.') +
          ex('new', 'New aspect, same topic area', 'Another task on ' + esc(F.topic.name) + '. It shows whether you know the topic area or only one talk.') +
        '</div>' +
        '<details class="sp-details"><summary>Show the task again</summary>' + SP.longTurnCard(F.topic.name, F.lt) + '</details>',
      foot: '<button type="button" class="btn btn-primary sp-main" data-sp="newtopic">New topic area</button><button type="button" class="btn-text" data-sp="quit">Finish practice</button>' });
  },
  wire() { paintSuggest(); },
};

/* exercise 1: only bullet 3, one minute */
STEPS.b3 = {
  html() {
    const fr = D().checks.frames; if (F.frame == null) F.frame = 0;
    return shell({ kicker: 'Bullet 3 in 60 seconds',
      body: '<h1 class="sp-h1">Your opinion in one minute.</h1>' +
        '<div class="sp-task"><div class="sp-task-k">Bullet 3 &middot; ' + esc(F.lt.aspect) + '</div><p class="sp-b3">' + esc(F.lt.bullets[2].text) + '.</p></div>' +
        '<h2 class="sp-h2">Start with this frame</h2>' +
        '<div class="sp-frames">' + fr.map((f, i) => '<button type="button" class="sp-frame' + (i === F.frame ? ' on' : '') + '" data-sp="frame" data-i="' + i + '" aria-pressed="' + (i === F.frame) + '">' + esc(f) + '</button>').join('') + '</div>' +
        '<p class="sp-fine">You get 20 seconds to think. Then talk for one minute.</p>',
      foot: '<button type="button" class="btn btn-primary sp-main" data-sp="b3-think">Start: 20 seconds to think</button><button type="button" class="btn-text" data-sp="back-review">Back to my Long Turn</button>' });
  },
};
STEPS['b3-think'] = {
  wake: true,
  html() {
    return shell({ kicker: 'Think',
      body: '<div data-focus class="visually-hidden">Twenty seconds to think.</div><div class="sp-big"><span class="sp-bigclock" id="spBig" role="timer">0:20</span><span class="sp-of">to think</span></div>' +
        '<div class="sp-task"><p class="sp-b3">' + esc(F.lt.bullets[2].text) + '.</p><p class="sp-frame-show">' + esc(D().checks.frames[F.frame]) + '</p></div>',
      foot: '<button type="button" class="btn btn-primary sp-main" data-sp="b3-go">Start talking now</button>' });
  },
  wire() {
    const big = document.getElementById('spBig');
    clock = SP.clock({ duration: 20, onTick(e) { big.textContent = SP.fmt(Math.ceil(Math.max(0, 20 - e))); }, onEnd() { ACT['b3-go'](); } });
    clock.start();
  },
};
STEPS['b3-talk'] = {
  wake: true, cls: 'sp-talking',
  html() {
    return shell({ kicker: recBadge(),
      body: '<div data-focus class="visually-hidden">One minute. Start talking.</div><div class="sp-big"><span class="sp-bigclock" id="spBig" role="timer">0:00</span><span class="sp-of">of 1:00</span></div>' +
        '<div class="sp-segs one" aria-hidden="true"><div><i id="spSeg1"></i></div></div>' +
        '<div class="sp-task"><p class="sp-b3">' + esc(F.lt.bullets[2].text) + '.</p><p class="sp-frame-show">' + esc(D().checks.frames[F.frame]) + '</p></div>',
      foot: '<button type="button" class="btn sp-stop sp-main" data-sp="b3-stop">Stop and listen back</button>' });
  },
  wire() {
    const big = document.getElementById('spBig'), seg = document.getElementById('spSeg1');
    clock = SP.clock({ duration: 60, max: 75,
      onTick(e) { big.textContent = SP.fmt(e); seg.style.width = Math.min(100, e / 60 * 100) + '%'; big.classList.toggle('over', e >= 70); },
      onEnd() { SP.signal(); say('One minute.'); }, onMax() { ACT['b3-stop'](); } });
    if (rec) rec.onInterrupt = p => { ACT['b3-stop'](p); };
    clock.start();
  },
};
STEPS['b3-review'] = {
  html() {
    return shell({ kicker: 'Bullet 3 in 60 seconds',
      body: '<h1 class="sp-h1">Listen to your minute.</h1>' + SP.playerHTML(F.b3take, 'your minute on bullet 3') + statsHTML(F.b3take, F.b3sec, null, false) + takeBtns('b3') +
        '<h2 class="sp-h2">What is true?</h2>' + ynRows(D().checks.bullet3, F.b3ans, 'b3') +
        '<p class="sp-fine">If you answered &ldquo;yes&rdquo; twice, try the next frame and say it in a different way.</p>',
      foot: '<button type="button" class="btn btn-primary sp-main" data-sp="b3-again">Try again with another frame</button><button type="button" class="btn-text" data-sp="back-review">Back to my Long Turn</button>' });
  },
};

/* exercise 2: write down 30 seconds of your own talk */
STEPS.write = {
  html() {
    if (!F.take || !F.take.url) return shell({ kicker: 'Write down 30 seconds', body: '<h1 class="sp-h1">This exercise needs a recording.</h1><p class="sp-p">Record a Long Turn first, or record yourself with a voice memo app and write down 30 seconds of that.</p>', foot: '<button type="button" class="btn btn-primary sp-main" data-sp="back-review">Back</button>' });
    const dur = F.take.ms / 1000, maxStart = Math.max(0, Math.floor((dur - 30) / 5) * 5);
    if (!F.wr) F.wr = { start: Math.min(60, maxStart), text: '', pairs: [['', ''], ['', ''], ['', '']] };
    const w = F.wr;
    return shell({ kicker: 'Write down 30 seconds',
      body: '<h1 class="sp-h1">What did you really say?</h1>' +
        '<p class="sp-p">Choose 30 seconds from the middle of your talk. Play them as often as you like and type every word, mistakes included.</p>' +
        SP.playerHTML(F.take, '30 seconds of your Long Turn') +
        '<label class="sp-range"><span>These 30 seconds start at <b id="spWrFrom">' + SP.fmt(w.start) + '</b></span><input type="range" min="0" max="' + maxStart + '" step="5" value="' + w.start + '" data-wr="start"' + (maxStart === 0 ? ' disabled' : '') + '></label>' +
        '<label class="sp-field"><span>What you said</span><textarea rows="6" data-wr="text" placeholder="Type exactly what you hear." spellcheck="false">' + esc(w.text) + '</textarea></label>' +
        '<h2 class="sp-h2">Find up to three mistakes and correct them</h2>' +
        w.pairs.map((p, i) => '<div class="sp-pair"><label><span>I said</span><input type="text" data-wr="a' + i + '" value="' + esc(p[0]) + '" autocomplete="off"></label><label><span>Better</span><input type="text" data-wr="b' + i + '" value="' + esc(p[1]) + '" autocomplete="off"></label></div>').join('') +
        '<details class="sp-details"><summary>Where to look for mistakes</summary><ul class="sp-slips">' + D().slipTypes.map(s => '<li><strong>' + esc(s.label) + '</strong> <span>' + esc(s.hint) + '</span></li>').join('') + '</ul>' +
        '<p class="sp-fine"><a href="/grammar/" target="_blank" rel="noopener">Open the grammar kit in a new tab</a></p></details>',
      foot: '<button type="button" class="btn btn-primary sp-main" data-sp="wr-save">Save my notes as a text file</button><button type="button" class="btn-text" data-sp="back-review">Back to my Long Turn</button>' });
  },
  wire() {
    const pl = stage.querySelector('.sp-player'); if (!pl || !F.wr) return;
    setTimeout(() => { if (pl._setLoop) { pl._setLoop({ a: F.wr.start, b: F.wr.start + 30 }); pl._seek(F.wr.start); } }, 0);
  },
};

/* ─── Paired Activity ─────────────────────────────────────── */
STEPS['pa-setup'] = {
  html() {
    return shell({ kicker: 'Paired Activity &middot; two of you',
      body: '<h1 class="sp-h1">Put the phone between you.</h1>' +
        '<p class="sp-p">Lay it flat on the table. Partner A sits at the bottom edge, Partner B at the top edge. The top half of the screen is turned round, so each of you can read the task.</p>' +
        '<div class="sp-phone" aria-hidden="true"><div class="b"><span>Partner B</span></div><div class="m">10:00</div><div class="a"><span>Partner A</span></div></div>' +
        '<label class="sp-check"><input type="checkbox" data-flip' + (F.flip ? ' checked' : '') + '> Turn the top half round for Partner B</label>' +
        '<p class="sp-fine">In the exam you get a short time to read the task and no time to prepare. Here you get one minute. Then you talk for 10 minutes and try to agree on two options. Tap an option to mark it as in or out.</p>',
      foot: '<button type="button" class="btn btn-primary sp-main" data-sp="pa-show">Show the task &middot; 1 minute to read</button>' });
  },
};
function halfHTML(who, full) {
  const pa = F.pa, lab = ['', 'in', 'out'];
  /* Partner B's half repeats the task for a sighted reader on the other side of the phone.
     Screen readers and the keyboard get it once, in Partner A's half. */
  const dup = who === 'B';
  return '<div class="sp-half ' + who.toLowerCase() + (dup && F.flip ? ' flip' : '') + '"' + (dup ? ' aria-hidden="true" tabindex="-1"' : '') + '>' +
    '<div class="sp-half-k">Partner ' + who + (full ? ' &middot; read the task' : ' &middot; tap an option: in / out') + '</div>' +
    (full ? '<div class="sp-aspect sm">' + esc(pa.aspect) + '</div><p class="sp-scen sm">' + esc(pa.scenario) + '</p>' : '<p class="sp-scen sm sp-short">' + esc(pa.short) + '</p>') +
    '<div class="sp-opts" data-opts>' + pa.options.map((o, i) =>
      '<button type="button" class="sp-opt s' + F.opt[i] + '" data-sp="opt" data-i="' + i + '"' + (full ? ' disabled' : '') + (dup ? ' tabindex="-1"' : '') + '><span class="n">' + (i + 1) + '</span><span class="t">' + esc(o) + '</span><span class="tag">' + lab[F.opt[i]] + '</span></button>').join('') + '</div>' +
    (full ? '<p class="sp-closing sm">' + esc(pa.closing) + '</p>' : '') +
  '</div>';
}
STEPS['pa-read'] = {
  wake: true, cls: 'sp-splitstage',
  html() {
    return '<div class="sp-split">' + halfHTML('B', true) +
      '<div class="sp-band"><div class="sp-band-row"><span class="sp-band-l">Reading time</span><span class="sp-bandclock" id="spBand" role="timer">1:00</span>' + X + '</div>' +
      '<button type="button" class="btn btn-primary" data-sp="pa-start" data-focus>Start talking</button></div>' +
      halfHTML('A', true) + '</div>';
  },
  wire() {
    const b = document.getElementById('spBand'), n = TM().reading;
    clock = SP.clock({ duration: n, onTick(e) { b.textContent = SP.fmt(Math.ceil(Math.max(0, n - e))); }, onEnd() { stage.querySelector('.sp-band').classList.add('go'); say('Reading time is over. Start talking.'); } });
    clock.start();
  },
};
STEPS['pa-talk'] = {
  wake: true, cls: 'sp-splitstage sp-talking',
  html() {
    return '<div class="sp-split">' + halfHTML('B', false) +
      '<div class="sp-band rec"><div class="sp-band-row"><span class="sp-recdot' + (rec ? '' : ' off') + '" aria-hidden="true"></span><span class="visually-hidden" data-focus>' + (rec ? 'Recording. ' : 'Timer only. ') + 'Ten minutes.</span>' +
      '<span class="sp-bandclock" id="spBand" role="timer">0:00</span><span class="sp-band-of">of ' + SP.fmt(TM().paired) + '</span>' +
      '<button type="button" class="btn btn-ghost btn-sm sp-band-stop" data-sp="pa-stop">Stop</button></div>' +
      '<div class="sp-band-msg" id="spBandMsg"></div></div>' +
      halfHTML('A', false) + '</div>';
  },
  wire() {
    const b = document.getElementById('spBand'), msg = document.getElementById('spBandMsg'), band = stage.querySelector('.sp-band');
    const end = TM().paired, nar = TM().pairedNarrow;
    clock = SP.clock({ duration: end, max: end + 60, marks: [nar],
      onTick(e) { b.textContent = SP.fmt(e); },
      onMark() { band.classList.add('narrow'); msg.textContent = 'Start narrowing down'; SP.signal(); say('Seven minutes. Start narrowing down.'); },
      onEnd() { band.classList.add('up'); msg.textContent = 'Time is up. Say what you have decided.'; SP.signal(); say('Ten minutes. Say what you have decided.'); },
      onMax() { ACT['pa-stop'](); } });
    if (rec) rec.onInterrupt = p => { F.interrupted = true; ACT['pa-stop'](p); };
    clock.start();
  },
};
STEPS['pa-end'] = {
  html() {
    const pa = F.pa;
    return shell({ kicker: 'Paired Activity',
      body: '<h1 class="sp-h1">Which two did you agree on?</h1>' +
        '<div class="sp-picks">' + pa.options.map((o, i) => '<button type="button" class="sp-opt' + (F.picks.indexOf(i) >= 0 ? ' s1' : '') + '" data-sp="pick" data-i="' + i + '" aria-pressed="' + (F.picks.indexOf(i) >= 0) + '"><span class="n">' + (i + 1) + '</span><span class="t">' + esc(o) + '</span></button>').join('') + '</div>' +
        '<p class="sp-fine">If you did not agree, that is fine. In the exam, say so and explain why.</p>' +
        (F.interrupted ? '<div class="tip warn">The recording stopped when the screen was locked or you left the page.</div>' : '') +
        SP.playerHTML(F.paTake, 'your conversation', { noPauses: true }) + statsHTML(F.paTake, F.paSec, null, false, true) + takeBtns('pa') +
        '<h2 class="sp-h2">Listen together: what is true?</h2>' + ynRows(D().checks.paired, F.paAns, 'pa') +
        '<details class="sp-details"><summary>Show the task again</summary>' + SP.pairedCard(F.paTopic.name, pa) + '</details>',
      foot: F.mode === 'mock'
        ? '<button type="button" class="btn btn-primary sp-main" data-sp="mk-finish">See the whole exam</button>'
        : '<button type="button" class="btn btn-primary sp-main" data-sp="pa-new">Another Paired Activity</button><button type="button" class="btn-text" data-sp="quit">Finish practice</button>' });
  },
};

/* ─── Mock exam for two ───────────────────────────────────── */
STEPS['mk-intro'] = {
  html() {
    const pm = SP.prepMinutes();
    const li = (t, d) => '<li><strong>' + t + '</strong><span>' + d + '</span></li>';
    return shell({ kicker: 'Full mock exam for two',
      body: '<h1 class="sp-h1">The whole exam, on one phone.</h1>' +
        '<ol class="sp-steps">' +
          li('Topic areas', 'Each of you draws two topic areas and chooses one.') +
          li('Preparation &middot; ' + pm + ' min', 'You both prepare at the same time. Make your notes on paper.') +
          li('Long Turn, Partner A &middot; 5 min', 'Partner A talks. Partner B listens and answers four questions afterwards.') +
          li('Long Turn, Partner B &middot; 5 min', 'Then the other way round.') +
          li('Paired Activity &middot; 10 min', 'Three topic areas are drawn, and each of you crosses one out. No preparation.') +
        '</ol>' +
        '<p class="sp-fine">Decide now who is Partner A and who is Partner B. This follows the paired form of the exam. Your class may have the other form: ask your teacher.</p>',
      foot: '<button type="button" class="btn btn-primary sp-main" data-sp="mk-begin">Partner A draws first</button>' });
  },
};
STEPS['mk-draw'] = {
  html() {
    const w = F.mk.who;
    return shell({ kicker: 'Mock exam &middot; topic areas',
      body: '<h1 class="sp-h1">Partner ' + w + ': you drew two topic areas.</h1><p class="sp-p">Pick one for your Long Turn.</p><div class="sp-cards">' + topicCards(F.draw, 'Topic area') + '</div>' });
  },
};
STEPS['mk-prep'] = {
  wake: true, cls: 'sp-splitstage',
  html() {
    const half = w => { const p = F.mk[w]; return '<div class="sp-half ' + w.toLowerCase() + (w === 'B' && F.flip ? ' flip' : '') + '"' + (w === 'B' ? ' tabindex="0"' : '') + '><div class="sp-half-k">Partner ' + w + ' &middot; notes on paper</div>' + SP.longTurnCard(p.topic.name, p.lt) + '</div>'; };
    return '<div class="sp-split">' + half('B') +
      '<div class="sp-band"><div class="sp-band-row"><span class="sp-band-l" data-focus>Preparation</span><span class="sp-bandclock" id="spBand" role="timer">' + SP.fmt(SP.prepMinutes() * 60) + '</span>' +
      '<button type="button" class="btn btn-ghost btn-sm" data-sp="pause" id="spPause">Pause</button>' + X + '</div>' +
      '<button type="button" class="btn btn-primary" data-sp="mk-ready">We are ready &middot; Partner A starts</button></div>' +
      half('A') + '</div>';
  },
  wire() {
    const b = document.getElementById('spBand'), n = SP.prepMinutes() * 60;
    clock = SP.clock({ duration: n, onTick(e) { b.textContent = SP.fmt(Math.ceil(Math.max(0, n - e))); }, onEnd() { stage.querySelector('.sp-band').classList.add('go'); SP.signal(); say('Your preparation time is over.'); } });
    clock.start();
  },
};
STEPS['mk-ear'] = {
  html() {
    const w = F.mk.who, other = w === 'A' ? 'B' : 'A', p = F.mk[w];
    return shell({ kicker: 'Mock exam &middot; after the Long Turn of Partner ' + w,
      body: '<h1 class="sp-h1">Partner ' + other + ': what did you hear?</h1>' +
        '<p class="sp-p">Answer straight away, before you talk about it. If you recorded the talk, you can listen to it at the end.</p>' +
        ynRows(D().checks.listener, p.ear.ans, 'ear' + w) +
        '<label class="sp-field"><span>One thing your partner did well</span><input type="text" data-ear="' + w + '" value="' + esc(p.ear.good) + '" autocomplete="off"></label>',
      foot: '<button type="button" class="btn btn-primary sp-main" data-sp="mk-next">' + (w === 'A' ? 'Now Partner B talks' : 'On to the Paired Activity') + '</button>' });
  },
};
STEPS['mk-strike'] = {
  html() {
    const k = F.mk, st = k.struck;
    const who = st.A == null ? 'A' : st.B == null ? 'B' : null;
    const cards = k.three.map(id => { const t = SP.topic(id); const by = ['A', 'B'].filter(x => st[x] === id);
      return '<button type="button" class="sp-card sp-strike' + (by.length ? ' out' : '') + (k.paPick === id ? ' win' : '') + '" data-sp="strike" data-topic="' + id + '"' + (who ? '' : ' disabled') + '>' +
        '<span class="sp-card-t">' + esc(t.name) + '</span><span class="sp-card-d">' + (by.length ? 'Crossed out by Partner ' + by.join(' and Partner ') : k.paPick === id ? 'Your topic area for the Paired Activity' : esc(t.keyAspects.slice(0, 3).join(' · '))) + '</span></button>'; }).join('');
    return shell({ kicker: 'Mock exam &middot; Paired Activity',
      body: '<h1 class="sp-h1">' + (who ? 'Partner ' + who + ': cross one out.' : 'Your topic area is chosen.') + '</h1>' +
        '<p class="sp-p">Three topic areas were drawn. The topic areas of your two talks are no longer in the pool. Each of you may cross one out.</p>' +
        '<div class="sp-cards">' + cards + '</div>' +
        (who ? '' : '<p class="sp-p" aria-live="polite">' + (st.A === st.B ? 'You crossed out the same one. In the exam the examiner decides between the other two. Here the choice was made at random.' : 'One topic area is left.') + '</p>'),
      foot: who ? '' : '<button type="button" class="btn btn-primary sp-main" data-sp="pa-show">Show the task &middot; 1 minute to read</button>' });
  },
};
STEPS['mk-end'] = {
  html() {
    const k = F.mk;
    const part = w => { const p = k[w], other = w === 'A' ? 'B' : 'A'; const L = D().checks.listener;
      return '<h2 class="sp-h2">Long Turn, Partner ' + w + ': ' + esc(p.lt.aspect) + '</h2>' + SP.playerHTML(p.take, 'the Long Turn of Partner ' + w) + statsHTML(p.take, p.sec, p.taps[3], true) + takeBtns('mk' + w) +
        '<div class="sp-earsum"><div class="sp-earsum-h">What Partner ' + other + ' heard</div><ul>' + L.map((q, i) => '<li><span>' + esc(q) + '</span><b>' + (p.ear.ans['q' + i] === 'y' ? 'Yes' : p.ear.ans['q' + i] === 'n' ? 'No' : '&ndash;') + '</b></li>').join('') + '</ul>' +
        (p.ear.good ? '<p><strong>Did well:</strong> ' + esc(p.ear.good) + '</p>' : '') + '</div>'; };
    return shell({ kicker: 'Mock exam &middot; the whole picture',
      body: '<h1 class="sp-h1">Your exam, part by part.</h1><p class="sp-p">Listen to each part together and talk about one thing each of you wants to change next time.</p>' +
        part('A') + part('B') +
        '<h2 class="sp-h2">Paired Activity: ' + esc(F.pa.aspect) + '</h2>' + SP.playerHTML(F.paTake, 'your conversation', { noPauses: true }) + statsHTML(F.paTake, F.paSec, null, false, true) + takeBtns('pa') +
        (F.picks.length ? '<p class="sp-p"><strong>You agreed on:</strong> ' + F.picks.map(i => esc(F.pa.options[i])).join(' and ') + '.</p>' : '') +
        '<p class="sp-fine">The recordings are deleted when you finish, unless you save or keep them.</p>',
      foot: '<button type="button" class="btn btn-primary sp-main" data-sp="quit">Finish the mock exam</button>' });
  },
};

/* ─── actions ─────────────────────────────────────────────── */
const ACT = {
  quit() { if (confirmLeave()) closeStage(false); },
  redraw() { drawTwo(); go('draw'); },
  choose(el) {
    const t = SP.topic(el.dataset.topic);
    if (F.mode === 'mock') {
      const k = F.mk, p = k[k.who]; p.topic = t; p.lt = SP.pickFresh(t.longTurns);
      if (k.who === 'A') { k.who = 'B'; drawTwo([t.id]); go('mk-draw'); }
      else { k.who = 'A'; go('mk-prep'); }
      return;
    }
    go('prep', { topic: t, lt: SP.pickFresh(t.longTurns), notes: ['', '', ''], taps: {}, take: null, ans: {}, interrupted: false, wr: null, frame: null });
  },
  pause(el) {
    if (!clock) return;
    if (clock.running()) { clock.pause(); el.textContent = 'Go on'; } else { clock.start(); el.textContent = 'Pause'; }
  },
  ready() { withMic(h => { rec = h; go('talk'); }); },
  'mic-on'() { if (!F.micBusy && F.micNext) askMic(F.micNext); },
  /* also works while the browser is still asking: the late answer is then dropped in askMic */
  'mic-off'() { F.noRec = true; const cb = F.micNext; F.micNext = null; if (cb) cb(null); },
  tap(el) {
    const c = talkCtx(), b = +el.dataset.b;
    if (c.taps[b] == null) c.taps[b] = clock ? clock.elapsed() : 0;
    const cur = c.taps[3] != null ? 3 : 2;
    stage.querySelectorAll('[data-tapline]').forEach(x => { const n = +x.dataset.tapline; x.classList.toggle('on', n === cur); x.classList.toggle('done', n < cur); });
    say('Bullet ' + b + ' marked.');
  },
  'stop-talk'() { finishTalk(); },
  yn(el) {
    const a = ansOf(el.dataset.g); a[el.dataset.id] = el.dataset.v;
    el.parentNode.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b === el ? 'true' : 'false'));
    if (el.dataset.g === 'lt') paintSuggest();
  },
  save(el) { const t = takeOf(el.dataset.k); SP.download(t.take, 'speaking_' + t.id + '_' + SP.today()); },
  keep(el) { const t = takeOf(el.dataset.k); el.disabled = true; SP.keep(t.take, { taskId: t.id, label: t.label }).then(() => { M.toast('Kept on this device'); el.textContent = 'Kept ✓'; }, () => { el.disabled = false; M.toast('Could not keep it. Save it as a file instead.'); }); },
  del(el) {
    if (!window.confirm('Delete this recording?')) return;
    const k = el.dataset.k, t = takeOf(k); SP.dropTake(t.take);
    if (k === 'lt') F.take = null; else if (k === 'b3') F.b3take = null; else if (k === 'pa') F.paTake = null; else F.mk[k.slice(2)].take = null;
    go(F.step);
  },
  ex(el) {
    const id = el.dataset.ex;
    if (id === 'b3') go('b3');
    else if (id === 'write') go('write');
    else { const other = F.topic.longTurns.find(x => x.id !== F.lt.id) || F.lt; SP.dropTake(F.take); go('prep', { lt: other, notes: ['', '', ''], taps: {}, take: null, ans: {}, interrupted: false, wr: null, frame: null }); }
  },
  newtopic() { SP.dropTake(F.take); F.take = null; drawTwo(); go('draw'); },
  'back-review'() { go('review'); },
  frame(el) { F.frame = +el.dataset.i; stage.querySelectorAll('.sp-frame').forEach(b => { const on = b === el; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }); },
  'b3-think'() { if (F.b3take) { SP.dropTake(F.b3take); F.b3take = null; } F.b3ans = {}; go('b3-think'); },
  'b3-go'() { if (F.step !== 'b3-think') return; withMic(h => { rec = h; go('b3-talk'); }); },
  'b3-stop'(pending) {
    if (F.step !== 'b3-talk' || F.stopping) return;
    F.stopping = true;
    F.b3sec = clock ? clock.elapsed() : 0;
    const done = take => { if (!F) { SP.dropTake(take); return; } F.b3take = take; go('b3-review'); };
    const r = rec; rec = null;
    if (pending && pending.then) pending.then(done); else if (r) r.stop().then(done); else done(null);
  },
  'b3-again'() { F.frame = ((F.frame || 0) + 1) % D().checks.frames.length; go('b3'); },
  'wr-save'() {
    const w = F.wr; if (!w) return;
    const lines = ['Long Turn: ' + F.lt.aspect + ' (' + F.topic.name + ')', SP.today(), '', 'What I said (30 seconds from ' + SP.fmt(w.start) + '):', w.text || '(nothing written)', '', 'Mistakes and corrections:'];
    w.pairs.forEach((p, i) => { if (p[0] || p[1]) lines.push((i + 1) + '. ' + p[0] + '  ->  ' + p[1]); });
    SP.downloadText(lines.join('\n'), 'speaking_notes_' + F.lt.id + '_' + SP.today());
  },
  'pa-show'() {
    if (F.mode === 'mock') { F.flip = true; newPaired(F.mk.paPick); }
    go('pa-read');
  },
  'pa-start'() { withMic(h => { rec = h; go('pa-talk'); }); },
  opt(el) {
    const i = +el.dataset.i; F.opt[i] = (F.opt[i] + 1) % 3;
    const lab = ['', 'in', 'out'];
    stage.querySelectorAll('.sp-opt[data-sp="opt"][data-i="' + i + '"]').forEach(b => { b.className = 'sp-opt s' + F.opt[i]; b.querySelector('.tag').textContent = lab[F.opt[i]]; });
  },
  'pa-stop'(pending) {
    if (F.step !== 'pa-talk' || F.stopping) return;
    F.stopping = true;
    F.paSec = clock ? clock.elapsed() : 0;
    SP.markUsed(F.pa.id);
    F.picks = F.opt.map((s, i) => s === 1 ? i : -1).filter(i => i >= 0).slice(0, 2);
    const done = take => { if (!F) { SP.dropTake(take); return; } F.paTake = take; go('pa-end'); };
    const r = rec; rec = null;
    if (pending && pending.then) pending.then(done); else if (r) r.stop().then(done); else done(null);
  },
  pick(el) {
    const i = +el.dataset.i, at = F.picks.indexOf(i);
    if (at >= 0) F.picks.splice(at, 1); else { if (F.picks.length >= 2) F.picks.shift(); F.picks.push(i); }
    stage.querySelectorAll('[data-sp="pick"]').forEach(b => { const on = F.picks.indexOf(+b.dataset.i) >= 0; b.classList.toggle('s1', on); b.setAttribute('aria-pressed', on); });
  },
  'pa-new'() { newPaired(null); F.interrupted = false; go('pa-read'); },
  'mk-begin'() { F.mk.who = 'A'; drawTwo(); go('mk-draw'); },
  'mk-ready'() { F.mk.who = 'A'; withMic(h => { rec = h; go('talk'); }); },
  'mk-next'() {
    const k = F.mk;
    if (F.micBusy) return;
    if (k.who === 'A') { withMic(h => { k.who = 'B'; rec = h; go('talk'); }); return; }
    const rest = D().topics.map(t => t.id).filter(id => id !== k.A.topic.id && id !== k.B.topic.id);
    k.three = M.shuffle(rest).slice(0, 3); k.struck = { A: null, B: null }; k.paPick = null;
    go('mk-strike');
  },
  strike(el) {
    const k = F.mk, id = el.dataset.topic;
    if (k.struck.A == null) k.struck.A = id; else if (k.struck.B == null) k.struck.B = id; else return;
    if (k.struck.B != null) { const left = k.three.filter(x => x !== k.struck.A && x !== k.struck.B); k.paPick = M.shuffle(left)[0]; }
    go('mk-strike');
  },
  'mk-finish'() { go('mk-end'); },
};
function onClick(e) {
  const el = e.target.closest('[data-sp]'); if (!el || !F || el.disabled) return;
  SP.prime();
  const fn = ACT[el.dataset.sp]; if (fn) fn(el);
}
const MAXW = 6;
function onInput(e) {
  const el = e.target; if (!F) return;
  if (el.dataset.note != null) {
    const words = el.value.split(/\s+/).filter(Boolean);
    const hint = document.getElementById('spNoteHint');
    if (words.length > MAXW) { el.value = words.slice(0, MAXW).join(' '); if (hint) { hint.textContent = 'Keywords only. Full sentences turn into a script.'; hint.classList.add('warn'); } }
    else if (hint && hint.classList.contains('warn') && words.length < MAXW) { hint.textContent = 'Keywords only, six for each bullet. Full sentences turn into a script.'; hint.classList.remove('warn'); }
    F.notes[+el.dataset.note] = el.value.trim();
  }
  else if (el.dataset.wr) {
    const k = el.dataset.wr, w = F.wr;
    if (k === 'start') { w.start = +el.value; document.getElementById('spWrFrom').textContent = SP.fmt(w.start); const pl = stage.querySelector('.sp-player'); if (pl && pl._setLoop) { pl._pause(); pl._setLoop({ a: w.start, b: w.start + 30 }); pl._seek(w.start); } }
    else if (k === 'text') w.text = el.value;
    else w.pairs[+k.slice(1)][k[0] === 'a' ? 0 : 1] = el.value;
  }
  else if (el.dataset.ear) F.mk[el.dataset.ear].ear.good = el.value;
  else if (el.hasAttribute('data-flip')) F.flip = el.checked;
}
})();
