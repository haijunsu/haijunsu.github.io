---
title: Configurate HTTP Proxy Server for Ubuntu
author: Haijun (Navy) Su
layout: post
tags: [Ubuntu, Proxy]
---
Edit ~/.bashrc
```
http_proxy=http://yourproxyaddress:prosyport
export http_proxy
```
It the proxy server requires login, using the following configuration
```bash
http_proxy=http://username:password@yourproxyaddress:proxyprot
export http_proxy
```
