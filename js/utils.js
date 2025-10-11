// Utilities used by other scripts
async function loadPartial(id, path) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(res.statusText);
    const html = await res.text();
    el.innerHTML = html;
  } catch (err) {
    console.warn('Kon partial niet laden:', path, err);
  }
}

// Export to global namespace (non-module environment)
window.loadPartial = loadPartial;
