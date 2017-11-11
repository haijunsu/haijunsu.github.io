---
title: Linux System Monitor Commands
date: 2017-04-19T14:54:19+00:00
author: Navy Su
layout: post
---
### Checking service/process
~~~shell
SERVICE=lighttpd
if ps ax | grep -v grep | grep $SERVICE > /dev/null; then echo -n "\"$SERVICE\" : \"running\","; else echo -n "\"$SERVICE\" : \"not running\","; fi
~~~

### Checking disk usage
~~~shell
df -h --total 
~~~

### Checking memory
~~~shell
free -m
~~~

### Checking uptime, load
~~~shell
uptime
~~~
