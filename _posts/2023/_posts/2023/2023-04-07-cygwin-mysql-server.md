---
title: Cygwin MySQL Server
author: Haijun (Navy) Su
layout: post
tags: [cygwin, mysql]
---

Run Cygwin with a non admin user.

```
setup-x86.exe -B
```

After installed the mysql server on Cygwin, issue the following command to run mysql server.

```
mysql_install_db

mysqld_safe &

mysql_secure_installation

```

Create `.my.cnf` in home directory to save login information

```
[client]
user=<myname>
password=<mypass>
```

