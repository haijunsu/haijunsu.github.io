---
title: Datepicker in Drupal 7
author: Haijun (Navy) Su
layout: post
tags: [drupal, datepicker]
---

* Add code in php.tpl.
```
drupal_add_library('system', 'ui.datepicker');
drupal_add_js("(function ($) { $('.datepicker').datepicker();  $('.datepicker').datepicker('option', 'dateFormat', 'M d, yy'); })(jQuery);", array('type' => 'inline', 'scope' => 'footer', 'weight' => 5));
```

* Text input field has **datepicker** class
```
<input type="text" class="datepicker" name="renewaldate" />
```


refer: <https://www.drupal.org/forum/support/theme-development/2014-09-09/tip-adding-a-built-in-drupal-7-datepicker-to-an-arbitrary>
