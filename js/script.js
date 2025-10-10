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

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const gridSize = 50;
let mouse = { x: 0, y: 0 };

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < canvas.width; x += gridSize) {
    for (let y = 0; y < canvas.height; y += gridSize) {
      // afstand tot muis berekenen
      let dx = mouse.x - x;
      let dy = mouse.y - y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      let alpha = Math.min(0.3, 1 / (dist / 50 + 1));

      ctx.strokeStyle = `rgba(255, 213, 79, ${alpha})`; // lichtgele lijnen
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + gridSize, y);
      ctx.lineTo(x + gridSize, y + gridSize);
      ctx.lineTo(x, y + gridSize);
      ctx.closePath();
      ctx.stroke();
    }
  }

  requestAnimationFrame(drawGrid);
}

drawGrid();
