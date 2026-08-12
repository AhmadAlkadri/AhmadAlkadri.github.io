# Technical diagrams

Mermaid source files in `source/` are authoritative. Generated SVGs in `generated/` are checked-in website assets so readers do not need Mermaid in the browser.

After installing the pinned development dependency with `npm ci`, render every source with:

```text
npm run diagrams
```

The renderer uses a locally installed Chrome when available. In an environment without Chrome, install Puppeteer's pinned headless shell once with `npx puppeteer browsers install chrome-headless-shell`, then run the same command.
