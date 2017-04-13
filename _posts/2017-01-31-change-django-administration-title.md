---
id: 354
title: Change django administration title
date: 2017-01-31T12:56:13+00:00
author: Navy Su
layout: post
url: /2017/01/31/change-django-administration-title/
categories:
---
There are two ways to change them.

  1. Create //templates/admin/base_site.html file with the following content
  
    ```python
    { % extends "admin/base.html" %}

{ % block title %}{{ title }} | Your website title here { % endblock %}

{ % block branding %}

&lt;h1 id="site-name"&gt;

    &lt;a href="{ % url 'admin:index' %}"&gt;Your website title here&lt;/a&gt;

&lt;/h1&gt;

{ % endblock %}

```
    
    The original file is <a href="https://github.com/django/django/blob/master/django/contrib/admin/templates/admin/base_site.html" target="_blank">https://github.com/django/django/blob/master/django/contrib/admin/templates/admin/base_site.html</a></li> 
    
      * Change settings.py and urls.py
  
        
        ```python
        $ vi settings.py

...

ADMIN_SITE_HEADER = "My shiny new administration"

...

```
        
    ```bash
$ vi urls.py

from django.conf import settings

...

admin.site.site_title = settings.ADMIN_SITE_HEADER

admin.site.site_header = settings.ADMIN_SITE_HEADER

...

```
        
        Source: <http://stackoverflow.com/questions/4938491/django-admin-change-header-django-administration-text></li> </ol>
