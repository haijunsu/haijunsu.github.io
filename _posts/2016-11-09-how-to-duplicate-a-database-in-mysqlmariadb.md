---
id: 130
title: How to duplicate a database in mysql/mariadb
date: 2016-11-09T14:52:20+00:00
author: Navy Su
layout: post
---
When backup database, don&#8217;t use option &#8211;databases. It will create use database command.

```bash
mysqldump -u root -p oldDB &gt; oldDB.sql

mysql -u root -p --execute="create database newDB;"

mysql -u root -p newDB &lt; oldDB.sql
```