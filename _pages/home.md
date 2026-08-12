---
permalink: /
title:
description: "Ahmad M. Alkadri is a researcher, engineer, and mathematician working in continuum mechanics, scientific computing, and quantum algorithms."
author_profile: true
---

<p class="eyebrow">Mechanics · Numerical Methods · Quantum Algorithms</p>

<p class="intro">I am a postdoctoral scholar at UC Berkeley working in continuum mechanics, numerical methods, and quantum scientific computing. My research spans the mechanics and dynamics of lipid membranes, computational methods for partial differential equations, and quantum algorithms for scientific problems.</p>

I also build scientific software, tools for mathematical visualization, and practical workflows for agent-assisted engineering. This site brings together my research, publications, projects, and writing.

{% if site.posts.size > 0 %}
<section class="recent-writing" aria-labelledby="recent-writing-title">
  <div class="recent-writing__header">
    <h2 id="recent-writing-title" class="recent-writing__title">Recent writing</h2>
    <a class="recent-writing__archive-link" href="{{ '/blog/' | relative_url }}">Blog</a>
  </div>
  <ol class="recent-writing__list">
    {% for post in site.posts limit:3 %}
      <li class="recent-writing__item">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <time class="recent-writing__date" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time>
      </li>
    {% endfor %}
  </ol>
</section>
{% endif %}

<section class="moments-gallery" aria-labelledby="moments-gallery-title">
  <h2 id="moments-gallery-title" class="moments-gallery__title">Moments</h2>
  <div class="moments-gallery__grid">
    <figure class="moments-gallery__tile moments-gallery__tile--hills">
      <img src="{{ '/images/banner/web/sunlit-hills.webp' | relative_url }}"
           alt="A sunlit trail crossing green hills"
           width="900"
           height="1200"
           loading="lazy"
           decoding="async">
    </figure>
    <figure class="moments-gallery__tile moments-gallery__tile--booth">
      <img src="{{ '/images/banner/web/london-phone-booth.webp' | relative_url }}"
           alt="Ahmad standing inside a red London telephone box"
           width="500"
           height="1200"
           loading="lazy"
           decoding="async">
    </figure>
    <figure class="moments-gallery__tile moments-gallery__tile--terrace">
      <img src="{{ '/images/banner/web/stone-terrace.webp' | relative_url }}"
           alt="Ahmad seated on a sunlit stone terrace"
           width="900"
           height="1200"
           loading="lazy"
           decoding="async">
    </figure>
    <figure class="moments-gallery__tile moments-gallery__tile--snow">
      <img src="{{ '/images/banner/web/snow-pinecones.webp' | relative_url }}"
           alt="Pinecones resting on a snow-covered rock"
           width="900"
           height="1200"
           loading="lazy"
           decoding="async">
    </figure>
    <figure class="moments-gallery__tile moments-gallery__tile--coast">
      <img src="{{ '/images/banner/web/coastal-hills.webp' | relative_url }}"
           alt="Golden coastal hills above the ocean"
           width="900"
           height="1200"
           loading="lazy"
           decoding="async">
    </figure>
    <figure class="moments-gallery__tile moments-gallery__tile--canal">
      <img src="{{ '/images/banner/web/amsterdam-canal.webp' | relative_url }}"
           alt="Ahmad standing on a bridge beside an Amsterdam canal"
           width="900"
           height="1200"
           loading="lazy"
           decoding="async">
    </figure>
  </div>
</section>
