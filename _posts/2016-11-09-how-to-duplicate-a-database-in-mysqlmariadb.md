---
id: 130
title: How to duplicate a database in mysql/mariadb
date: 2016-11-09T14:52:20+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=130
permalink: /2016/11/09/how-to-duplicate-a-database-in-mysqlmariadb/
categories:
  - database
  - MariaDB
  - MySql
tags:
  - copy
  - duplicate
  - mariadb
  - mysql
---
When backup database, don&#8217;t use option &#8211;databases. It will create use database command.

<pre class="prettyprint">mysqldump -u root -p oldDB &gt; oldDB.sql
mysql -u root -p --execute="create database newDB;"
mysql -u root -p newDB &lt; oldDB.sql</pre>