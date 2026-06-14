const STATUS_LABELS = {
    planning: 'Planning',
    research: 'Research',
    drafting: 'Drafting',
    review: 'In Review',
    final: 'Finalizing',
    graded: 'Graded'
};

const STATUS_DEFAULT_PROGRESS = {
    planning: 5,
    research: 25,
    drafting: 50,
    review: 75,
    final: 95,
    graded: 100
};

function statusKey(status) {
    const key = String(status || '').toLowerCase().trim();
    return STATUS_LABELS[key] ? key : 'planning';
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

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value || '';
}

function showError(msg) {
    document.querySelector('.viewer-section').hidden = true;
    const abstractSection = document.getElementById('abstract-section');
    if (abstractSection) abstractSection.hidden = true;
    setText('thesis-title', 'Not found');
    const errorEl = document.getElementById('thesis-error');
    errorEl.textContent = msg || 'Thesis not found.';
    errorEl.hidden = false;
}

(async function loadThesis() {
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get('id');

    if (!requestedId) {
        showError('No thesis specified.');
        return;
    }

    try {
        const indexRes = await fetch('./index.json', { cache: 'no-cache' });
        if (!indexRes.ok) throw new Error(`Index HTTP ${indexRes.status}`);
        const theses = await indexRes.json();

        const meta = Array.isArray(theses)
            ? theses.find((t) => t && t.id === requestedId)
            : null;

        if (!meta) {
            showError('Thesis not found.');
            return;
        }

        document.title = `${meta.level || 'Thesis'} \u00b7 ${meta.title || ''} \u00b7 Jere Niemi`;
        setText('thesis-level', meta.level || '');
        setText('thesis-title', meta.title || '(untitled)');
        setText('thesis-school', meta.school || '');
        setText('thesis-year', meta.year || '');
        setText('thesis-supervisor', meta.supervisor ? `Supervisor: ${meta.supervisor}` : '');

        const grade = meta.grade || 'N/A';
        const gradeEl = document.getElementById('thesis-grade');
        gradeEl.textContent = `Grade: ${grade}`;
        gradeEl.dataset.grade = grade;

        const sKey = statusKey(meta.status);
        const badge = document.getElementById('thesis-status');
        badge.textContent = STATUS_LABELS[sKey];
        badge.dataset.status = sKey;

        const progress = progressFor(meta);
        const fill = document.getElementById('thesis-progress');
        const label = document.getElementById('thesis-progress-label');
        // Defer slightly so the CSS transition runs from 0 \u2192 progress.
        requestAnimationFrame(() => {
            fill.style.width = `${progress}%`;
        });
        label.textContent = `${progress}%`;

        if (meta.abstract) {
            document.getElementById('abstract-section').hidden = false;
            setText('thesis-abstract', meta.abstract);
        }

        renderViewer(meta);
    } catch (err) {
        console.error('Failed to load thesis:', err);
        showError('Failed to load thesis.');
    }
})();

function renderViewer(meta) {
    const container = document.getElementById('viewer-container');
    const downloadLink = document.getElementById('thesis-download');

    if (!meta.pdf) {
        const sKey = statusKey(meta.status);
        const label = STATUS_LABELS[sKey];
        container.innerHTML = `
            <p class="viewer-placeholder">
                <strong>No document available yet</strong>
                Status: ${label}.<br>
                The PDF will be published here once the work progresses.
            </p>
        `;
        return;
    }

    // Only allow same-origin relative paths to prevent injecting external URLs via the manifest.
    const safePath = String(meta.pdf).trim();
    if (/^[a-z]+:\/\//i.test(safePath) || safePath.startsWith('//')) {
        console.warn('Refusing to load non-relative PDF path:', safePath);
        container.innerHTML = `
            <p class="viewer-placeholder">
                <strong>Document path not allowed</strong>
                Only PDFs hosted alongside the site can be embedded.
            </p>
        `;
        return;
    }

    // Browsers render PDFs natively in <iframe> on desktop. Show a fallback if blocked.
    container.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = safePath;
    iframe.title = `${meta.title} (PDF)`;
    iframe.setAttribute('loading', 'lazy');
    container.appendChild(iframe);

    downloadLink.hidden = false;
    downloadLink.href = safePath;
}
