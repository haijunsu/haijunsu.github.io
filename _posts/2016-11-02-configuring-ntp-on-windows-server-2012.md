---
id: 42
title: Configuring NTP on Windows Server 2012
date: 2016-11-02T11:02:24+00:00
author: Navy Su
layout: post
---
Original: http://www.sysadminlab.net/windows/configuring-ntp-on-windows-server-2012

Run using PowerShell as Administrator:

```bash
w32tm /config /manualpeerlist:pool.ntp.org /syncfromflags:MANUAL

Stop-Service w32time

Start-Service w32time
```

Check status:

```bash
w32tm /query /status
```

Force a resnyc

```bash
w32tm /resync
```

Start from scratch:

```bash
Stop-Service w32time

w32tm /unregister

w32tm /register
```