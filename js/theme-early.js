/* Runs before the stylesheet paints: sets the saved theme, so dark mode does not flash light on load.
   Kept as a file because the page's security policy does not allow inline scripts. */
(function () {
  try {
    var t = JSON.parse(localStorage.getItem('mwg_theme'));
    if (t === 'dark' || t === 'light') document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
})();
