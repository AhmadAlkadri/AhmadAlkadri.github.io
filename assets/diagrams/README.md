# Technical diagrams

Mermaid source files in `source/` are authoritative. Generated SVGs in `generated/` are checked-in website assets so readers do not need Mermaid in the browser.

After installing the pinned development dependency with `npm ci`, render every source with:

```text
npm run diagrams
```

The renderer uses a locally installed Chrome when available. In an environment without Chrome, install Puppeteer's pinned headless shell once with `npx puppeteer browsers install chrome-headless-shell`, then run the same command.

The reusable `_includes/technical-figure.html` include accepts an optional `ratio` value such as `"532 / 1044"`. Supplying the source SVG's `viewBox` ratio reserves space before a lazy-loaded figure arrives and prevents layout shift.
