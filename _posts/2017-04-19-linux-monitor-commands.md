---
title: Linux System Monitor Commands
date: 2017-04-19T14:54:19+00:00
author: Navy Su
layout: post
---
### Checking service/process
```bash
SERVICE=lighttpd
if ps ax | grep -v grep | grep $SERVICE > /dev/null; then echo -n "\"$SERVICE\" : \"running\","; else echo -n "\"$SERVICE\" : \"not running\","; fi
```

### Checking disk usage
```bash
df -h --total 
```

### Checking memory
```bash
free -m
```

### Checking uptime, load
```bash
uptime
```
