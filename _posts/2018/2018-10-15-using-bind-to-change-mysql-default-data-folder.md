---
title: Using bind to change mysql default data folder
author: Haijun (Navy) Su
layout: post
tags: [mysql,mariadb]
---
I wanted to change mysql data folder to /home/mysqldata. I have an error " [Warning] Can't create test file /home/mysql/beta.lower-test".

Workaround:
I did a fresh install mysql. Before install it, I bind /home/mysqldata to /var/lib/mysql and chown to mysql user.
Edit /etc/fstab and add the following code
```
# workaround: mysql data dir at /home
/home/mysqldata /var/lib/mysql  none    bind    0 0
```

Then run command `sudo mount -a` and install mariadb or mysql.
