// Ensure favicon uses the same siteBase (fixes GitHub Pages project site paths)
try {
	let iconLink = document.querySelector("link[rel~='icon']");
	if (!iconLink) {
		iconLink = document.createElement('link');
		iconLink.rel = 'icon';
		document.head.appendChild(iconLink);
	}
	// Try to use the real favicon on the server; if it's missing/invalid, fall back to an embedded tiny icon
	(async () => {
		const candidate = siteBase + 'static/favicon.ico';
		try {
			const res = await fetch(candidate, { method: 'HEAD' });
			if (res.ok) {
				iconLink.href = candidate;
				return;
			}
		} catch (e) {
			// ignore and fall back
		}
		// Embedded 16x16 placeholder icon (tiny base64 ICO)
		iconLink.href = 'data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBAAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAMAAAAAAAAAAAAA////AA==';
	})();
} catch (e) {
	console.warn('Kon favicon niet zetten:', e);
}