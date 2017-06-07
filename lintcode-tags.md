---
layout:   page
title:    Lint/LeetCode Tags
---
{% comment%}
Here we generate all the tags.
{% endcomment%}

{% assign rawtags = "" %}
{% for post in site.lintcodes %}
{% assign ttags = post.tags | join:'|' | append:'|' %}
{% assign rawtags = rawtags | append:ttags %}
{% endfor %}

{% assign rawtags = rawtags | split:'|' | sort %}

{% assign tags = "" %}

{% for tag in rawtags %}
{% if tag != "" %}

{% if tags == "" %}
{% assign tags = tag | split:'|' %}
{% endif %}

{% unless tags contains tag %}
{% assign tags = tags | join:'|' | append:'|' | append:tag | split:'|' %}
{% endunless %}
{% endif %}
{% endfor %}


<p>
{% for tag in tags %}
<a href="#{{ tag | slugify }}" class="codinfox-tag-mark"> {{ tag }} </a> &nbsp;&nbsp;
{% endfor %}

{% for tag in tags %}
<h2 id="{{ tag | slugify }}">{{ tag }}</h2>
  <table width="100%">
      <tr>
            <th>#</th>
            <th>Title</th>
            <th>Difficulty</th>
      </tr>
  {% assign myindex = 0 %}
  {% for post in site.lintcodes %}
  {% if post.tags contains tag %}
  {% assign myindex = myindex | plus: 1 %}
  <tr class="clickable-row" data-href="{{ site.baseurl }}{{ post.url }}">
        <td>{{ myindex }}</td>
        <td><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></td>
        <td><span class="difficulty {{post.difficulty}}">{{ post.difficulty }}</span></td>
   </tr> 
  {% endif %}
  {% endfor %}
</table>
{% endfor %}

