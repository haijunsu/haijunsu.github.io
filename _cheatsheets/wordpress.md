---
title: Wordpress
author: Haijun (Navy) Su
layout: page
---

Note: never override core/plugins/themes codes.

### Create a child theme
Create a folder and create style.css file to define the theme
```css
/*
Theme Name: Level Up Child
Theme URI: http://wordpress:8888/
Description: This is a child theme of 2014
Author: Scott Tolinski
Author URI: http://scotttolinski.com
Template: twentyfourteen
Version: 0.1
*/
@import url("../twentyfourteen/style.css");
```

### Add your own functions (functions.php)

```php
<? php

// add extra javascript
function twentyfourteen_child_scripts() {
    wp_enqueue_script( 'extra js', get_stylesheet_directory_uri() . '/js/extra.js' );
}

add_action( 'wp_enqueue_scripts', 'twentyfourteen_chld_scripts' );

// add widgets
function twentyfourteen_child_widgets_init() {
    register_sidebar( array(
        'name' => 'Level Up New Widget Area',
        'id' => 'Level Up New Widget Area',
        'before_widget' => '<aside>',
        'after_widget' => '</aside>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>',
    ) );
}

add_action( 'widgets_init', 'twentyfourteen_child_widgets_init' );


// add menu location
function twentyfourteen_child_menu() {
    register_nav_menu('new_menu', __('Our New Menu'));
}

add_action('init', 'twentyfourteen_child_register_menu');
```
#### js/extra.js
```javascript
alert("Yes.");
```

#### Add widgets in template file
```php
<?php if( dynamic_sidebar( 'level_up_new_widget_area' ) ) : else : endif; ?>

```

#### Add widgets in template file
```php
<?php wp_nav_menu( array('theme_location' => 'new_menu') ) ?>

```

