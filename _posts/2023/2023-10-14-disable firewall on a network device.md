---
title: Disable firewall on a network device
author: Haijun (Navy) Su
layout: post
tags: [lxd, lxc, ufw]
---

Firewall `ufw` block functional of `LXD` container. It needs to disable on the virtual network.

```
udo ufw allow in on lxdbr0
sudo ufw route allow in on lxdbr0
sudo ufw route allow out on lxdbr0

```

Reference:

<https://documentation.ubuntu.com/lxd/en/latest/howto/network_bridge_firewalld/>
