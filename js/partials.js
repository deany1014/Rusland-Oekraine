// Partials loader: loads header and footer and fixes data-href links
(function () {
  function fixHeaderLinks(siteBase) {
    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;
    const anchors = headerEl.querySelectorAll('a[data-href]');
    anchors.forEach(a => {
      const target = a.getAttribute('data-href');
      try {
        const resolved = new URL(target, siteBase).href;
        a.setAttribute('href', resolved);
      } catch (e) {
        a.setAttribute('href', target);
      }
    });
  }

  window.loadPartials = async function (siteBase) {
    await window.loadPartial('site-header', siteBase + 'partials/header.html');
    await window.loadPartial('site-footer', siteBase + 'partials/footer.html');
    fixHeaderLinks(siteBase);
  };
})();
