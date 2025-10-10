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

// Determine base path: if this page is under /pages/ we need to go up one level for partials
const isInPages = location.pathname.startsWith('/pages/');
const partialPrefix = isInPages ? '../partials/' : 'partials/';

loadPartial('site-header', partialPrefix + 'header.html');
loadPartial('site-footer', partialPrefix + 'footer.html');
