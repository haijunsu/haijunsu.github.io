---
title: Configure Static DNS on Centos
author: Haijun (Navy) Su
layout: post
tags: [Centos, dns]
---
Modify /etc/sysconfig/network-scripts/ifcfg-eth0
```ini
PEERDNS=no
DNS1=8.8.8.8
DNS2=8.8.4.4
```

Reboot network
```shell
sudo ifdown eth0
sudo ifup eth0
```

Reference:
<http://ask.xmodulo.com/configure-static-dns-centos-fedora.html>
