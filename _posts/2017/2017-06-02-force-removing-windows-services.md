---
title: Force Removing Windows Services
author: Haijun (Navy) Su
layout: post
---
Some services are denied administrator to access on Windows such as McAfee services. I don't know why administrator cannot manage every thing on Windows system. I think vrius maker and hacker already know this technology. How does administrator fight with them?

## Delete the service via command line
~~~
C:\Users\chacha>sc delete service_name
[SC] OpenService FAILED 5:

Access is denied.
~~~

If access is denied, use the command **regedit** to edit registry table at:
~~~
HKEY_LOCAL_MACHINE/SYSTEM/CurrentControlSet/Services
~~~
Find the service and delete it. Then restart computer.

Source: [Force-Removing Windows Services](https://serverfault.com/questions/11920/force-removing-windows-services)
