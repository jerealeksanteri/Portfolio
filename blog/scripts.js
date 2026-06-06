(async function loadPostList() {
    const listEl = document.getElementById('post-list');
    const emptyEl = document.getElementById('post-empty');
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

    try {
        const res = await fetch('./posts/index.json', { cache: 'no-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const posts = await res.json();

        if (!Array.isArray(posts) || posts.length === 0) {
            listEl.hidden = true;
            emptyEl.hidden = false;
            return;
        }

        const sorted = [...posts].sort((a, b) => {
            const da = new Date(a.date || 0).getTime();
            const db = new Date(b.date || 0).getTime();
            return db - da;
        });

        listEl.innerHTML = sorted.map((p) => {
            const slug = encodeURIComponent(p.slug || '');
            const title = escapeHtml(p.title || '(untitled)');
            const date = escapeHtml(formatDate(p.date));
            const excerpt = escapeHtml(p.excerpt || '');
            const tags = Array.isArray(p.tags) ? p.tags : [];
            const tagsHtml = tags
                .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
                .join('');

            return `
                <li class="post-card">
                    <a href="./post.html?slug=${slug}">
                        <h2>${title}</h2>
                        <div class="post-meta">
                            ${date ? `<time>${date}</time>` : ''}
                            ${tagsHtml ? `<span class="post-tags">${tagsHtml}</span>` : ''}
                        </div>
                        ${excerpt ? `<p>${excerpt}</p>` : ''}
                    </a>
                </li>
            `;
        }).join('');
    } catch (err) {
        console.error('Failed to load post index:', err);
        listEl.hidden = true;
        errorEl.hidden = false;
    }
})();
