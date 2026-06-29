---
page_id: investigacion
layout: page
permalink: /investigacion/
title: investigación
description: Proyectos, publicaciones, presentaciones y drafts.
nav: true
nav_order: 2
display_categories: [work, fun]
horizontal: false
---

{% assign tabs = "proyectos,grupos,publicaciones,presentaciones,drafts" | split: "," %}
{% include tabs_nav.liquid tabs=tabs %}

<div class="tab-pane active" id="tab-proyectos">
  <div class="projects">
    {% if site.enable_project_categories and page.display_categories %}
      {% for category in page.display_categories %}
        <a id="{{ site.data[site.active_lang].strings.categories[category] }}" href=".#{{ site.data[site.active_lang].strings.categories[category] }}">
          <h2 class="category">{{ site.data[site.active_lang].strings.categories[category] }}</h2>
        </a>
        {% assign categorized_projects = site.projects | where: "category", category %}
        {% assign sorted_projects = categorized_projects | sort: "importance" %}
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
      {% endfor %}
    {% else %}
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
    {% endif %}
  </div>
</div>

<div class="tab-pane" id="tab-grupos">
  {% include groups.liquid %}
</div>

<div class="tab-pane" id="tab-publicaciones">
  {% include bib_search.liquid %}

  <div class="publications">

  {% bibliography %}

  </div>
</div>

<div class="tab-pane" id="tab-presentaciones">
  {% include presentaciones.liquid %}
</div>

<div class="tab-pane" id="tab-drafts">
  {% include drafts.liquid %}
</div>
