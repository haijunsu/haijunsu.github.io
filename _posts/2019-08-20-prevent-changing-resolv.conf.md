---
title: Prevent Changing resolv.conf
author: Haijun (Navy) Su
layout: post
tags: [dhcp, linux, ip]
---

* Protect the */etc/resolv.conf* file
```
chattr +i /etc/resolv.conf
```

* Remove the protect attribute
```
chattr -i /etc/resolv.conf
```

* Check the protect attribute
```
lsattr /etc/resolv.conf
```
