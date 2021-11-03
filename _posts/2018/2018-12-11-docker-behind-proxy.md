---
title: Docker Behind Proxy
author: Haijun (Navy) Su
layout: post
tags: [docker, proxy, linux, ubuntu, centos]
---

* Create a systemd drop-in directory:

```
mkdir /etc/systemd/system/docker.service.d
```

* Add proxy in `/etc/systemd/system/docker.service.d/http-proxy.conf` file:

```
# cat /etc/systemd/system/docker.service.d/http-proxy.conf
[Service]
Environment="HTTP_PROXY=https://username:password@web-proxy.corp.xxxxxx.com:8080/"
Environment="HTTPS_PROXY=https://username:password@web-proxy.corp.xxxxxx.com:8080/"
Environment="NO_PROXY=localhost,127.0.0.1,localaddress,.localdomain.com"
```

* Flush changes:

```
systemctl daemon-reload
```

* Restart Docker:

```
systemctl restart docker
```

Reference:

<https://docs.docker.com/config/daemon/systemd/#httphttps-proxy>

<https://stackoverflow.com/questions/26550360/docker-ubuntu-behind-proxy>

<https://forums.docker.com/t/proxy-authentication-required-error-when-fetching-image/3862>
