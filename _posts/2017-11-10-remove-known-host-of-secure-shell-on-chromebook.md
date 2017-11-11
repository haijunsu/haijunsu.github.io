---
title: Remove Known Host of Secure Shell on Chromebook
author: Haijun (Navy) Su
layout: post
tags: [SSH, Chromebook, secure shell]
---

* Open Javascript console by *CTRL + Shift + J*

* Remove one known host by index. Index is a number.
```shell
term_.command.removeKnownHostByIndex(index)
```

* Remove all known hosts.
```shell
term_.command.removeAllKnownHosts()
```
