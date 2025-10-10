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

// Determine site base using the actual script URL so paths are correct on GitHub Pages
// document.currentScript.src gives an absolute URL (e.g. https://.../Rusland-Oekraine/js/script.js)
const scriptUrl = (document.currentScript && document.currentScript.src)
	? new URL(document.currentScript.src)
	: new URL(location.href);
// siteBase ends with a trailing slash, pointing to repo root (or site root)
const siteBase = scriptUrl.origin + scriptUrl.pathname.replace(/\/js\/[^/]+$/, '/');

// Load partials from the computed siteBase
loadPartial('site-header', siteBase + 'partials/header.html');
loadPartial('site-footer', siteBase + 'partials/footer.html');

// After header is available, convert data-href targets into absolute hrefs based on siteBase
async function fixHeaderLinks() {
	const headerEl = document.getElementById('site-header');
	if (!headerEl) return;
	const anchors = headerEl.querySelectorAll('a[data-href]');
	anchors.forEach(a => {
		const target = a.getAttribute('data-href');
		// new URL will resolve relative to siteBase correctly
		try {
			const resolved = new URL(target, siteBase).href;
			a.setAttribute('href', resolved);
		} catch (e) {
			// fallback: set as given
			a.setAttribute('href', target);
		}
	});
}

// Retry until header is loaded (header is inserted asynchronously)
let attempts = 0;
const maxAttempts = 20;
const retryInterval = 150;
const linkFixer = setInterval(() => {
	const headerEl = document.getElementById('site-header');
	if (headerEl || attempts >= maxAttempts) {
		clearInterval(linkFixer);
		fixHeaderLinks();
	}
	attempts++;
}, retryInterval);
