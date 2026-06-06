# Blog

Static, Markdown-driven blog served from `/blog/`.

## Add a new post

1. Create `blog/posts/<slug>.md` (slug = URL-safe filename, e.g. `my-post`).
2. Add an entry to `blog/posts/index.json`:

   ```json
   {
       "slug": "my-post",
       "title": "My Post",
       "date": "2026-06-06",
       "tags": ["tag-a"],
       "excerpt": "One-line summary shown on the listing page."
   }
   ```

3. Commit & push. GitHub Pages will serve it at
   `/blog/post.html?slug=my-post`.

## How it works

- `index.html` — list view, fetches `posts/index.json` and renders cards.
- `post.html` — single-post view, reads `?slug=` from the URL,
  validates against the manifest, then fetches `posts/<slug>.md`.
- `marked` + `DOMPurify` (loaded from CDN with SRI) render and
  sanitize Markdown client-side. The slug is never used to build a fetch
  URL until it's been matched against the manifest, so a crafted query
  string can't pull arbitrary files.
