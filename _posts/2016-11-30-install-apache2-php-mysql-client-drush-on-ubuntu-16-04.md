---
id: 256
title: Install apache2, php, mysql client, drush on ubuntu 16.04
date: 2016-11-30T11:04:11+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=256
permalink: /2016/11/30/install-apache2-php-mysql-client-drush-on-ubuntu-16-04/
categories:
  - apache2
  - develop tools
  - drush
  - MySql
  - php
tags:
  - apache
  - drush
  - mysql
  - mysql-client
  - php
  - ubuntu
---
Install mysql-client<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo apt install mysql-client
</pre>

Install php7

<pre class="prettyprint">sudo apt install php php-xml php-gd php-curl php-mcrypt php-mbstring php7.0-mbstring php-gettext php-mysql
</pre>

Install apache2

<pre class="prettyprint">sudo apt install apache2 libapache2-mod-php mod_dbd
sudo a2enmod rewrite</pre>

Install drush

<pre class="prettyprint">$ php -r "readfile('https://s3.amazonaws.com/files.drush.org/drush.phar');" &gt; drush
$ php drush core-status
$ chmod +x drush
$ sudo mv drush /usr/local/bin
$ drush init</pre>