---
layout: archive
permalink: /blog/
title: "Blog"
description: "Occasional technical notes by Ahmad M. Alkadri."
author_profile: true
redirect_from:
  - /year-archive/
  - /wordpress/blog-posts/
---

I use this space for occasional dated notes. The previous entries in this repository were upstream template demonstrations, so no posts are currently published.

{% if site.posts.size > 0 %}
  {% for post in site.posts %}
    {% include archive-single.html %}
  {% endfor %}
{% endif %}
