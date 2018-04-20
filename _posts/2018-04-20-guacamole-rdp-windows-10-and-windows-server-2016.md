---
title: Guacamole, RDP, Windows 10 and Windows Server 2016
author: Haijun (Navy) Su
layout: post
tags: [Winodws, RDP, Remote]
---

Currently, Guacamole cannot support RDP for Windows 10 and Windows Server 2016. We can change RDP settings on Windows 10/Server 2016 to make it works.

Run *regedit* command and change following keys.

```
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp]
“SecurityLayer”=dword:00000001
“UserAuthentication”=dword:0x00000000
```

Reference: <http://boreditguy.com/blog/?p=3784>
