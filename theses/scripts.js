// Status taxonomy — must match the values used in index.json.
const STATUS_LABELS = {
    planning: 'Planning',
    research: 'Research',
    drafting: 'Drafting',
    review: 'In Review',
    final: 'Finalizing',
    defended: 'Defended'
};

const STATUS_DEFAULT_PROGRESS = {
    planning: 5,
    research: 25,
    drafting: 50,
    review: 75,
    final: 95,
    defended: 100
};

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[c]));
}

function statusKey(status) {
    const key = String(status || '').toLowerCase().trim();
    return STATUS_LABELS[key] ? key : 'planning';
}

function statusLabel(status) {
    return STATUS_LABELS[statusKey(status)];
}

function clampProgress(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(100, Math.round(n)));
}

function progressFor(thesis) {
    if (thesis && thesis.progress != null) return clampProgress(thesis.progress);
    return STATUS_DEFAULT_PROGRESS[statusKey(thesis && thesis.status)] || 0;
}

(async function loadThesesList() {
    const listEl = document.getElementById('theses-list');
    const emptyEl = document.getElementById('theses-empty');
    const errorEl = document.getElementById('theses-error');

    try {
        const res = await fetch('./index.json', { cache: 'no-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const theses = await res.json();

        if (!Array.isArray(theses) || theses.length === 0) {
            listEl.hidden = true;
            emptyEl.hidden = false;
            return;
        }

        // Newest year first.
        const sorted = [...theses].sort((a, b) => {
            const ya = parseInt(String(a.year || '').match(/\d{4}/g)?.slice(-1)[0] || '0', 10);
            const yb = parseInt(String(b.year || '').match(/\d{4}/g)?.slice(-1)[0] || '0', 10);
            return yb - ya;
        });

        listEl.innerHTML = sorted.map((t) => {
            const id = encodeURIComponent(t.id || '');
            const level = escapeHtml(t.level || '');
            const title = escapeHtml(t.title || '(untitled)');
            const school = escapeHtml(t.school || '');
            const year = escapeHtml(t.year || '');
            const excerpt = escapeHtml(t.excerpt || t.abstract || '');
            const sKey = statusKey(t.status);
            const sLabel = escapeHtml(statusLabel(t.status));
            const progress = progressFor(t);

            return `
                <li class="thesis-card">
                    <a href="./thesis.html?id=${id}">
                        <div class="thesis-heading">
                            ${level ? `<span class="thesis-level">${level}</span>` : ''}
                            <h2>${title}</h2>
                        </div>
                        <div class="thesis-meta">
                            ${school ? `<span>${school}</span>` : ''}
                            ${year ? `<span>${year}</span>` : ''}
                        </div>
                        ${excerpt ? `<p class="excerpt">${excerpt}</p>` : ''}
                        <div class="status-row">
                            <span class="status-badge" data-status="${sKey}">${sLabel}</span>
                            <div class="progress-track" aria-hidden="true">
                                <div class="progress-fill" style="width: ${progress}%"></div>
                            </div>
                            <span class="progress-label">${progress}%</span>
                        </div>
                    </a>
                </li>
            `;
        }).join('');
    } catch (err) {
        console.error('Failed to load theses index:', err);
        listEl.hidden = true;
        errorEl.hidden = false;
    }
})();
