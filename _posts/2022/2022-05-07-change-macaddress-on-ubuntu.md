---
title: Change Macaddress on Ubuntu
author: Haijun (Navy) Su
layout: post
tags: [ubuntu, netplan]
---

This is a workaround to modify network macaddress.
Create a cron job at reboot.

```

@reboot root /usr/bin/sleep 5 && /usr/sbin/ip link set en1 address t2:55:c4:ef:23:2f && /usr/sbin/netplan apply
```
