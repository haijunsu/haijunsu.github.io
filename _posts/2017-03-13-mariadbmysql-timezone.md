---
id: 407
title: MariaDB/Mysql Timezone
date: 2017-03-13T10:33:35+00:00
author: Navy Su
layout: post
---
By default, mysql timezone value is system. It causes Python application error. After changed timezone to UTC, problem is solved.

~~~bash
mysql_tzinfo_to_sql /usr/share/zoneinfo | mysql -u root mysql

~~~

Change my.cnf

~~~bash
[mysqld] 

default_time_zone=UTC

~~~

Restart Mysql

source:
  
[https://mariadb.com/kb/en/mariadb/mysql\_tzinfo\_to_sql/](https://mariadb.com/kb/en/mariadb/mysql_tzinfo_to_sql/)
  
<https://mariadb.com/kb/en/mariadb/time-zones/>