console.log("Site geladen! 🇺🇦");

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

// Helper to decide if current document is inside a subfolder like /pages/
function isInSubfolder(folderName) {
	const parts = location.pathname.split('/').filter(Boolean);
	return parts[0] === folderName;
}

const inPages = isInSubfolder('pages');
const partialPrefix = inPages ? '../partials/' : 'partials/';

// After loading header, fix links that use data-href so they work on root and in /pages/
async function loadHeaderAndFixLinks() {
	await loadPartial('site-header', partialPrefix + 'header.html');
	const headerEl = document.getElementById('site-header');
	if (!headerEl) return;
	const anchors = headerEl.querySelectorAll('a[data-href]');
	anchors.forEach(a => {
		const target = a.getAttribute('data-href');
		// If we're in pages/ we need to prefix with ../ unless target is already absolute
		const href = inPages && !target.startsWith('/') ? '../' + target : target;
		a.setAttribute('href', href);
	});
}

loadHeaderAndFixLinks();
loadPartial('site-footer', partialPrefix + 'footer.html');
