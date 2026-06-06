(async function loadPost() {
    const titleEl = document.getElementById('post-title');
    const dateEl = document.getElementById('post-date');
    const tagsEl = document.getElementById('post-tags');
    const bodyEl = document.getElementById('post-body');
    const errorEl = document.getElementById('post-error');

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, (c) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[c]));
    }

    function formatDate(iso) {
        if (!iso) return '';
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return iso;
        return d.toISOString().slice(0, 10);
    }

    function showError(msg) {
        titleEl.textContent = 'Not found';
        bodyEl.hidden = true;
        errorEl.textContent = msg || 'Post not found.';
        errorEl.hidden = false;
    }

    // Slug must match a known post in the manifest — never trust query strings.
    const params = new URLSearchParams(window.location.search);
    const requestedSlug = params.get('slug');

    if (!requestedSlug) {
        showError('No post specified.');
        return;
    }

    try {
        const indexRes = await fetch('./posts/index.json', { cache: 'no-cache' });
        if (!indexRes.ok) throw new Error(`Index HTTP ${indexRes.status}`);
        const posts = await indexRes.json();

        const meta = Array.isArray(posts)
            ? posts.find((p) => p && p.slug === requestedSlug)
            : null;

        if (!meta) {
            showError('Post not found.');
            return;
        }

        const safeSlug = encodeURIComponent(meta.slug);
        const mdRes = await fetch(`./posts/${safeSlug}.md`, { cache: 'no-cache' });
        if (!mdRes.ok) throw new Error(`Markdown HTTP ${mdRes.status}`);
        const markdown = await mdRes.text();

        document.title = `${meta.title} · Jere Niemi`;
        titleEl.textContent = meta.title || '(untitled)';
        dateEl.textContent = formatDate(meta.date);
        dateEl.dateTime = meta.date || '';

        const tags = Array.isArray(meta.tags) ? meta.tags : [];
        tagsEl.innerHTML = tags
            .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
            .join('');

        if (typeof marked === 'undefined' || typeof DOMPurify === 'undefined') {
            throw new Error('Markdown renderer not loaded.');
        }

        marked.setOptions({ gfm: true, breaks: false, headerIds: true, mangle: false });
        const rawHtml = marked.parse(markdown);
        bodyEl.innerHTML = DOMPurify.sanitize(rawHtml);
    } catch (err) {
        console.error('Failed to load post:', err);
        showError('Failed to load post.');
    }
})();
