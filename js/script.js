// Minimal bootstrap loader: compute siteBase, load helper scripts, then initialize
(function () {
	function loadScript(src) {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = src;
			script.defer = true;
			script.onload = () => resolve();
			script.onerror = (e) => reject(e);
			document.head.appendChild(script);
		});
	}

	const scriptUrl = (document.currentScript && document.currentScript.src)
		? new URL(document.currentScript.src)
		: new URL(location.href);
	const siteBase = scriptUrl.origin + scriptUrl.pathname.replace(/\/js\/[^/]+$/, '/');

	// expose siteBase globally for other scripts
	window.siteBase = siteBase;

	// load helper scripts in order
	loadScript(siteBase + 'js/utils.js')
		.then(() => loadScript(siteBase + 'js/partials.js'))
		.then(() => loadScript(siteBase + 'js/favicon.js'))
		.then(() => loadScript(siteBase + 'js/background.js'))
		.then(() => loadScript(siteBase + 'js/grafieken.js'))
		.then(() => {
			// initialize partials
			if (window.loadPartials) {
				window.loadPartials(siteBase);
			}
			console.log('Site geladen! 🇺🇦');
		})
		.catch(err => console.error('Kon scripts niet laden:', err));
})();