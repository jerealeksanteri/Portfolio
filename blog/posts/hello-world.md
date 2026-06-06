# Hello, world

Welcome to the blog. This is where I'll drop notes on things I'm building,
breaking, and learning — mostly around software architecture, embedded
systems, and the occasional deep-dive into something that nerd-sniped me.

## Why a blog?

A portfolio shows _what_ I've done. A blog shows _how_ I think.

## How this is built

- Static HTML + vanilla JS, no framework.
- Posts are Markdown files in `blog/posts/`.
- A small `index.json` manifest lists post metadata.
- [marked](https://github.com/markedjs/marked) renders Markdown,
  [DOMPurify](https://github.com/cure53/DOMPurify) sanitizes the output.
- Hosted on GitHub Pages — same deploy as the rest of the site.

```js
// New post = drop a .md file + add an entry to index.json. Done.
```

More soon.
