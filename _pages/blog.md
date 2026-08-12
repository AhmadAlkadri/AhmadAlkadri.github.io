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

{% if site.posts.size > 0 %}
  {% for post in site.posts %}
    {% include archive-single.html %}
  {% endfor %}
{% endif %}
