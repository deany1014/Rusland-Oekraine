(function () {
	const COMMITS_ENDPOINT = 'https://api.github.com/repos/deany1014/Rusland-Oekraine/commits?per_page=100';

	function formatDateTime(dateString) {
		if (!dateString) {
			return '';
		}

		const parsed = new Date(dateString);
		if (Number.isNaN(parsed.getTime())) {
			return '';
		}

		return parsed.toLocaleString('nl-NL', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});
	}

	function createCommitCard(commit) {
		const card = document.createElement('article');
		card.className = 'commit-card';

		const message = commit?.commit?.message
			? commit.commit.message.split('\n')[0]
			: 'Geen bericht';

		const author = commit?.commit?.author?.name || 'Onbekende auteur';
		const when = formatDateTime(commit?.commit?.author?.date);
		const link = commit?.html_url || '#';

		card.innerHTML = `
      <h3 class="commit-message">${message}</h3>
      <p class="commit-meta">
        <span class="commit-author">${author}</span>
        ${when ? `<span class="commit-date">${when}</span>` : ''}
      </p>
      <a class="commit-link" href="${link}" target="_blank" rel="noopener noreferrer">
        Bekijk commit →
      </a>
    `;

		return card;
	}

	function loadCommits() {
		const listEl = document.getElementById('commits-list');
		const statusEl = document.getElementById('commits-status');

		if (!listEl || !statusEl || typeof window.fetch !== 'function') {
			return;
		}

		statusEl.textContent = 'Commits worden geladen...';

		fetch(COMMITS_ENDPOINT)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Netwerkantwoord was niet OK');
				}
				return response.json();
			})
			.then((commits) => {
				if (!Array.isArray(commits) || commits.length === 0) {
					statusEl.textContent = 'Geen commits gevonden.';
					return;
				}

				const fragment = document.createDocumentFragment();
				commits.forEach((commit) => {
					fragment.appendChild(createCommitCard(commit));
				});

				listEl.innerHTML = '';
				listEl.appendChild(fragment);
				statusEl.textContent = '';
			})
			.catch((error) => {
				console.error('Kon commits niet laden:', error);
				statusEl.textContent = 'Kon commits niet laden. Probeer het later opnieuw.';
			});
	}

	function init() {
		if (document.getElementById('commits-list')) {
			loadCommits();
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
