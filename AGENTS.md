# Repository operating contract

- This repository is Ahmad M. Alkadri's Jekyll/GitHub Pages personal site. Keep the existing academic site identity intact.
- Content lives in `_pages/` and `_posts/`; layouts and includes live in `_layouts/` and `_includes/`; Sass is in `_sass/`; site assets are in `assets/`, `images/`, and `files/`.
- Use the checked-in Bundler workflow: `bundle install`, `bundle exec jekyll serve --config _config.yml,_config.dev.yml`, and `bundle exec jekyll build --config _config.yml` for a production-style build.
- Work in thin, coherent slices: inspect, make the smallest useful change, build/test, inspect rendered output when presentation changes, then commit only the accepted slice.
- Preserve pre-existing user changes. Active draft posts must never be staged or committed unless explicitly requested. When the tree is dirty, stage explicit intended paths only; never use broad staging.
- User-authored prose should use Canadian English spelling (`en-CA`). Preserve the original spelling of quotations, titles, proper nouns, code, and externally sourced text.
- For blog posts, use `excerpt` as short, accurate, plain descriptive metadata—a description, summary, or advertisement for archive, search, and social previews: explain what the article is about and, when useful, why it is worth reading; do not duplicate its opening sentence or repeat repository links already shown elsewhere.
- Verify before expanding scope. Do not perform unrelated cleanup or push changes unless explicitly requested.
- Keep Markdown math compatible with the opt-in MathJax setup and future Quarto-style `$...$` / `$$...$$` conventions. Protect code, equations, figures, and responsive behavior in rendered review.
