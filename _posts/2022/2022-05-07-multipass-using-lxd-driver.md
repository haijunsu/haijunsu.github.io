---
title: Multipass using LXD driver
author: Haijun (Navy) Su
layout: post
tags: [ubuntu, lxd, multipass]
---

```

$ sudo multipass get local.driver
qemu

$ sudo multipass set local.driver=lxd

$ sudo multipass networks
Name      Type      Description
eno1  ethernet  Ethernet device
eno8  ethernet  Ethernet device
mpbr0     bridge    Network bridge for Multipass
```
