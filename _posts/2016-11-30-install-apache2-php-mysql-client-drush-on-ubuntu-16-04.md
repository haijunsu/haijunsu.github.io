---
id: 256
title: Install apache2, php, mysql client, drush on ubuntu 16.04
date: 2016-11-30T11:04:11+00:00
author: Navy Su
layout: post
---
Install mysql-client

```bash
sudo apt install mysql-client


```

Install php7

```bash
sudo apt install php php-xml php-gd php-curl php-mcrypt php-mbstring php7.0-mbstring php-gettext php-mysql


```

Install apache2

```bash
sudo apt install apache2 libapache2-mod-php mod_dbd

sudo a2enmod rewrite
```

Install drush

```bash
$ php -r "readfile('https://s3.amazonaws.com/files.drush.org/drush.phar');" &gt; drush

$ php drush core-status

$ chmod +x drush

$ sudo mv drush /usr/local/bin

$ drush init
```