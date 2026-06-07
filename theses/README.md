# Theses

Lists academic theses with a readiness status, progress bar, and an embedded
PDF viewer. Linked from the Education section on the homepage (clicking the
B.Sc. or M.Sc. items opens this page).

## Add or update a thesis

1. Drop the PDF into [`pdfs/`](pdfs/) (e.g. `pdfs/bsc.pdf`).
2. Open [`index.json`](index.json) and edit the matching entry, or add a new
   one with this shape:

   ```json
   {
       "id": "bsc",
       "level": "B.Sc.",
       "title": "Real Title Here",
       "school": "Tampere University",
       "year": "2022 - 2026",
       "supervisor": "Prof. Example",
       "status": "drafting",
       "progress": 55,
       "excerpt": "One-line summary used on the listing page.",
       "abstract": "Full abstract text \u2014 shown on the thesis page.",
       "pdf": "pdfs/bsc.pdf"
   }
   ```

3. Commit & push. The viewer page is `theses/thesis.html?id=<id>`.

## Status values

| status      | label       | default % |
| ----------- | ----------- | --------- |
| `planning`  | Planning    | 5         |
| `research`  | Research    | 25        |
| `drafting`  | Drafting    | 50        |
| `review`    | In Review   | 75        |
| `final`     | Finalizing  | 95        |
| `defended`  | Defended    | 100       |

If `progress` is set explicitly it overrides the default. Values are clamped
to 0\u2013100.

## Notes

- `pdf` must be a same-origin relative path. Absolute URLs (`http://`,
  `https://`, `//\u2026`) are rejected so a manifest edit can't redirect the
  viewer to an external host.
- If `pdf` is `null` or missing, the viewer shows a "not available yet"
  placeholder with the current status \u2014 useful for in-progress work.
- PDFs render in an `<iframe>`, which uses each browser's native PDF viewer.
- The Education section on the homepage links B.Sc. and M.Sc. items to
  `theses/thesis.html?id=bsc` and `?id=msc` respectively.
