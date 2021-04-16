---
title: Get Real Client IP When Using LXD to Forward Port
author: Haijun (Navy) Su
layout: post
tags: [lxd, ubuntu, forward, port, ip]
---

By default, the LXD port forwarding is non-nat mode. It will lost client ip information. In order to transmit client information, we need to add parameter `proxy_protocol=true` or `nat=true`.


```
/snap/bin/lxc config device add "{ {container_name}}" http proxy listen=tcp:0.0.0.0:80 connect=tcp:127.0.0.1:80 proxy_protocol=true
/snap/bin/lxc config device add "{ {container_name}}" https proxy listen=tcp:0.0.0.0:443 connect=tcp:127.0.0.1:443 nat=true
```

If nat mode is true, it requires the container has a static IP address.


Reference:

<https://discuss.linuxcontainers.org/t/how-to-get-real-client-ip-when-using-lxd-to-forward-port-80/2079>

<https://linuxcontainers.org/lxd/docs/master/instances#type-proxy>
