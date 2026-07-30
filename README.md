# Ahmad M. Alkadri — personal website

This repository contains the source for [ahmadalkadri.github.io](https://ahmadalkadri.github.io), a restrained academic personal site built with Jekyll and the GitHub Pages gem set.

The site retains the useful two-column structure of Academic Pages while using site-specific content, structured publication data, a small Sass refresh, and dependency-free navigation JavaScript. The primary pages are About, Research, Publications, Projects, Blog, and CV.

## Local development

Use a current Ruby and the Bundler version recorded in `Gemfile.lock`:

```bash
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve --config _config.yml,_config.dev.yml
```

Then open <http://localhost:4000>.

Build the production site with:

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

On the current macOS development machine, Homebrew Ruby may need to be placed before the system Ruby:

```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
```

There is no Node or JavaScript build step. See [`docs/site-maintenance.md`](docs/site-maintenance.md) for content, asset, validation, and deployment workflows.
