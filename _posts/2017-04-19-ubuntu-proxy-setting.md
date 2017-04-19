---
title: Ubuntu proxy settings
date: 2017-04-19T11:07:19+00:00
author: Navy Su
layout: post
---
### For apt, software center etc
edit file /etc/apt/apt.conf
```ini
Acquire::http::proxy "http://username:password@host:port/";
Acquire::ftp::proxy "ftp://username:password@host:port/";
Acquire::https::proxy "https://username:password@host:port/";
```
### Environment variables
edit file /etc/environment
```ini
http_proxy=http://username:password@host:port/
ftp_proxy=ftp://username:password@host:port/
https_proxy=https://username:password@host:port/
```

Source: <https://askubuntu.com/questions/664777/systemwide-proxy-settings-in-ubuntu>
