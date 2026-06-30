---
page_id: investigacion
layout: page
permalink: /research/
title: research
description: Projects, publications, talks and drafts.
nav: true
nav_order: 2
horizontal: false
---

{% assign tabs = "projects,groups,publications,talks,drafts" | split: "," %}
{% include tabs_nav.liquid tabs=tabs %}

<div class="tab-pane active" id="tab-projects">
  <div class="projects">
    {% assign sorted_projects = site.projects | sort: "importance" %}
    {% if page.horizontal %}
      <div class="container">
        <div class="row row-cols-1 row-cols-md-2">
          {% for project in sorted_projects %}
            {% include projects_horizontal.liquid %}
          {% endfor %}
        </div>
      </div>
    {% else %}
      <div class="row row-cols-1 row-cols-md-3">
        {% for project in sorted_projects %}
          {% include projects.liquid %}
        {% endfor %}
      </div>
    {% endif %}
  </div>
</div>

<div class="tab-pane" id="tab-groups">
  {% include groups.liquid %}
</div>

<div class="tab-pane" id="tab-publications">
  {% include bib_search.liquid %}

  <div class="publications">

{% bibliography %}

  </div>
</div>

<div class="tab-pane" id="tab-talks">
  {% include presentaciones.liquid %}
</div>

<div class="tab-pane" id="tab-drafts">
  {% include drafts.liquid %}
</div>
