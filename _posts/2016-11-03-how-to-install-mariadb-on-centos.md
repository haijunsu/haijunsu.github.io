---
id: 86
title: How to install MariaDB on CentOS
date: 2016-11-03T23:52:09+00:00
author: Navy Su
layout: post
---
Goto <https://downloads.mariadb.org/mariadb/repositories/#mirror=evowise-ny> and select version to generate repository file. For version 10.1, the file content as blow:

```bash
# MariaDB 10.1 CentOS repository list - created 2016-11-04 03:20 UTC

# http://downloads.mariadb.org/mariadb/repositories/

[mariadb]

name = MariaDB

baseurl = http://yum.mariadb.org/10.1/centos7-amd64

gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB

gpgcheck=1
```

Installation command:

```bash
sudo yum install MariaDB-server MariaDB-client
```

Command to secure Mysql (By default, root doesn&#8217;t have password)

```bash
sudo service mariadb start

sudo mysql_secure_installation
```