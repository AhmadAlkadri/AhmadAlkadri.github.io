---
title: "Tags"
layout: archive
permalink: /tags/
author_profile: false
---

{% assign sorted_tags = site.tags | sort %}
{% for tag in sorted_tags %}
  {% assign tag_name = tag[0] %}
  <section class="taxonomy-group" id="{{ tag_name | slugify }}">
    <h2>{{ tag_name }}</h2>
    {% for post in tag[1] %}
      {% include archive-single.html %}
    {% endfor %}
  </section>
{% endfor %}
