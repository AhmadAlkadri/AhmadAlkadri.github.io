---
layout: archive
title: "Publications"
permalink: /publications/
description: "Journal articles and preprints by Ahmad M. Alkadri."
author_profile: true
---

This page lists my journal articles and public preprints, with links to the published record, arXiv versions, associated code, and reusable citations. See also [Google Scholar]({{ site.author.googlescholar }}).

{% assign published = site.data.publications | where: "group", "published" %}
{% assign preprints = site.data.publications | where: "group", "preprint" %}

## Journal articles

{% include publication-list.html publications=published %}

## Preprints

{% include publication-list.html publications=preprints %}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {% for publication in site.data.publications %}
    {
      "@type": "ListItem",
      "position": {{ forloop.index }},
      "item": {
        "@type": "ScholarlyArticle",
        "name": {{ publication.title | jsonify }},
        "author": {{ publication.authors | jsonify }},
        "datePublished": "{{ publication.year }}",
        "url": {{ publication.doi_url | default: publication.arxiv_url | jsonify }}{% if publication.doi %},
        "identifier": "https://doi.org/{{ publication.doi }}"{% endif %}
      }
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>
