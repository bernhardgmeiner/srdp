/* ════════════════════════════════════════════════════════════
   Theme H helpers
   1. Tab rows scroll sideways on phones. After every render the active
      tab is brought into view, so you always see what is selected.
   2. The browser bar colour (meta theme-color) follows light and dark.
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
/* Only when the row or its active tab is new: a row the reader has scrolled by hand is left alone. */
var seen = typeof WeakMap === 'function' ? new WeakMap() : null;
function showActiveTabs() {
  var rows = document.querySelectorAll('#main .tabs');
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    if (row.scrollWidth <= row.clientWidth + 1) continue;
    var a = row.querySelector('.tab.active');
    if (!a) continue;
    if (seen) { if (seen.get(row) === a) continue; seen.set(row, a); }
    var left = a.offsetLeft - row.offsetLeft;
    var target = left - (row.clientWidth - a.offsetWidth) / 2;
    var max = row.scrollWidth - row.clientWidth;
    row.scrollLeft = Math.max(0, Math.min(max, target));
  }
}
/* Phone layout of wide tables: every cell carries its column heading. */
function labelCells() {
  var tables = document.querySelectorAll('#main table.tbl');
  for (var i = 0; i < tables.length; i++) {
    var t = tables[i];
    if (t.getAttribute('data-labelled')) continue;
    var heads = t.querySelectorAll('thead th');
    if (heads.length < 4) continue;
    var rows = t.querySelectorAll('tbody tr');
    for (var r = 0; r < rows.length; r++) {
      var cells = rows[r].children;
      for (var c = 0; c < cells.length && c < heads.length; c++) cells[c].setAttribute('data-label', heads[c].textContent.replace(/\s+/g, ' ').trim());
    }
    t.setAttribute('data-labelled', '1');
  }
}
var queued = false;
function queue() {
  if (queued) return;
  queued = true;
  (window.requestAnimationFrame || setTimeout)(function () { queued = false; showActiveTabs(); labelCells(); });
}
var main = document.getElementById('main');
if (main && 'MutationObserver' in window) {
  new MutationObserver(queue).observe(main, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
}
window.addEventListener('resize', queue);
queue();

function paintBar() {
  var m = document.querySelector('meta[name="theme-color"]');
  if (m) m.setAttribute('content', document.documentElement.getAttribute('data-theme') === 'dark' ? '#241f15' : '#fff6dc');
}
if ('MutationObserver' in window) {
  new MutationObserver(paintBar).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}
paintBar();
})();
