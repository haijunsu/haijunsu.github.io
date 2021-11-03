---
title: Disable auto reboot after update on Windows Server 2016
author: Haijun (Navy) Su
layout: post
tags: [windows]
---

Usually all servers need to be reboot mannually instead of do it automatically because we need to make sure all services are online after reboot. I cannot find `Download only` option on GUI Windows Update Settings on Windows Server 2016. But we can run command `sconfig` with admintrators privilege to change it.

* Open command prompt window with admintrators privilege
* Run `sconfig`
* Select option 5
* Choose (D)ownloadOnly


![sconfig](/images/windows-sconfig.png)

Reference:

<https://www.itwriting.com/blog/9634-disabling-automatic-updates-in-windows-server-2016.html>

