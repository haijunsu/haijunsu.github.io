---
id: 407
title: MariaDB/Mysql Timezone
date: 2017-03-13T10:33:35+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=407
permalink: /2017/03/13/mariadbmysql-timezone/
categories:
  - database
  - MariaDB
  - MySql
tags:
  - mariadb
  - mysql
  - timezone
---
By default, mysql timezone value is system. It causes Python application error. After changed timezone to UTC, problem is solved.

<pre class="prettyprint">mysql_tzinfo_to_sql /usr/share/zoneinfo | mysql -u root mysql
</pre>

Change my.cnf

<pre class="prettyprint">[mysqld] 
default_time_zone=UTC
</pre>

Restart Mysql

source:
  
[https://mariadb.com/kb/en/mariadb/mysql\_tzinfo\_to_sql/](https://mariadb.com/kb/en/mariadb/mysql_tzinfo_to_sql/)
  
<https://mariadb.com/kb/en/mariadb/time-zones/>