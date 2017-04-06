---
id: 86
title: How to install MariaDB on CentOS
date: 2016-11-03T23:52:09+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=86
permalink: /2016/11/03/how-to-install-mariadb-on-centos/
categories:
  - Uncategorized
---
Goto <https://downloads.mariadb.org/mariadb/repositories/#mirror=evowise-ny> and select version to generate repository file. For version 10.1, the file content as blow:

<pre class="prettyprint"># MariaDB 10.1 CentOS repository list - created 2016-11-04 03:20 UTC
# http://downloads.mariadb.org/mariadb/repositories/
[mariadb]
name = MariaDB
baseurl = http://yum.mariadb.org/10.1/centos7-amd64
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1</pre>

Installation command:

<pre class="prettyprint">sudo yum install MariaDB-server MariaDB-client</pre>

Command to secure Mysql (By default, root doesn&#8217;t have password)

<pre class="prettyprint">sudo service mariadb start
sudo mysql_secure_installation</pre>