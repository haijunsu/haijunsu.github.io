---
title: Using static IPs with LXD
author: Haijun (Navy) Su
layout: post
tags: [lxd,lxc]
---

```
lxc stop c1
lxc network attach lxdbr0 c1 eth0 eth0
lxc config device set c1 eth0 ipv4.address 10.99.10.42
lxc start c1
```

Reference:
<https://discuss.linuxcontainers.org/t/using-static-ips-with-lxd/1291/5>
