---
id: 48
title: 'Check Mysql user&#8217;s privileges'
date: 2016-11-02T22:55:41+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=48
permalink: /2016/11/02/check-mysql-users-privileges/
categories:
  - database
  - MySql
tags:
  - database
  - mysql
  - privilege
  - user
---
Show root user&#8217;s privileges:

<pre class="prettyprint">mysql&gt; SHOW GRANTS FOR 'root'@'localhost';
+---------------------------------------------------------------------+
| Grants for root@localhost                                           |
+---------------------------------------------------------------------+
| GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION |
+---------------------------------------------------------------------+</pre>

Show current user&#8217;s privileges:
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">mysql&gt; show grants;
+---------------------------------------------------------------------+
| Grants for root@localhost                                           |
+---------------------------------------------------------------------+
| GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION |
| GRANT PROXY ON ''@'' TO 'root'@'localhost' WITH GRANT OPTION        |
+---------------------------------------------------------------------+
2 rows in set (0.00 sec)

mysql&gt; show grants for current_user;
+---------------------------------------------------------------------+
| Grants for root@localhost                                           |
+---------------------------------------------------------------------+
| GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION |
| GRANT PROXY ON ''@'' TO 'root'@'localhost' WITH GRANT OPTION        |
+---------------------------------------------------------------------+
2 rows in set (0.00 sec)

mysql&gt; show grants for current_user();
+---------------------------------------------------------------------+
| Grants for root@localhost                                           |
+---------------------------------------------------------------------+
| GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION |
| GRANT PROXY ON ''@'' TO 'root'@'localhost' WITH GRANT OPTION        |
+---------------------------------------------------------------------+
2 rows in set (0.00 sec)

</pre>